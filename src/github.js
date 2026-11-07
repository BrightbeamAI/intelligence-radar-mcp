// GitHub as the contribution tools reach it (community/SPEC.md section 8). Contributions and reviews are issues and
// comments in the public contributions repository, where the review desk (a GitHub Actions workflow) checks each one
// against the list of people and records it. A person connects their GitHub account in one of two ways:
//   - Sign in with GitHub: the device flow of The Intelligence Radar's GitHub App (its public client ID is in the
//     edition's community config). The token is saved on this computer only, readable by this user only.
//   - RADAR_GITHUB_TOKEN: a personal access token that can open issues and comment on the repository.
// Tokens go only into the Authorization header, never into output, errors or logs. Without one, nothing here
// touches the network except reading the public list of people.
import { mkdirSync, readFileSync, rmSync, writeFileSync, chmodSync } from 'node:fs';
import { homedir } from 'node:os';
import { dirname, join } from 'node:path';
import { R } from './data.js';

const TIMEOUT = 10_000;
const START_TIMEOUT = 3_000;
const ROLES = ['contributor', 'reviewer', 'editor'];

export class GitHubError extends Error {}

/** A setting from the environment. MCP Bundle hosts pass "${user_config.key}" through unchanged when the person left it empty. */
function setting(env, name) {
  const v = String(env[name] ?? '').trim();
  return /^\$\{[^}]*\}$/.test(v) ? '' : v;
}

/** Where a sign-in is kept: the user's configuration folder, intelligence-radar/github.json. */
export function tokenFile(env = process.env) {
  const base = setting(env, 'RADAR_CONFIG_DIR')
    || (process.platform === 'win32' ? env.APPDATA || join(homedir(), 'AppData', 'Roaming') : env.XDG_CONFIG_HOME || join(homedir(), '.config'));
  return join(base, 'intelligence-radar', 'github.json');
}

function readSaved(file) {
  try {
    const saved = JSON.parse(readFileSync(file, 'utf8'));
    return saved && typeof saved.access_token === 'string' ? saved : null;
  } catch {
    return null;
  }
}

export function saveSignIn(gh, data) {
  mkdirSync(dirname(gh.file), { recursive: true, mode: 0o700 });
  const now = Date.now();
  const saved = {
    access_token: data.access_token,
    ...(data.refresh_token ? { refresh_token: data.refresh_token } : {}),
    ...(data.expires_in ? { expires_at: new Date(now + data.expires_in * 1000).toISOString() } : {}),
    saved_at: new Date(now).toISOString(),
  };
  writeFileSync(gh.file, `${JSON.stringify(saved, null, 1)}\n`, { mode: 0o600 });
  try { chmodSync(gh.file, 0o600); } catch { /* not supported here */ }
  gh.saved = saved;
  gh.token = saved.access_token;
  gh.source = 'sign-in';
}

export function signOut(gh) {
  rmSync(gh.file, { force: true });
  if (gh.source === 'sign-in') {
    gh.token = '';
    gh.source = null;
    gh.login = null;
    gh.role = null;
    gh.name = null;
  }
  gh.saved = null;
}

/**
 * This install's connection: the repository, the GitHub App's client ID for signing in, and the token, from
 * RADAR_GITHUB_TOKEN or a saved sign-in. `login`, `role` and `name` are filled in by identify().
 */
export function githubSettings(env = process.env) {
  const file = tokenFile(env);
  const envToken = setting(env, 'RADAR_GITHUB_TOKEN');
  const saved = envToken ? null : readSaved(file);
  return {
    repo: R.community.config.github_repo,
    api: (setting(env, 'RADAR_GITHUB_API') || 'https://api.github.com').replace(/\/+$/, ''),
    web: (setting(env, 'RADAR_GITHUB_WEB') || 'https://github.com').replace(/\/+$/, ''),
    clientId: setting(env, 'RADAR_GITHUB_CLIENT_ID') || R.community.config.github_app_client_id || '',
    wait: Number(setting(env, 'RADAR_DESK_WAIT_MS') || 30_000),
    file,
    token: envToken || saved?.access_token || '',
    saved,
    source: envToken ? 'env' : saved ? 'sign-in' : null,
    login: null, role: null, name: null, problem: null,
  };
}

const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);

/** Text with the token taken out, wherever it came from. */
export function hideToken(gh, s) {
  return gh.token && typeof s === 'string' ? s.split(gh.token).join('[the GitHub token]') : s;
}

/** A sign-in token past its expiry is refreshed first; device-flow tokens refresh without a client secret. */
async function fresh(gh) {
  const s = gh.saved;
  if (gh.source !== 'sign-in' || !s?.expires_at || Date.parse(s.expires_at) - Date.now() > 60_000 || !s.refresh_token || !gh.clientId) return;
  const data = await oauth(gh, '/login/oauth/access_token', { client_id: gh.clientId, grant_type: 'refresh_token', refresh_token: s.refresh_token });
  if (data.access_token) saveSignIn(gh, data);
}

/** One request to GitHub's REST API. Returns the JSON (or null for 204 and 404 on GET); throws a GitHubError for the person otherwise. */
export async function api(gh, method, path, body, { ms = TIMEOUT, auth = true } = {}) {
  if (auth) await fresh(gh).catch(() => {});
  let res;
  try {
    res = await fetch(gh.api + path, {
      method,
      signal: AbortSignal.timeout(ms),
      headers: {
        Accept: 'application/vnd.github+json', 'X-GitHub-Api-Version': '2022-11-28', 'User-Agent': 'intelligence-radar-mcp',
        ...(auth && gh.token ? { Authorization: `Bearer ${gh.token}` } : {}), ...(body === undefined ? {} : { 'Content-Type': 'application/json' }),
      },
      body: body === undefined ? undefined : JSON.stringify(body),
    });
  } catch (err) {
    if (err?.name === 'TimeoutError' || err?.name === 'AbortError') throw new GitHubError(`GitHub did not answer within ${ms / 1000} seconds. Try again shortly.`);
    throw new GitHubError('GitHub could not be reached from this computer. Check the network, or try again shortly.');
  }
  if (method === 'GET' && res.status === 404) return null;
  if (res.status === 204) return null;
  let data = null;
  try { data = await res.json(); } catch { /* no JSON */ }
  if (res.ok) return data;
  const said = data?.message ? ` GitHub said: ${data.message}.` : '';
  if (res.status === 401) {
    throw new GitHubError(gh.source === 'env' ? `GitHub did not accept the token in RADAR_GITHUB_TOKEN.${said} Check it, or remove it and use sign_in_with_github.`
      : `GitHub did not accept the saved sign-in.${said} Call sign_in_with_github to sign in again.`);
  }
  if (res.status === 403 || res.status === 404) {
    throw new GitHubError(`GitHub refused this (status ${res.status}).${said} The token may not be allowed to open issues or comment on ${gh.repo}: `
      + 'sign in with sign_in_with_github, or use a token that can.');
  }
  if (res.status === 410) throw new GitHubError(`Issues are switched off on ${gh.repo}.`);
  if (res.status === 422) throw new GitHubError(`GitHub did not accept the request.${said}`);
  throw new GitHubError(`GitHub answered with status ${res.status}.${said}`);
}

export async function pages(gh, path, max = 10) {
  const all = [];
  const join = path.includes('?') ? '&' : '?';
  for (let page = 1; page <= max; page += 1) {
    const batch = await api(gh, 'GET', `${path}${join}per_page=100&page=${page}`);
    if (!Array.isArray(batch)) break;
    all.push(...batch);
    if (batch.length < 100) break;
  }
  return all;
}

/** The list of people (people.json in the contributions repository): public, read without a token. */
export async function people(gh, ms = TIMEOUT) {
  const f = await api(gh, 'GET', `/repos/${gh.repo}/contents/people.json`, undefined, { ms, auth: Boolean(gh.token) });
  if (!f) return [];
  try {
    return JSON.parse(Buffer.from(f.content, 'base64').toString('utf8')).people ?? [];
  } catch {
    return [];
  }
}

/** Whose token this is, and their role on the list of people. */
export async function identify(gh, ms = TIMEOUT) {
  gh.problem = null;
  if (!gh.token) return gh;
  const me = await api(gh, 'GET', '/user', undefined, { ms });
  gh.login = me?.login ?? null;
  const listed = (await people(gh, ms)).find((p) => (p.id && p.id === me?.id) || String(p.login).toLowerCase() === String(gh.login).toLowerCase());
  gh.role = ROLES.includes(listed?.role) ? listed.role : null;
  gh.name = listed?.name ?? me?.name ?? gh.login;
  return gh;
}

/** At start: whom the token belongs to, waiting 3 seconds at most. On failure, `problem` says why. */
export async function connectGitHub(env = process.env) {
  const gh = githubSettings(env);
  if (!gh.token) return gh;
  try {
    await identify(gh, START_TIMEOUT);
  } catch (err) {
    gh.problem = err instanceof GitHubError ? hideToken(gh, err.message) : 'GitHub could not be checked.';
  }
  return gh;
}

// ---------------------------------------------------------------- signing in (OAuth device flow)

async function oauth(gh, path, form) {
  let res;
  try {
    res = await fetch(gh.web + path, {
      method: 'POST', signal: AbortSignal.timeout(TIMEOUT),
      headers: { Accept: 'application/json', 'Content-Type': 'application/x-www-form-urlencoded', 'User-Agent': 'intelligence-radar-mcp' },
      body: new URLSearchParams(form).toString(),
    });
  } catch {
    throw new GitHubError('GitHub could not be reached to sign in. Check the network, or try again shortly.');
  }
  let data = null;
  try { data = await res.json(); } catch { /* checked below */ }
  if (!data) throw new GitHubError(`GitHub answered the sign-in with status ${res.status}.`);
  return data;
}

/** Ask GitHub for a code the person enters at github.com/login/device. */
export async function startSignIn(gh) {
  if (!gh.clientId) throw new GitHubError('Signing in with GitHub is not set up in this edition yet.');
  const d = await oauth(gh, '/login/device/code', { client_id: gh.clientId });
  if (!d.device_code) throw new GitHubError(`GitHub did not start the sign-in${d.error_description ? `: ${d.error_description}` : ''}.`);
  return { device_code: d.device_code, user_code: d.user_code, verification_uri: d.verification_uri, interval: d.interval ?? 5,
    expires_at: Date.now() + (d.expires_in ?? 900) * 1000 };
}

/**
 * Wait for the person to enter the code, up to `ms`. Returns 'done' (saved), 'waiting', 'expired' or 'denied'.
 * GitHub asks clients to poll no faster than its interval, and to slow down when it says so.
 */
export async function finishSignIn(gh, flow, ms = 45_000, sleep = (t) => new Promise((ok) => setTimeout(ok, t))) {
  const until = Math.min(Date.now() + ms, flow.expires_at);
  for (;;) {
    const d = await oauth(gh, '/login/oauth/access_token', {
      client_id: gh.clientId, device_code: flow.device_code, grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
    });
    if (d.access_token) {
      saveSignIn(gh, d);
      await identify(gh);
      return 'done';
    }
    if (d.error === 'slow_down') flow.interval = (d.interval ?? flow.interval + 5);
    else if (d.error === 'expired_token') return 'expired';
    else if (d.error === 'access_denied') return 'denied';
    else if (d.error !== 'authorization_pending') throw new GitHubError(`GitHub did not complete the sign-in: ${d.error_description || d.error || 'no reason given'}.`);
    if (Date.now() + flow.interval * 1000 > until) return Date.now() >= flow.expires_at ? 'expired' : 'waiting';
    await sleep(flow.interval * 1000);
  }
}

export { cap };
