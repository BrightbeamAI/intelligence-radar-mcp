// Contributions to The Intelligence Radar from the assistant (community/SPEC.md section 8). Contributors prepare, preview
// and submit; specialist reviewers and editors review. Everything lands on GitHub, in the public contributions repository,
// where the review desk checks it against the list of people, applies the review policy and records each event for CHAP.
// The payload rules, the preview, the digests and the issue format come from the shared library in ./contribution.js;
// the status of a contribution is read from the review desk's own comments with ./desk-state.js.
import * as z from 'zod/v4';
import * as L from './contribution.js';
import { R, byId, dimensionByNumber, findDimension, findEntry, findSector, sectors } from './data.js';
import { contributionState, eventsOf, hasApproved, waitingFor } from './desk-state.js';
import { GitHubError, api, finishSignIn, hideToken, identify, pages, signOut, startSignIn } from './github.js';

const C = R.community;
const FORMS = C.forms;
const RAW = new Map(Object.entries(C.entries));
const DIMENSIONS = new Map(Object.entries(C.dimensions).map(([n, d]) => [Number(n), d]));
const SECTOR_TEXT = new Map(Object.entries(C.sectors));

/** What the shared library checks a payload against: the same text the CHAP recorder reads. */
const ctx = { entry: (id) => RAW.get(id), dimension: (n) => DIMENSIONS.get(n), sector: (slug) => SECTOR_TEXT.get(slug) };
const names = {
  entry: (id) => byId.get(id)?.title ?? (RAW.has(id) ? L.parseEntry(RAW.get(id)).header.title : ''),
  dimension: (n) => dimensionByNumber.get(n)?.name ?? '',
  sector: (slug) => C.config.sectors?.[slug] ?? slug,
};

// Annotations: the reading tools change nothing; submit and revise open or change an issue; decisions and edits cannot be taken back
const LOCAL = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };
const READS = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: true };
const SUBMITS = { readOnlyHint: false, destructiveHint: false, idempotentHint: true, openWorldHint: true };
const REVISES = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true };
const DECIDES = { readOnlyHint: false, destructiveHint: true, idempotentHint: false, openWorldHint: true };

// ---------------------------------------------------------------- words
const text = (t) => ({ type: 'text', text: t });
const cap = (s) => s.charAt(0).toUpperCase() + s.slice(1);
const NUMBERS = ['no', 'one', 'two', 'three', 'four', 'five', 'six'];
const count = (n, word) => `${NUMBERS[n] ?? n} ${word}${n === 1 ? '' : 's'}`;
const statusWords = (s) => String(s).replace(/_/g, ' ');
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'];
const day = (iso) => {
  const d = new Date(iso);
  return Number.isNaN(d.getTime()) ? String(iso ?? '') : `${d.getUTCDate()} ${MONTHS[d.getUTCMonth()]} ${d.getUTCFullYear()}`;
};
const quote = (s) => String(s ?? '').trim().split('\n').map((l) => `> ${l}`.trimEnd()).join('\n');
const json = (v) => '```json\n' + (typeof v === 'string' ? v : JSON.stringify(v, null, 1)) + '\n```';
const DECIDED = { approve: 'approved', request_changes: 'asked for changes to', decline: 'declined', edit: 'edited and approved' };
const COMMAND = { approve: 'approve', request_changes: 'changes', decline: 'decline' };
const STATUS_WORDS = { new: 'waiting for the review desk', 'in-review': 'in review', 'changes-requested': 'changes requested', approved: 'approved',
  declined: 'declined', withdrawn: 'withdrawn', published: 'published', 'needs-info': 'needs information', 'needs-approval': 'waiting for its contributor to be approved' };
const STATUS_LABELS = ['published', 'declined', 'withdrawn', 'approved', 'changes-requested', 'in-review', 'needs-info', 'needs-approval'];
const sectorNames = () => sectors.map((x) => x.name).join(', ');

/** The review a kind needs, from the community config (community/SPEC.md section 4). */
function policyWords(kind) {
  const k = C.config.kinds?.[kind] ?? {};
  const n = Number.isInteger(k.approvals) && k.approvals > 0 ? k.approvals : 1;
  return cap(count(n, 'approval')) + (k.editor_required ? (n === 1 ? ", from an editor" : ', one of them from an editor') : '');
}

/** The issue number from "C-0007", "#7", "c-7" or "7": a contribution's id is its issue's number. */
const issueNumber = (ref) => Number(String(ref).trim().match(/(\d+)$/)[1]);
const contributionId = (n) => `C-${String(n).padStart(4, '0')}`;

/** A tool result with the GitHub token taken out of everything it says. */
function reply(gh, lines, structured, isError = false) {
  const out = { content: [text(hideToken(gh, [].concat(lines).join('\n').trimEnd()))] };
  if (structured !== undefined) out.structuredContent = JSON.parse(hideToken(gh, JSON.stringify(structured)));
  if (isError) out.isError = true;
  return out;
}
const fail = (gh, lines) => reply(gh, lines, undefined, true);

/** Run a tool; a refusal or failure of GitHub becomes a plain error result. */
const guarded = (gh, fn) => async (args) => {
  try {
    return await fn(args);
  } catch (err) {
    if (err instanceof GitHubError) return fail(gh, err.message);
    throw err;
  }
};

// ---------------------------------------------------------------- inputs, as the payload has them (community/contribution.schema.json)
const SECTION_KEYS = Object.keys(L.SECTION_NAMES);
const entryRef = z.union([z.string().min(1).max(200), z.number().int().min(1)]);
const dimensionRef = z.union([z.number().int().min(1).max(R.dimensions.length), z.string().min(1).max(200)]);
const Edit = z.object({
  section: z.enum(SECTION_KEYS).optional().describe('For an entry, the part it changes: title, judgement (the text before the first heading), '
    + 'where (Where it fits), test (Test before committing), failure (Failure to watch), examples or owner. Leave it out for a dimension or a sector'),
  find: z.string().max(4000).describe('The exact current words, copied from the entry, dimension or sector; they must occur once, so include enough words'),
  replace: z.string().max(6000).describe('The words to put in their place; empty to delete them'),
});
const Labels = z.object({
  intelligence: z.enum(L.INTELLIGENCE).optional().describe(`Intelligence label: ${L.INTELLIGENCE.join(', ')}`),
  enterprise: z.enum(L.ENTERPRISE).optional().describe(`Enterprise label: ${L.ENTERPRISE.join(', ')}`),
});
const Source = z.object({
  url: z.string().max(2000).describe('An https address'),
  title: z.string().max(400).optional(),
  publisher: z.string().max(200).optional(),
  date: z.string().max(60).optional().describe('For example 2026-10'),
  relation: z.enum(L.RELATIONS).optional().describe('How it bears on the claim: supports (the default), challenges or qualifies'),
  note: z.string().max(2000).optional().describe('What it shows'),
});
const Review = z.object({
  makes_sense: z.enum(['yes', 'partly', 'no']).optional().describe('Does the entry make sense?'),
  easy_to_read: z.enum(['yes', 'partly', 'no']).optional().describe('Is it easy to read?'),
  intelligence_label: z.enum(['yes', 'no', 'not-sure']).optional().describe('Is the intelligence label reasonable?'),
  enterprise_label: z.enum(['yes', 'no', 'not-sure']).optional().describe('Is the enterprise label reasonable?'),
  suggested_wording: z.string().max(4000).optional().describe('Wording the reviewer would like to read instead'),
  corrections: z.string().max(4000).optional().describe('Anything wrong, missing or out of date, with a link to the evidence'),
});
const NewEntry = z.object({
  title: z.string().max(80).optional().describe('3 to 80 characters'),
  dimension: dimensionRef.optional().describe('Its dimension: number (1 to 9) or name'),
  intelligence: z.enum(L.INTELLIGENCE).optional(),
  enterprise: z.enum(L.ENTERPRISE).optional(),
  judgement: z.string().max(4000).optional().describe('One or two paragraphs, 80 to 4000 characters: what it is, what the evidence shows and what to do'),
  where: z.string().max(1000).optional().describe('Where it fits, 10 to 1000 characters'),
  test: z.string().max(1000).optional().describe('The test to run before committing, 10 to 1000 characters'),
  failure: z.string().max(1000).optional().describe('The failure to watch for, 10 to 1000 characters'),
  examples: z.string().max(1000).optional(),
  owner: z.string().max(120).optional().describe('The role that should act on it, such as Engineering delivery lead'),
});
const Target = z.object({
  entry: entryRef.optional().describe('An entry: its ID (IR-028), number (28) or title'),
  dimension: dimensionRef.optional().describe('A dimension: its number (1 to 9) or name'),
  sector: z.string().min(2).max(100).optional().describe(`A sector lens: ${sectorNames()}`),
  general: z.string().max(300).optional().describe('Anywhere else, in words, for a review or evidence: for example "the Method page"'),
});
const draftArg = z.string().min(1).max(100).describe('The draft_id that prepare_contribution returned in this conversation');
const idArg = z.string().regex(/^(?:[Cc]-?|#)?\d{1,9}$/, 'a contribution id such as C-0007, or its issue number such as #7')
  .describe('The contribution: its id, such as C-0007, or its GitHub issue number, such as #7');
const digestArg = z.string().regex(/^sha256:[0-9a-f]{64}$/, 'the digest that open_contribution showed')
  .describe('The digest of the version the reviewer read, from open_contribution');
const rationaleArg = z.string().trim().min(10).max(4000).describe("The reviewer's reason, in the reviewer's own words: at least 10 characters");

// ---------------------------------------------------------------- preparing a draft (no network)
const drafts = new Map(); // draft_id -> payload, for this session only
const MAX_DRAFTS = 200;
function keep(id, payload) {
  drafts.delete(id);
  drafts.set(id, payload);
  if (drafts.size > MAX_DRAFTS) drafts.delete(drafts.keys().next().value);
}

function entryId(ref) {
  const m = String(ref).trim().match(/^(?:ir[\s-]?)?0*(\d{1,3})$/i);
  if (m) {
    const id = `IR-${m[1].padStart(3, '0')}`;
    return RAW.has(id) ? id : null;
  }
  return findEntry(ref)?.id ?? null;
}

/** The payload's target from what the person named: an entry by ID, number or title, a dimension by number or name, a sector by name. */
function resolveTarget(kind, target = {}, entryDimension) {
  const given = Object.entries(target).filter(([, v]) => v !== undefined && String(v).trim() !== '');
  if (given.length > 1) return { problem: 'Name one target only: an entry, a dimension, a sector or a general place.' };
  if (!given.length) {
    if (kind === 'new-entry' && entryDimension !== undefined) return { target: { dimension: entryDimension } };
    return { problem: kind === 'new-entry' ? 'Name the dimension the new entry belongs to, by number (1 to 9) or name.'
      : 'Name the target: an entry (such as IR-028), a dimension, a sector or, for a review or evidence, a general place in words.' };
  }
  const [k, v] = given[0];
  if (k === 'entry') {
    const id = entryId(v);
    return id ? { target: { entry: id } } : { problem: `No entry of The Intelligence Radar matches "${v}". Give its ID, such as IR-028, or its title; search_radar finds entries by topic.` };
  }
  if (k === 'dimension') {
    const d = findDimension(v);
    return d ? { target: { dimension: d.number } } : { problem: `No dimension matches "${v}". Give its number, 1 to ${R.dimensions.length}, or its name; list_dimensions lists them.` };
  }
  if (k === 'sector') {
    const s = findSector(v);
    return s ? { target: { sector: s.slug } } : { problem: `No sector matches "${v}". The sector lens covers ${sectorNames()}.` };
  }
  return { target: { general: String(v) } };
}

/** The section of an entry that holds these words, when they occur once and inside one section. */
function sectionAt(raw, find) {
  const at = find ? raw.indexOf(find) : -1;
  if (at === -1 || raw.indexOf(find, at + find.length) !== -1) return undefined;
  const { spans } = L.parseEntry(raw);
  return SECTION_KEYS.find((k) => spans[k] && at >= spans[k][0] && at + find.length <= spans[k][1]);
}

/** Edits to an entry name their section: one that does not say gets the section its words sit in. */
const placeEdits = (raw, edits) => (raw === undefined || !Array.isArray(edits) ? edits
  : edits.map((e) => (e.section || !sectionAt(raw, e.find) ? e : { section: sectionAt(raw, e.find), ...e })));

/**
 * Edits whose words do not occur once, checked one by one. validate() checks them only once every other rule holds;
 * this finds them sooner, so that the person can fix everything in one pass.
 */
function editProblems(p) {
  const t = p.target ?? {};
  const raw = t.entry ? RAW.get(t.entry) : undefined;
  const obj = t.sector ? ctx.sector(t.sector) : t.dimension !== undefined && p.kind !== 'new-entry' ? ctx.dimension(t.dimension) : undefined;
  if (raw === undefined && !obj) return [];
  return (p.edits ?? []).flatMap((e, i) => (typeof e.find !== 'string' || e.find.length < 3 ? []
    : (raw !== undefined ? L.applyEntryEdits(raw, [e]) : L.applyObjectEdits(obj, [e])).errors.map((x) => x.replace(/^edit 1:/, `edit ${i + 1}:`))));
}

/** For each edit whose words were not found once, the current text to copy them from. */
function findHelp(payload, errors) {
  const id = payload.target?.entry;
  if (!id || !RAW.has(id)) return [];
  const { sections } = L.parseEntry(RAW.get(id));
  const keys = new Set(errors.map((e) => e.match(/^edit (\d+): the text to replace occurs/)).filter(Boolean)
    .map((m) => payload.edits?.[Number(m[1]) - 1]?.section).filter((k) => k && sections[k] !== undefined));
  return [...keys].flatMap((k) => ['', `The current ${L.SECTION_NAMES[k]} of ${id} ${names.entry(id)}, to copy from:`, quote(sections[k])]);
}

/** Normalise, fill base, validate: the draft, its problems and warnings, and its id when it is ready. */
function prepare(input) {
  const problems = [];
  const entry = input.entry ? { ...input.entry } : undefined;
  if (entry?.dimension !== undefined) {
    const d = findDimension(entry.dimension);
    if (d) entry.dimension = d.number;
    else {
      problems.push(`No dimension matches "${entry.dimension}" for the new entry. Give its number, 1 to ${R.dimensions.length}, or its name.`);
      delete entry.dimension;
    }
  }
  const t = resolveTarget(input.kind, input.target, entry?.dimension);
  if (t.problem) problems.push(t.problem);
  if (entry && entry.dimension === undefined && t.target?.dimension !== undefined) entry.dimension = t.target.dimension;
  const raw = t.target?.entry ? RAW.get(t.target.entry) : undefined;
  const fields = { schema: L.SCHEMA, kind: input.kind, target: t.target, title: input.title, summary: input.summary, edits: placeEdits(raw, input.edits),
    labels: input.labels, conditions: input.conditions, reverse_if: input.reverse_if, claim: input.claim, evidence: input.evidence,
    review: input.review, entry, disclosure: input.disclosure, credit: input.credit };
  const payload = L.fillBase(L.normalise(fields), ctx, C.edition);
  const v = L.validate(payload, ctx);
  const errors = v.errors.length ? [...v.errors, ...editProblems(payload).filter((e) => !v.errors.includes(e))] : [];
  problems.push(...errors.filter((e) => !(t.problem && e.startsWith('target '))));
  const ready = problems.length === 0;
  const draftId = ready ? L.digest(payload) : null;
  if (ready) keep(draftId, payload);
  return { ready, draftId, payload, problems, warnings: v.warnings, help: ready ? [] : findHelp(payload, errors) };
}

/** Before and after for every section an entry's edits touch, from the text this server carries. */
function entryChanges(id, p) {
  const raw = RAW.get(id);
  if (raw === undefined) return [`${id} is not in the edition this server carries (${C.edition}), so its current text cannot be shown.`];
  const o = [];
  const before = L.parseEntry(raw);
  if (p.base?.entry_digest && L.entryDigest(raw) !== p.base.entry_digest) {
    o.push(`The text below is ${id} as this server carries it (${C.edition}); it differs from the text the contribution was prepared against.`, '');
  }
  if (p.labels) {
    o.push(`Labels now: ${before.header.intelligence}, ${before.header.enterprise}. Proposed: ${p.labels.intelligence ?? before.header.intelligence}, `
      + `${p.labels.enterprise ?? before.header.enterprise}.`, '');
  }
  const edits = p.edits ?? [];
  if (!edits.length) return o;
  const { text: changed, errors } = L.applyEntryEdits(raw, edits);
  const after = L.parseEntry(changed);
  const keys = [...new Set(edits.map((e) => e.section ?? sectionAt(raw, e.find)).filter(Boolean))];
  for (const k of keys) o.push(`### ${L.SECTION_NAMES[k]}`, '', 'Now:', '', quote(before.sections[k]), '', 'Proposed:', '', quote(after.sections[k]), '');
  if (errors.length) o.push('These edits do not apply to the current text:', ...errors.map((e) => `- ${e}`), '');
  return o;
}

/** Before and after for every text of a dimension or sector that the edits change. */
function objectChanges(label, obj, edits) {
  if (!obj) return [`${label} is not in the edition this server carries (${C.edition}).`];
  const { value, errors } = L.applyObjectEdits(obj, edits);
  const o = [];
  const walk = (a, b, path) => {
    if (typeof a === 'string') {
      if (a !== b) o.push(`### ${label}: ${path}`, '', 'Now:', '', quote(a), '', 'Proposed:', '', quote(b), '');
    } else if (Array.isArray(a)) a.forEach((x, i) => walk(x, b?.[i], `${path} ${i + 1}`));
    else if (a && typeof a === 'object') Object.entries(a).forEach(([k, x]) => walk(x, b?.[k], path ? `${path}, ${k}` : k));
  };
  walk(obj, value, '');
  if (errors.length) o.push('These edits do not apply to the current text:', ...errors.map((e) => `- ${e}`), '');
  return o;
}

function changes(p) {
  const t = p.target ?? {};
  if (t.entry) return entryChanges(t.entry, p);
  if (!p.edits?.length) return [];
  if (t.dimension && p.kind !== 'new-entry') return objectChanges(`Dimension ${t.dimension}`, ctx.dimension(t.dimension), p.edits);
  if (t.sector) return objectChanges(`Sector ${names.sector(t.sector)}`, ctx.sector(t.sector), p.edits);
  return [];
}

/** A reviewer's edit as RFC 6902 operations on the payload: a patch as given, or replacement edits and labels. */
function editPatch({ patch, edits, labels }) {
  const simple = edits !== undefined || labels !== undefined;
  if (patch && simple) return { problem: 'Give either a patch, or replacement edits and labels. Both at once are ambiguous.' };
  if (patch) return { patch };
  if (!simple) return { problem: 'Give the edit: replacement edits, replacement labels, or an RFC 6902 patch against the payload.' };
  const ops = [];
  if (edits !== undefined) ops.push({ op: 'add', path: '/edits', value: edits.map((e) => ({ ...(e.section ? { section: e.section } : {}), find: e.find, replace: e.replace })) });
  if (labels !== undefined) {
    const value = Object.fromEntries(Object.entries(labels).filter(([, v]) => v));
    if (!Object.keys(value).length) return { problem: 'labels must name an intelligence label, an enterprise label or both.' };
    ops.push({ op: 'add', path: '/labels', value });
  }
  return { patch: ops };
}

// ---------------------------------------------------------------- GitHub: issues, their status and the review desk's answers
const BOT = C.config.desk_bot || 'github-actions[bot]';
const labelsOf = (issue) => (issue.labels ?? []).map((l) => (typeof l === 'string' ? l : l.name));
const kindOf = (issue) => L.KINDS.find((k) => labelsOf(issue).includes(k))
  ?? FORMS.forms.find((f) => f.kind && String(issue.title ?? '').startsWith(f.title.trim()))?.kind ?? null;
const statusOf = (issue) => STATUS_LABELS.find((l) => labelsOf(issue).includes(l)) ?? 'new';
const unmarked = (body) => String(body ?? '').replace(/<!-- radar-desk [\s\S]*?-->/g, '').trim();
const sleep = (ms) => new Promise((ok) => setTimeout(ok, ms));
const article = (role) => (role === 'editor' ? 'an editor' : role === 'reviewer' ? 'a specialist reviewer' : 'a contributor');

async function issueOf(gh, n) {
  const issue = await api(gh, 'GET', `/repos/${gh.repo}/issues/${n}`);
  if (!issue || issue.pull_request || !kindOf(issue)) throw new GitHubError(`There is no contribution ${contributionId(n)} (issue #${n}) in ${gh.repo}.`);
  return issue;
}

/** One contribution as the review desk keeps it: the issue, its comments, and its state from the desk's events. */
async function full(gh, n) {
  const issue = await issueOf(gh, n);
  const kind = kindOf(issue);
  const comments = await pages(gh, `/repos/${gh.repo}/issues/${n}/comments`);
  return { issue, kind, comments, st: contributionState(eventsOf(comments, BOT), C.config, kind) };
}

/** After writing to an issue, the review desk's answer: its first comment after `afterId`, waiting up to gh.wait. */
async function deskAnswer(gh, n, afterId = 0) {
  const until = Date.now() + gh.wait;
  for (;;) {
    const comments = await pages(gh, `/repos/${gh.repo}/issues/${n}/comments`);
    const answer = comments.find((c) => c.user?.login === BOT && c.id > afterId);
    if (answer) return unmarked(answer.body);
    if (Date.now() + 3000 > until) return null;
    await sleep(3000);
  }
}
const answered = (said) => (said ? ['', 'The review desk answered on the issue:', '', quote(said)]
  : ['', 'The review desk checks it on GitHub within a minute or so; the answer appears on the issue.']);

const notConnected = (gh) => `${gh.problem ? `${gh.problem} ` : ''}This assistant is not connected to a GitHub account.`;
const howToConnect = (gh) => (gh.clientId
  ? 'To connect it, call sign_in_with_github: the person enters a short code at github.com/login/device, once.'
  : `To connect it, set RADAR_GITHUB_TOKEN in this server's settings to a GitHub token that can open issues and comment on ${FORMS.repo}.`);

function githubRoute(gh, payload) {
  const link = L.issueLink(payload, FORMS);
  const form = FORMS.forms.find((f) => f.kind === payload.kind);
  const pasteInto = form.fields.find((f) => f.to === 'prepared')?.label ?? 'Prepared by an AI assistant';
  const o = [`${notConnected(gh)} The contribution goes in as a GitHub issue the person opens.`, '',
    'Ask the person to:', '',
    `1. Open the link below. It opens the form "${form.name}" in ${FORMS.repo}, filled in.`,
    `2. Check the form and tick the terms. Leave the dropdowns as they are: the prepared contribution already holds those choices.${link.prepared_included ? ''
      : ` Paste the JSON below into the field "${pasteInto}": the contribution is too long to carry in full in the link.`}`,
    '3. Press Submit new issue.', '', link.url, ''];
  if (!link.prepared_included) o.push(json(link.prepared), '');
  o.push('The review desk checks the issue against the list of people on GitHub: issues from people on it go to review automatically. '
    + `apply_to_contribute gives the link to apply. ${howToConnect(gh)}`);
  return reply(gh, o, { route: 'github-link', url: link.url, prepared_included: link.prepared_included, ...(link.prepared ? { prepared: link.prepared } : {}) });
}

function policyLine(st) {
  const a = st.assessment;
  if (!a) return '';
  return `Approvals of this version: ${a.have} of the ${a.needed} needed${a.editor_required ? (a.needed === 1 ? ", from an editor" : ", one of them an editor's") : ''}.`
    + `${st.status === 'in-review' && waitingFor(st) ? ` Waiting for ${waitingFor(st)}.` : ''}`;
}

function head({ issue, kind, st }) {
  const p = st.current?.payload ?? {};
  const status = st.status === 'new' ? statusOf(issue) : st.status;
  return [`# ${contributionId(issue.number)} ${L.kindName(kind)}: ${p.title ?? issue.title}`, '',
    `- Issue: #${issue.number}, ${issue.html_url ?? `https://github.com/${FORMS.repo}/issues/${issue.number}`}`,
    ...(p.target ? [`- Target: ${L.targetName(p.target, names)}`] : []),
    `- Status: ${STATUS_WORDS[status] ?? status}.${st.current ? ` Version ${st.current.n}.` : ''}`,
    `- Contributor: @${issue.user?.login}. Opened ${day(issue.created_at)}.`,
    ...(st.current ? [`- ${policyLine(st)}`] : [])];
}

const DECISION_OF = { approve: 'approve', changes: 'request_changes', decline: 'decline' };
function decisions(st) {
  const o = [];
  for (const ev of st.events) {
    if (ev.e === 'version') o.push(`- Version ${ev.n}: ${ev.cause === 'submitted' ? 'sent' : ev.cause} by @${ev.by}, ${day(ev.at)} (${ev.digest})${ev.reason ? `: ${ev.reason}` : ''}`);
    else if (ev.e === 'decision') o.push(`- @${ev.by} (${ev.role}) ${DECIDED[DECISION_OF[ev.d]]} version ${ev.n} on ${day(ev.at)}${ev.reason ? `: ${ev.reason}` : '.'}`);
    else if (ev.e === 'withdrawn') o.push(`- Withdrawn by @${ev.by} on ${day(ev.at)}${ev.reason ? `: ${ev.reason}` : '.'}`);
    else if (ev.e === 'published') o.push(`- Published in release ${ev.release} on ${day(ev.at)}.`);
  }
  return o.length ? o : ['- Nothing yet: the review desk has not taken it in.'];
}

function summaryLine(issue) {
  const kind = kindOf(issue);
  const title = String(issue.title ?? '').replace(FORMS.forms.find((f) => f.kind === kind)?.title.trim() ?? '', '').trim();
  return `- **${contributionId(issue.number)}** (#${issue.number}) ${L.kindName(kind)}: ${title}. ${cap(STATUS_WORDS[statusOf(issue)] ?? statusOf(issue))}.`;
}

/** RFC 6902, the operations a reviewer's edit needs, on a copy of the payload. */
function applyPatch(doc, ops) {
  const out = structuredClone(doc);
  const parts = (path) => String(path).split('/').slice(1).map((x) => x.replace(/~1/g, '/').replace(/~0/g, '~'));
  const parentOf = (path) => {
    const keys = parts(path);
    let o = out;
    for (const k of keys.slice(0, -1)) {
      if (o === null || typeof o !== 'object' || !(k in o)) throw new Error(`${path} does not exist`);
      o = o[k];
    }
    return [o, keys.at(-1)];
  };
  const get = (path) => parts(path).reduce((o, k) => (o === undefined || o === null ? undefined : o[k]), out);
  for (const op of ops) {
    const [o, k] = parentOf(op.path);
    if (op.op === 'test') {
      if (JSON.stringify(get(op.path)) !== JSON.stringify(op.value)) throw new Error(`the test at ${op.path} failed`);
      continue;
    }
    const value = op.op === 'move' || op.op === 'copy' ? structuredClone(get(op.from)) : op.value;
    if (op.op === 'move') {
      const [fo, fk] = parentOf(op.from);
      if (Array.isArray(fo)) fo.splice(Number(fk), 1); else delete fo[fk];
    }
    if (op.op === 'remove') {
      if (Array.isArray(o)) o.splice(Number(k), 1); else delete o[k];
    } else if (Array.isArray(o)) {
      const i = k === '-' ? o.length : Number(k);
      if (op.op === 'replace') o[i] = value; else o.splice(i, 0, value);
    } else o[k] = value;
  }
  return out;
}

// ---------------------------------------------------------------- the tools

const NEEDS = {
  review: 'the entry, your review in your own words and at least one rating',
  correction: 'the exact current words and the words to put in their place, and why',
  evidence: 'at least one https source, the claim it bears on and what it shows',
  'label-change': 'the proposed labels, the conditions under which they hold, why, and at least one source',
  'new-entry': 'its dimension, every part of an entry (title, both labels, judgement, where it fits, the test, the failure to watch, examples, owner), why, and at least one source',
};

function connection(gh) {
  if (gh.login) {
    const how = gh.source === 'env' ? 'with RADAR_GITHUB_TOKEN' : 'signed in on this computer';
    const listed = gh.role ? `on the list of people as ${article(gh.role)}` : 'not on the list of people yet (apply_to_contribute gives the link to apply)';
    const extra = gh.role === 'reviewer' || gh.role === 'editor'
      ? ` As ${article(gh.role)}, you also have review_queue, open_contribution, decide_contribution, edit_contribution${gh.role === 'editor' ? ' and publish_queue' : ''}.` : '';
    return `Connected to GitHub as @${gh.login} (${how}), ${listed}. submit_contribution opens the issue in ${FORMS.repo} from this account.${extra}`;
  }
  return `${notConnected(gh)} submit_contribution returns a pre-filled GitHub issue for the person to open and submit. ${howToConnect(gh)}`;
}

function howTo(gh) {
  const kinds = L.KINDS.map((k) => {
    const form = FORMS.forms.find((f) => f.kind === k);
    return `- **${C.config.kinds?.[k]?.name ?? L.kindName(k)}** (kind \`${k}\`). ${form?.description ?? ''} Needs ${NEEDS[k]}. ${policyWords(k)}.`;
  });
  return ['# Contribute to The Intelligence Radar', '',
    'The people on the list of people (editors, specialist reviewers and contributors) can propose changes to The Intelligence Radar from this conversation. '
      + `Each contribution is a GitHub issue in ${FORMS.repo}, where the review desk checks it, the editors and specialist reviewers decide with their reasons, `
      + 'and every event is recorded in CHAP.', '',
    '## What you can contribute', '', ...kinds, '',
    'A correction can also change the text of a dimension or a sector lens. A review or evidence can also concern another page, named in words.', '',
    '## What reviewers need', '',
    '- A title of one line and a summary that says why, in your own words.',
    '- For each edit, the exact current words, copied from the entry, so that they occur once. Read them with get_entry.',
    '- Sources reviewers can open: https links, with title, publisher and date where known.',
    '- The conditions under which a proposal holds, and what would change the judgement.',
    '- Any tie to a vendor, product or organisation named in the entry or the sources. Write None if there is nothing to declare.',
    '- Whether to credit you by name when it is published.', '',
    '## How it works', '',
    '1. prepare_contribution checks the contribution against this edition and returns its preview and a draft_id. It sends nothing.',
    '2. Show the person the preview. Submit only when they say it is right.',
    `3. submit_contribution ${gh.login ? `opens it as a GitHub issue from @${gh.login}` : 'returns a pre-filled GitHub issue for the person to open and submit'}.`,
    '4. The review desk checks it against the list of people and the rules; then the editors and specialist reviewers decide: approve, edit, ask for changes or decline, each with a reason.',
    '5. When changes are asked for, prepare the new version and send it with revise_contribution. my_contributions shows the status and the reasons.',
    '6. An editor publishes approved contributions in a later release of The Intelligence Radar, crediting the contributor by name unless they chose otherwise.', '',
    '## This install', '', connection(gh), '',
    'To join the list of people as a contributor or specialist reviewer, apply_to_contribute gives the link to apply.'];
}

const SIGN = { readOnlyHint: false, destructiveHint: false, idempotentHint: false, openWorldHint: true };

/** The tools every install has: connect, prepare, submit, follow, revise and withdraw; anyone can apply. */
function contributorTools(server, gh, grant) {
  server.registerTool('how_to_contribute', {
    title: 'How to contribute',
    description: 'How to contribute to The Intelligence Radar from this conversation: what can be contributed, what reviewers need, how review and publication work, '
      + 'and whether this assistant is connected to a GitHub account. Call it before helping someone contribute or review.',
    annotations: LOCAL,
  }, guarded(gh, async () => reply(gh, howTo(gh), { connected: Boolean(gh.login), login: gh.login, role: gh.role, repo: FORMS.repo, problem: gh.problem })));

  let flow = null;
  server.registerTool('sign_in_with_github', {
    title: 'Sign in with GitHub',
    description: 'Connect this assistant to the person\'s GitHub account, so that contributions and reviews go to GitHub from their account. The first call returns a '
      + 'short code and an address: ask the person to open the address and enter the code, then call this again to finish. The sign-in is kept on this computer. '
      + 'With sign_out true, it removes the sign-in.',
    inputSchema: z.object({ sign_out: z.boolean().optional().describe('Remove the sign-in kept on this computer') }),
    annotations: SIGN,
  }, guarded(gh, async ({ sign_out: out }) => {
    if (out) {
      signOut(gh);
      flow = null;
      return reply(gh, gh.source === 'env' ? 'The saved sign-in is removed. RADAR_GITHUB_TOKEN is still set, so this assistant still uses it.'
        : 'Signed out: the sign-in is removed from this computer.', { connected: Boolean(gh.login) });
    }
    if (gh.source === 'env') return reply(gh, `RADAR_GITHUB_TOKEN is set${gh.login ? ` (for @${gh.login})` : ''}, and it is used instead of signing in.`, { connected: Boolean(gh.login), login: gh.login });
    if (!gh.clientId) return fail(gh, ['Signing in with GitHub is not set up in this edition yet.', howToConnect(gh)]);
    if (flow && Date.now() < flow.expires_at) {
      const outcome = await finishSignIn(gh, flow, gh.wait);
      if (outcome === 'done') {
        flow = null;
        grant(gh.role);
        return reply(gh, [`Signed in to GitHub as @${gh.login}. ${gh.role ? `On the list of people as ${article(gh.role)}.`
          : 'This account is not on the list of people yet: apply_to_contribute gives the link to apply.'}`,
        ...(gh.role === 'reviewer' || gh.role === 'editor' ? ['The review tools are now available: review_queue, open_contribution, decide_contribution and edit_contribution.'] : [])],
        { connected: true, login: gh.login, role: gh.role });
      }
      if (outcome === 'waiting') {
        return reply(gh, [`Still waiting. Ask the person to open ${flow.verification_uri} and enter the code ${flow.user_code}, then call sign_in_with_github again.`],
          { connected: false, user_code: flow.user_code, verification_uri: flow.verification_uri });
      }
      flow = null;
      if (outcome === 'denied') return fail(gh, 'The person declined the sign-in on GitHub. Call sign_in_with_github again to start over.');
    }
    flow = await startSignIn(gh);
    return reply(gh, [`Ask the person to open ${flow.verification_uri} and enter this code: **${flow.user_code}**`, '',
      'GitHub then asks them to authorise The Intelligence Radar to open issues and comment in the contributions repository on their behalf. '
        + 'Once they have, call sign_in_with_github again to finish. The code expires in 15 minutes.'],
    { connected: false, user_code: flow.user_code, verification_uri: flow.verification_uri });
  }));

  server.registerTool('prepare_contribution', {
    title: 'Prepare a contribution',
    description: 'Check a contribution to The Intelligence Radar against this edition and prepare it for submission: a review, a correction, evidence, a label change or a new entry. '
      + 'It sends nothing. It returns the exact preview, any problems to fix, the payload and a draft_id. Show the person the preview and get their explicit '
      + 'agreement before calling submit_contribution. For a correction, copy the exact current words from get_entry into find; each must occur once in its section. '
      + 'Ask the person for anything missing, such as the interests they declare and how they want to be credited; never invent it.',
    inputSchema: z.object({
      kind: z.enum(L.KINDS).describe('review, correction, evidence, label-change or new-entry'),
      target: Target.optional().describe('What it is about: exactly one of entry, dimension, sector or general. A new entry names its dimension'),
      title: z.string().max(200).optional().describe('One line of 5 to 120 characters'),
      summary: z.string().max(8000).optional().describe('Why, in the contributor\'s words: 20 to 4000 characters. For evidence, what it shows'),
      edits: z.array(Edit).max(20).optional().describe('For a correction: each change as the exact current words and their replacement'),
      labels: Labels.optional().describe('Proposed labels: required for a label change'),
      conditions: z.string().max(2000).optional().describe('Where, and under what conditions, the proposal holds: required for a label change'),
      reverse_if: z.string().max(2000).optional().describe('What would change this judgement'),
      claim: z.string().max(2000).optional().describe('The claim the evidence bears on: required for evidence'),
      evidence: z.array(Source).max(20).optional().describe('Sources: required for evidence, label changes and new entries'),
      review: Review.optional().describe('For a review: at least one rating, and any suggested wording or corrections'),
      entry: NewEntry.optional().describe('For a new entry: every part of it'),
      disclosure: z.string().max(1000).optional().describe('Any tie to a vendor, product or organisation named in the entry or the sources; None if there is nothing to declare'),
      credit: z.object({
        public: z.boolean().optional().describe('Credit by name when published (true unless the person says otherwise)'),
        name: z.string().max(120).optional().describe('The name to credit; leave it out to use the person\'s name on the list of people'),
        affiliation: z.string().max(160).optional(),
      }).optional(),
    }),
    annotations: LOCAL,
  }, guarded(gh, async (input) => {
    const d = prepare(input);
    const o = d.ready
      ? [`Ready to submit. Show the person this preview and submit it only when they agree: call submit_contribution with draft_id ${d.draftId}. `
        + `Submitting ${gh.login ? `opens a GitHub issue in ${FORMS.repo} from @${gh.login}` : 'gives a pre-filled GitHub issue to open and submit'}.`, '', '---', '',
      L.preview(d.payload, names), '', '---']
      : ['Not ready to submit. Fix these, then call prepare_contribution again:', '', ...d.problems.map((p) => `- ${p}`), ...d.help];
    if (d.warnings.length) o.push('', 'Warnings:', ...d.warnings.map((w) => `- ${w}`));
    o.push('', d.ready ? 'The payload:' : 'The payload so far:', json(d.payload));
    if (d.ready) o.push('', `draft_id: ${d.draftId}`);
    return reply(gh, o, { ready: d.ready, draft_id: d.draftId, problems: d.problems, warnings: d.warnings, payload: d.payload });
  }));

  const draftOf = (id) => drafts.get(String(id).trim());
  const noDraft = (id) => fail(gh, `No draft ${id} was prepared in this conversation. Call prepare_contribution again, show the person the preview, `
    + 'and submit once they agree.');

  server.registerTool('submit_contribution', {
    title: 'Submit a contribution',
    description: 'Submit a contribution prepared with prepare_contribution in this conversation, by its draft_id. Call it only after showing the person the preview '
      + 'and getting their explicit agreement to submit it. Connected to GitHub, it opens the contribution as an issue from the person\'s account and returns the '
      + 'review desk\'s answer; otherwise it returns a pre-filled GitHub issue link for the person to open, check and submit.',
    inputSchema: z.object({ draft_id: draftArg }),
    annotations: SUBMITS,
  }, guarded(gh, async ({ draft_id: id }) => {
    const payload = draftOf(id);
    if (!payload) return noDraft(id);
    if (!gh.login) return githubRoute(gh, payload);
    for (const i of await pages(gh, `/repos/${gh.repo}/issues?state=all&creator=${encodeURIComponent(gh.login)}`)) {
      if (i.pull_request) continue;
      const parsed = L.payloadFromIssue({ title: i.title, body: i.body, labels: labelsOf(i) }, FORMS);
      if (parsed.payload && L.digest(parsed.payload) === id.trim()) {
        return reply(gh, [`This draft was submitted before, as ${contributionId(i.number)}: issue #${i.number}, ${i.html_url}. Nothing new was sent.`],
          { route: 'github-issue', repeated: true, id: contributionId(i.number), issue: i.number, url: i.html_url, status: statusOf(i) });
      }
    }
    const r = L.renderIssue(payload, FORMS, names);
    const issue = await api(gh, 'POST', `/repos/${gh.repo}/issues`, { title: r.title, body: r.body });
    const said = await deskAnswer(gh, issue.number);
    const status = statusOf((await api(gh, 'GET', `/repos/${gh.repo}/issues/${issue.number}`)) ?? issue);
    return reply(gh, [`Submitted as ${contributionId(issue.number)}: GitHub issue #${issue.number}, ${issue.html_url}`, ...answered(said), '',
      `It needs ${policyWords(payload.kind).toLowerCase()}. my_contributions with ${contributionId(issue.number)} shows its status and the reviewers' reasons.`,
      ...(gh.role ? [] : ['', `@${gh.login} is not on the list of people yet, so the issue waits until an editor approves an application: apply_to_contribute gives the link.`])],
    { route: 'github-issue', repeated: false, id: contributionId(issue.number), issue: issue.number, url: issue.html_url, status });
  }));

  server.registerTool('my_contributions', {
    title: 'My contributions',
    description: 'The status of your contributions to The Intelligence Radar, from GitHub: all of them, or one in full with the reviewers\' decisions and reasons.',
    inputSchema: z.object({ id: idArg.optional().describe('One contribution, such as C-0007 or #7; leave it out for all of them') }),
    annotations: READS,
  }, guarded(gh, async ({ id }) => {
    if (!gh.login) {
      const q = new URLSearchParams({ q: 'is:issue author:@me' });
      return reply(gh, [notConnected(gh), '',
        'Each contribution shows its status on its GitHub issue: a label (in-review, changes-requested, approved, published, declined or withdrawn) '
          + 'and the review desk\'s comment, with the reviewers\' reasons, at each change.',
        `The person's issues: https://github.com/${FORMS.repo}/issues?${q}`, '', howToConnect(gh)], { connected: false });
    }
    if (id) {
      const c = await full(gh, issueNumber(id));
      const o = [...head(c)];
      if (c.st.current) o.push('', '## The proposal, as it stands', '', L.preview(c.st.current.payload, names));
      o.push('', '## Versions and decisions', '', ...decisions(c.st));
      if (c.st.status === 'changes-requested') o.push('', 'To answer, prepare the revised version with prepare_contribution, show the person the preview, then call revise_contribution.');
      return reply(gh, o, { id: contributionId(c.issue.number), issue: c.issue.number, url: c.issue.html_url, status: c.st.status === 'new' ? statusOf(c.issue) : c.st.status,
        version: c.st.current?.n ?? null, digest: c.st.current?.digest ?? null, approvals_have: c.st.assessment?.have ?? 0, approvals_needed: c.st.assessment?.needed ?? null,
        events: c.st.events.map(({ e, n, d, by, role, reason, at }) => ({ e, n, d, by, role, reason, at })) });
    }
    const items = (await pages(gh, `/repos/${gh.repo}/issues?state=all&creator=${encodeURIComponent(gh.login)}`)).filter((i) => !i.pull_request && kindOf(i));
    return reply(gh, [items.length ? `${cap(count(items.length, 'contribution'))} from @${gh.login}:` : `No contributions from @${gh.login} yet.`, '',
      ...items.map(summaryLine), ...(items.length ? ['', 'Read one in full with my_contributions and its id.'] : [])],
    { items: items.map((i) => ({ id: contributionId(i.number), issue: i.number, kind: kindOf(i), title: i.title, status: statusOf(i), url: i.html_url })) });
  }));

  const ownOpen = async (id, action) => {
    if (!gh.login) return { problem: [`${notConnected(gh)} It cannot ${action}.`, howToConnect(gh)] };
    const c = await full(gh, issueNumber(id));
    if (String(c.issue.user?.login).toLowerCase() !== gh.login.toLowerCase()) return { problem: `${contributionId(c.issue.number)} is not @${gh.login}'s: only its contributor can ${action}.` };
    if (!['in-review', 'changes-requested'].includes(c.st.status)) {
      return { problem: `${contributionId(c.issue.number)} is ${STATUS_WORDS[c.st.status] ?? c.st.status}; it can be changed only while in review or when changes are requested.` };
    }
    return { c };
  };

  server.registerTool('revise_contribution', {
    title: 'Revise a contribution',
    description: 'Send a revised version of your contribution while it is in review or after the reviewers asked for changes. First prepare the revision with '
      + 'prepare_contribution (the same kind), show the person the preview and get their explicit agreement; then call this with the contribution\'s id and the new draft_id. '
      + 'It updates the GitHub issue; approvals of earlier versions no longer count.',
    inputSchema: z.object({ id: idArg, draft_id: draftArg }),
    annotations: REVISES,
  }, guarded(gh, async ({ id, draft_id: draftId }) => {
    const payload = draftOf(draftId);
    if (!payload) return noDraft(draftId);
    const { c, problem } = await ownOpen(id, 'send a revision');
    if (problem) return fail(gh, problem);
    if (payload.kind !== c.kind) return fail(gh, `A revision keeps the kind of the contribution: ${L.kindName(c.kind).toLowerCase()}.`);
    if (L.digest(payload) === c.st.current?.digest) return fail(gh, 'This draft is the version already in review: nothing would change.');
    const r = L.renderIssue(payload, FORMS, names);
    await api(gh, 'PATCH', `/repos/${gh.repo}/issues/${c.issue.number}`, { title: r.title, body: r.body });
    const said = await deskAnswer(gh, c.issue.number, c.comments.at(-1)?.id ?? 0);
    return reply(gh, [`Sent the revised version of ${contributionId(c.issue.number)}: issue #${c.issue.number} now holds it.`, ...answered(said)],
      { id: contributionId(c.issue.number), issue: c.issue.number, desk: said });
  }));

  server.registerTool('withdraw_contribution', {
    title: 'Withdraw a contribution',
    description: 'Withdraw your contribution before a final decision. Call it only when the person has said so. It comments /withdraw on the GitHub issue, which closes it.',
    inputSchema: z.object({ id: idArg, reason: z.string().max(1000).optional().describe('Why, in the person\'s words (optional)') }),
    annotations: DECIDES,
  }, guarded(gh, async ({ id, reason }) => {
    const { c, problem } = await ownOpen(id, 'withdraw it');
    if (problem) return fail(gh, problem);
    const posted = await api(gh, 'POST', `/repos/${gh.repo}/issues/${c.issue.number}/comments`, { body: `/withdraw ${reason ?? ''}`.trim() });
    const said = await deskAnswer(gh, c.issue.number, posted.id);
    return reply(gh, [`Asked the review desk to withdraw ${contributionId(c.issue.number)} (issue #${c.issue.number}).`, ...answered(said)], { id: contributionId(c.issue.number), desk: said });
  }));

  server.registerTool('apply_to_contribute', {
    title: 'Apply to contribute',
    description: 'A pre-filled link to the form for joining the list of people of The Intelligence Radar as a contributor or specialist reviewer. '
      + 'The application is a public GitHub issue that an editor reviews. Fill in only what the person gives.',
    inputSchema: z.object({
      name: z.string().max(120).optional(),
      affiliation: z.string().max(160).optional().describe('Their organisation, or Independent'),
      experience: z.string().max(4000).optional().describe('Their relevant work, in a few sentences'),
      links: z.string().max(2000).optional().describe('Profiles, publications or projects that show their work'),
      disclosure: z.string().max(1000).optional().describe('Employers, clients or vendors they work with that The Intelligence Radar may judge; None if none'),
    }),
    annotations: LOCAL,
  }, guarded(gh, async (given) => {
    const form = FORMS.forms.find((f) => f.file === C.config.apply_form) ?? FORMS.forms.find((f) => f.kind === null);
    const q = new URLSearchParams({ template: form.file });
    if (given.name?.trim()) q.set('title', form.title + given.name.trim());
    for (const f of form.fields) {
      const v = (f.type === 'input' || f.type === 'textarea') && given[f.to];
      if (v && v.trim()) q.set(f.id, v.trim());
    }
    const url = `https://github.com/${FORMS.repo}/issues/new?${q}`;
    return reply(gh, ['To apply, open this link, check the form, choose a role and the areas you know best, tick the terms and press Submit new issue:', '', url, '',
      'The application is a public GitHub issue, so share only what you are happy to publish. An editor reviews it. Once approved, your GitHub account is on the '
        + 'list of people, and everything you send, on GitHub or from your AI assistant, is checked against it automatically.'],
    { url });
  }));
}

/** The tools for specialist reviewers and editors: the queue, one contribution in full, and the decisions. */
function reviewerTools(server, gh) {
  const mayReview = async (id) => {
    if (!(gh.role === 'reviewer' || gh.role === 'editor')) return { problem: 'Only the editors and specialist reviewers on the list of people review contributions.' };
    const c = await full(gh, issueNumber(id));
    if (String(c.issue.user?.login).toLowerCase() === String(gh.login).toLowerCase()) return { problem: 'You cannot review your own contribution.' };
    if (c.st.status !== 'in-review') return { problem: `${contributionId(c.issue.number)} is ${STATUS_WORDS[c.st.status] ?? c.st.status}, so it takes no decisions now.` };
    return { c };
  };
  const stale = (c, digest) => (digest !== c.st.current.digest
    ? `${contributionId(c.issue.number)} has changed since you read it: version ${c.st.current.n} is current. Read it again with open_contribution before deciding.` : null);

  server.registerTool('review_queue', {
    title: 'Review queue',
    description: 'Contributions to The Intelligence Radar in review on GitHub, for specialist reviewers and editors, except your own. Read one in full with open_contribution.',
    inputSchema: z.object({ kind: z.enum(L.KINDS).optional().describe('Only this kind') }),
    annotations: READS,
  }, guarded(gh, async ({ kind }) => {
    const open = (await pages(gh, `/repos/${gh.repo}/issues?state=open&labels=in-review`))
      .filter((i) => !i.pull_request && kindOf(i) && (!kind || kindOf(i) === kind) && String(i.user?.login).toLowerCase() !== String(gh.login).toLowerCase());
    const items = [];
    for (const i of open.slice(0, 30)) {
      const st = contributionState(eventsOf(await pages(gh, `/repos/${gh.repo}/issues/${i.number}/comments`), BOT), C.config, kindOf(i));
      items.push({ id: contributionId(i.number), issue: i.number, kind: kindOf(i), title: st.current?.payload?.title ?? i.title, contributor: i.user?.login,
        version: st.current?.n ?? null, waiting_for: waitingFor(st), you_approved: hasApproved(st, gh.login), url: i.html_url });
    }
    return reply(gh, [items.length ? `${cap(count(items.length, 'contribution'))} in review:` : 'No contribution is in review.', '',
      ...items.map((x) => `- **${x.id}** (#${x.issue}) ${L.kindName(x.kind)}: ${x.title}. From @${x.contributor}. Version ${x.version}. `
        + `${x.you_approved ? 'You have approved this version.' : `Waiting for ${x.waiting_for}.`}`),
      ...(items.length ? ['', 'Read one in full with open_contribution before deciding.'] : [])], { items });
  }));

  server.registerTool('open_contribution', {
    title: 'Open a contribution',
    description: 'One contribution in full, for review: the proposal, the entry\'s current text of each section it changes beside the proposed text, the evidence, '
      + 'the decisions so far, the review policy, and the digest of the version to pass to decide_contribution or edit_contribution.',
    inputSchema: z.object({ id: idArg }),
    annotations: READS,
  }, guarded(gh, async ({ id }) => {
    const c = await full(gh, issueNumber(id));
    if (!c.st.current) return fail(gh, `${contributionId(c.issue.number)} is not in review yet: ${STATUS_WORDS[statusOf(c.issue)] ?? statusOf(c.issue)}.`);
    const p = c.st.current.payload;
    const check = L.validate(p, ctx);
    const o = [...head(c), `- Digest of version ${c.st.current.n}: ${c.st.current.digest}. Pass it with any decision or edit.`, '',
      '## The proposal', '', L.preview(p, names), ''];
    const ch = changes(p);
    if (ch.length) o.push('## What it changes', '', ...ch);
    if (!check.ok || check.warnings.length) o.push('## Against this edition', '', ...[...check.errors, ...check.warnings].map((w) => `- ${w}`), '');
    o.push('## Versions and decisions', '', ...decisions(c.st), '',
      'The reviewer decides. Call decide_contribution or edit_contribution only after the reviewer has stated the decision and the reason in their own words.');
    return reply(gh, o, { id: contributionId(c.issue.number), issue: c.issue.number, url: c.issue.html_url, status: c.st.status, version: c.st.current.n,
      digest: c.st.current.digest, payload: p, approvals_have: c.st.assessment.have, approvals_needed: c.st.assessment.needed, waiting_for: waitingFor(c.st) });
  }));

  server.registerTool('decide_contribution', {
    title: 'Record a review decision',
    description: 'Record a reviewer\'s decision on a contribution: approve, request_changes or decline, with the reviewer\'s rationale and the digest from '
      + 'open_contribution. The reviewer decides, not the assistant: call this only when the reviewer has stated the decision and the rationale in their own words '
      + 'in this conversation, and pass the rationale as they gave it. It comments the decision on the GitHub issue from the reviewer\'s account; the review desk '
      + 'applies it and records it for CHAP. It cannot be taken back, and a decline is final.',
    inputSchema: z.object({
      id: idArg,
      decision: z.enum(['approve', 'request_changes', 'decline']).describe('approve, request_changes or decline, as the reviewer said'),
      rationale: rationaleArg,
      digest: digestArg,
    }),
    annotations: DECIDES,
  }, guarded(gh, async ({ id, decision, rationale, digest }) => {
    const { c, problem } = await mayReview(id);
    if (problem) return fail(gh, problem);
    const changed = stale(c, digest);
    if (changed) return fail(gh, changed);
    if (decision === 'approve' && hasApproved(c.st, gh.login)) return fail(gh, `You have already approved version ${c.st.current.n}.`);
    const posted = await api(gh, 'POST', `/repos/${gh.repo}/issues/${c.issue.number}/comments`, { body: `/${COMMAND[decision]} ${digest.slice(0, 23)} ${rationale.trim()}` });
    const said = await deskAnswer(gh, c.issue.number, posted.id);
    return reply(gh, [`Sent: @${gh.login} ${DECIDED[decision]} ${contributionId(c.issue.number)}, version ${c.st.current.n}, on issue #${c.issue.number}.`, ...answered(said)],
      { id: contributionId(c.issue.number), issue: c.issue.number, decision, comment: posted.html_url ?? null, desk: said });
  }));

  server.registerTool('edit_contribution', {
    title: 'Edit and approve a contribution',
    description: 'Edit a contribution and approve the result, as a reviewer: give replacement edits and/or labels, or an RFC 6902 patch against the payload, with '
      + 'the reviewer\'s rationale and the digest from open_contribution. The edit makes a new version, shown on the GitHub issue, and counts as the reviewer\'s '
      + 'approval of it. The reviewer decides, not the assistant: call this only when the reviewer has stated the change and the rationale in their own words. '
      + 'An edit keeps the contribution\'s kind, target, credit and declared interests.',
    inputSchema: z.object({
      id: idArg,
      rationale: rationaleArg,
      digest: digestArg,
      edits: z.array(Edit).max(20).optional().describe('The full list of edits the contribution should carry: it replaces the current list'),
      labels: Labels.optional().describe('The proposed labels the contribution should carry: they replace the current ones'),
      patch: z.array(z.object({
        op: z.enum(['add', 'remove', 'replace', 'move', 'copy', 'test']),
        path: z.string().max(200).describe('A JSON pointer into the payload, such as /summary or /edits/0/replace'),
        from: z.string().max(200).optional(),
        value: z.unknown().optional(),
      })).min(1).max(100).optional().describe('Instead of edits and labels: RFC 6902 operations on the payload'),
    }),
    annotations: DECIDES,
  }, guarded(gh, async ({ id, rationale, digest, edits, labels, patch }) => {
    const ops = editPatch({ patch, edits, labels });
    if (ops.problem) return fail(gh, ops.problem);
    const { c, problem } = await mayReview(id);
    if (problem) return fail(gh, problem);
    const changed = stale(c, digest);
    if (changed) return fail(gh, changed);
    if (hasApproved(c.st, gh.login)) return fail(gh, `You have already approved version ${c.st.current.n}; ask for changes instead.`);
    let next;
    try {
      next = L.normalise(applyPatch(c.st.current.payload, ops.patch));
    } catch (err) {
      return fail(gh, `The edit does not apply to the current version: ${err.message}.`);
    }
    const kept = ['schema', 'kind', 'target', 'base', 'credit', 'disclosure'].filter((k) => L.canonical(next[k] ?? null) !== L.canonical(c.st.current.payload[k] ?? null));
    if (kept.length) return fail(gh, `An edit keeps the contribution's ${kept.join(', ')}.`);
    const v = L.validate(next, ctx);
    if (!v.ok) return fail(gh, ['The edit would make the contribution invalid:', ...v.errors.map((e) => `- ${e}`)]);
    if (L.digest(next) === c.st.current.digest) return fail(gh, 'The edit changes nothing.');
    const [first, ...more] = rationale.trim().split('\n');
    const block = JSON.stringify(next, null, 1);
    const fence = '`'.repeat(Math.max(3, ...(block.match(/`+/g) || []).map((r) => r.length + 1)));
    const body = [`/edit ${digest.slice(0, 23)} ${first}`, ...more, '', `${fence}json`, block, fence].join('\n');
    const posted = await api(gh, 'POST', `/repos/${gh.repo}/issues/${c.issue.number}/comments`, { body });
    const said = await deskAnswer(gh, c.issue.number, posted.id);
    return reply(gh, [`Sent: @${gh.login} edited ${contributionId(c.issue.number)} (issue #${c.issue.number}); the new version counts as their approval.`, ...answered(said)],
      { id: contributionId(c.issue.number), issue: c.issue.number, digest: L.digest(next), desk: said });
  }));
}

/** Editors only: the approved contributions waiting to be published. */
function editorTools(server, gh) {
  server.registerTool('publish_queue', {
    title: 'Publish queue',
    description: 'Editors: the approved contributions to The Intelligence Radar waiting to be published, with their approvals and the credit each contributor chose.',
    annotations: READS,
  }, guarded(gh, async () => {
    const items = [];
    for (const i of await pages(gh, `/repos/${gh.repo}/issues?state=open&labels=approved`)) {
      if (i.pull_request || !kindOf(i)) continue;
      const st = contributionState(eventsOf(await pages(gh, `/repos/${gh.repo}/issues/${i.number}/comments`), BOT), C.config, kindOf(i));
      if (st.status !== 'approved') continue;
      const p = st.current.payload;
      items.push({ id: contributionId(i.number), issue: i.number, kind: kindOf(i), title: p.title, target: p.target, digest: st.current.digest, approved_at: st.approvedAt,
        approvals: st.assessment.counted.map((d) => ({ by: d.person, role: d.role })), credit: p.credit?.public === false ? null : (p.credit?.name ?? `@${i.user?.login}`) });
    }
    return reply(gh, [items.length ? `${cap(count(items.length, 'approved contribution'))} ${items.length === 1 ? 'waits' : 'wait'} to be published:` : 'No approved contribution waits to be published.', '',
      ...items.map((x) => `- **${x.id}** (#${x.issue}) ${L.kindName(x.kind)}: ${x.title} (${L.targetName(x.target, names)}). Approved ${day(x.approved_at)} by `
        + `${x.approvals.map((a) => `@${a.by} (${a.role})`).join(', ')}. Credit: ${x.credit ?? 'not credited publicly'}.`),
      ...(items.length ? ['', 'The publisher (build/community_publish.py) applies them to the sources, rebuilds and checks The Intelligence Radar; '
        + 'the site change merges once CHAP shows each one approved.'] : [])], { items });
  }));
}

/** Contributor tools always; reviewer tools for a reviewer or editor on the list of people; the publish queue for an editor. A sign-in may add them later. */
export function registerContributionTools(server, gh) {
  const has = new Set();
  const grant = (role) => {
    if ((role === 'reviewer' || role === 'editor') && !has.has('reviewer')) {
      has.add('reviewer');
      reviewerTools(server, gh);
    }
    if (role === 'editor' && !has.has('editor')) {
      has.add('editor');
      editorTools(server, gh);
    }
  };
  contributorTools(server, gh, grant);
  grant(gh.role);
}

/** A sentence for the server's instructions. */
export function contributionInstructions(gh) {
  const role = gh.role;
  return 'To contribute to The Intelligence Radar, start with how_to_contribute; show the person the preview from prepare_contribution and submit only with their explicit agreement.'
    + (role === 'reviewer' || role === 'editor' ? ' Reviewers decide: call decide_contribution or edit_contribution only when the reviewer has stated the decision and the reason in their own words.' : '');
}
