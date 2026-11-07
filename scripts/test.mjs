// Starts dist/index.mjs over stdio, as a host would, and checks every tool, prompt and resource against the data,
// on both protocol eras (the 2025 initialize handshake and 2026-07-28 negotiation). Then the contribution tools: offline,
// and end to end on a stand-in GitHub where the real review desk (community/github/.github/desk) answers every change.
import { Client } from '@modelcontextprotocol/client';
import { StdioClientTransport } from '@modelcontextprotocol/client/stdio';
import { randomBytes } from 'node:crypto';
import { existsSync, mkdtempSync, readdirSync, readFileSync, rmSync } from 'node:fs';
import fs from 'node:fs/promises';
import { createServer } from 'node:http';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { digest, entryDigest, parseEntry } from '../src/contribution.js';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PKG = path.resolve(ROOT, '..'); // The Intelligence Radar's package: source/ and community/
const R = JSON.parse(await fs.readFile(path.join(ROOT, 'data/radar.json'), 'utf8'));
const results = [];
const check = (name, ok, detail = '') => { results.push([name, !!ok, detail]); };
const textOf = (r) => (r.content || []).filter((c) => c.type === 'text').map((c) => c.text).join('\n');
const same = (a, b) => JSON.stringify([...a].sort()) === JSON.stringify([...b].sort());

const READING = ['about_radar', 'check_plan', 'get_dimension', 'get_entry', 'get_sector', 'get_sources', 'list_dimensions', 'list_judgements', 'search_radar', 'show_radar'];
const CONTRIBUTOR = ['apply_to_contribute', 'how_to_contribute', 'my_contributions', 'prepare_contribution', 'revise_contribution', 'sign_in_with_github',
  'submit_contribution', 'withdraw_contribution'];
const NO_SIGN_IN = mkdtempSync(path.join(os.tmpdir(), 'radar-mcp-config-')); // an empty configuration folder: no saved sign-in
const REVIEWER = ['decide_contribution', 'edit_contribution', 'open_contribution', 'review_queue'];

/** The built server, started as a host starts it, with these settings in its environment. */
async function connect(env = {}, options = undefined) {
  const client = new Client({ name: 'radar-test', version: '1.0.0' }, options);
  await client.connect(new StdioClientTransport({ command: process.execPath, args: [path.join(ROOT, 'dist/index.mjs')],
    env: { RADAR_CONFIG_DIR: NO_SIGN_IN, ...env }, stderr: 'ignore' }));
  return client;
}

async function run(label, options) {
  const client = await connect({}, options);
  const t = (name) => `${label}: ${name}`;
  check(t('negotiates a protocol version'), client.getNegotiatedProtocolVersion(), client.getNegotiatedProtocolVersion());
  check(t('gives instructions that name entries by ID and title'), /ID and title/.test(client.getInstructions() || ''));
  check(t('gives instructions that start contributors at how_to_contribute'), /how_to_contribute/.test(client.getInstructions() || ''));

  const { tools } = await client.listTools();
  const names = tools.map((x) => x.name).sort();
  check(t('lists the ten reading tools and, without a GitHub connection, the eight contributor tools'), same(names, [...READING, ...CONTRIBUTOR]), names.join(', '));
  check(t('marks the reading tools read-only'), tools.filter((x) => READING.includes(x.name)).every((x) => x.annotations?.readOnlyHint === true));
  const ann = Object.fromEntries(tools.map((x) => [x.name, x.annotations ?? {}]));
  check(t('marks how_to_contribute, prepare_contribution, apply_to_contribute and my_contributions read-only'),
    ['how_to_contribute', 'prepare_contribution', 'apply_to_contribute', 'my_contributions'].every((n) => ann[n]?.readOnlyHint === true));
  check(t('marks submit_contribution and revise_contribution as writes that destroy nothing and reach GitHub; submitting is idempotent'),
    ['submit_contribution', 'revise_contribution'].every((n) => ann[n]?.readOnlyHint === false && ann[n]?.destructiveHint === false && ann[n]?.openWorldHint === true)
    && ann.submit_contribution?.idempotentHint === true);
  const show = tools.find((x) => x.name === 'show_radar');
  check(t('links show_radar to its view'), show?._meta?.ui?.resourceUri === 'ui://intelligence-radar/radar-view.html', JSON.stringify(show?._meta));

  const about = textOf(await client.callTool({ name: 'about_radar', arguments: {} }));
  check(t('about_radar counts every entry and dimension'), about.includes(`${R.entries.length} capabilities`) && R.dimensions.every((d) => about.includes(d.name)));

  const top = async (query, n = 3) => (await client.callTool({ name: 'search_radar', arguments: { query } })).structuredContent.results.slice(0, n).map((r) => r.id);
  for (const [q, id] of [['agent memory', 'IR-019'], ['MCP', 'IR-028'], ['permission-aware retrieval', 'IR-013'], ['GraphRAG knowledge graph', 'IR-017'],
    ['formal verification proofs', 'IR-046'], ['IR-046', 'IR-046'], ['speech voice', 'IR-005']]) {
    const ids = await top(q);
    check(t(`search "${q}" finds ${id}`), ids.includes(id), ids.join(', '));
  }
  const agentsUse = await client.callTool({ name: 'search_radar', arguments: { dimension: 'Agents', intelligence: 'Use', limit: 50 } });
  const expect = R.entries.filter((e) => e.dimension === 3 && e.intelligence === 'Use').map((e) => e.id);
  check(t('search filters by dimension and label'), JSON.stringify(agentsUse.structuredContent.results.map((r) => r.id)) === JSON.stringify(expect), expect.join(', '));
  const badDimension = await client.callTool({ name: 'search_radar', arguments: { dimension: 'Underwater basket weaving' } });
  check(t('search reports an unknown dimension'), badDimension.isError === true);

  for (const ref of ['IR-028', 28, 'mcp tool integration', 'ir28']) {
    const e = textOf(await client.callTool({ name: 'get_entry', arguments: { entry: ref } }));
    check(t(`get_entry finds IR-028 from ${JSON.stringify(ref)}`), e.startsWith('# IR-028 MCP tool integration') && e.includes('[164]') && e.includes(R.entries.find((x) => x.id === 'IR-028').enterprise));
  }
  const missing = await client.callTool({ name: 'get_entry', arguments: { entry: 'quantum teleportation of spreadsheets' } });
  check(t('get_entry reports an entry it cannot find'), missing.isError === true);
  const every = await Promise.all(R.entries.map((e) => client.callTool({ name: 'get_entry', arguments: { entry: e.id } })));
  check(t('get_entry reads all entries with their labels and sources'), every.every((r, i) => {
    const s = textOf(r);
    const e = R.entries[i];
    return s.includes(`Intelligence: ${e.intelligence} · Enterprise: ${e.enterprise}`) && e.sources.every((n) => s.includes(`[${n}]`));
  }));

  const doms = textOf(await client.callTool({ name: 'list_dimensions', arguments: {} }));
  check(t('list_dimensions lists the nine dimensions'), R.dimensions.every((d) => doms.includes(`${d.number} ${d.name}`)));
  for (const d of R.dimensions) {
    const s = textOf(await client.callTool({ name: 'get_dimension', arguments: { dimension: d.number } }));
    const ids = Object.values(d.by_ring).flat();
    if (!(s.includes(d.question) && ids.every((id) => s.includes(id)) && d.implications.every((x) => s.includes(x)))) {
      check(t(`get_dimension ${d.number}`), false, d.name);
    }
  }
  check(t('get_dimension gives every dimension its question, implications and entries'), !results.some(([n, ok]) => n.startsWith(t('get_dimension ')) && !ok));

  const plan = 'Q1: roll out coding agents to all engineers and connect our agents to Jira and Salesforce through MCP servers. '
    + 'Q2: build a RAG assistant over SharePoint with permission-aware retrieval, and fine-tune an open-weight model on our support tickets. '
    + 'Q3: let agents act autonomously on refunds. We will also look at IR-031.';
  const pc = await client.callTool({ name: 'check_plan', arguments: { text: plan } });
  const pm = pc.structuredContent.matches.map((m) => m.id);
  check(t('check_plan puts an entry named in the text first'), pm[0] === 'IR-031', pm.join(', '));
  check(t('check_plan finds the topics a plan touches'), ['IR-028', 'IR-013'].every((id) => pm.includes(id)), pm.join(', '));
  check(t('check_plan flags entries at Wait or Prepare'), pc.structuredContent.matches.filter((m) => ['Wait', 'Prepare'].includes(m.intelligence)).every((m) => m.flag));
  check(t('check_plan lists the dimensions a plan leaves out'), Array.isArray(pc.structuredContent.untouched_dimensions));

  const js = textOf(await client.callTool({ name: 'list_judgements', arguments: {} }));
  check(t('list_judgements gives every enterprise judgement'), R.judgements.every((j) => js.includes(j.title)));
  const src = textOf(await client.callTool({ name: 'get_sources', arguments: { numbers: [164, 170, 57] } }));
  const s164 = R.sources.find((s) => s.n === 164);
  check(t('get_sources gives titles and links and names unused numbers'), src.includes(s164.title) && src.includes(s164.urls[0]) && /No source numbered 57/.test(src));

  const sr = await client.callTool({ name: 'show_radar', arguments: { dimension: 3, highlight: ['IR-028', 'ir32'], caption: 'Agents' } });
  const want3 = R.entries.filter((e) => e.dimension === 3).map((e) => e.id);
  check(t('show_radar returns the selection for the view'), sr.structuredContent.dimension === 3 && JSON.stringify(sr.structuredContent.highlight) === '["IR-028","IR-032"]'
    && JSON.stringify(sr.structuredContent.shown) === JSON.stringify(want3), JSON.stringify(sr.structuredContent).slice(0, 200));
  check(t('show_radar describes the selection in text for hosts without views'), textOf(sr).includes('IR-028 MCP tool integration'));

  // the sector lens
  const L = R.sectors;
  check(t('carries the sector lens'), Array.isArray(L) && L.length >= 6 && R.starting_points === undefined, `${L?.length} sectors`);
  const list = textOf(await client.callTool({ name: 'get_sector', arguments: {} }));
  check(t('get_sector lists the sectors'), L.every((x) => list.includes(x.name) && list.includes(x.headline)));
  for (const x of L) {
    for (const ref of [x.slug, x.name, x.name.split(' ')[0].slice(0, 7), x.scope.split(/[ ,]+/)[0]]) {
      const g = await client.callTool({ name: 'get_sector', arguments: { sector: ref } });
      if (g.isError || !textOf(g).startsWith(`# The sector lens: ${x.name}`)) check(t(`get_sector finds ${x.name} from "${ref}"`), false, textOf(g).slice(0, 80));
    }
    const g = textOf(await client.callTool({ name: 'get_sector', arguments: { sector: x.slug } }));
    const nums = [...x.rules.flatMap((r) => r.sources), ...x.moves.flatMap((m) => m.sources), ...x.hold.flatMap((h) => h.sources)];
    const full = x.rules.every((r) => g.includes(r.text)) && x.start.every((a) => g.includes(a.id) && g.includes(a.why))
      && x.moves.every((m) => g.includes(`here Intelligence ${m.intelligence} · Enterprise ${m.enterprise}`) && g.includes(m.why))
      && x.hold.every((h) => g.includes(h.why)) && x.relevant.every((id) => g.includes(id))
      && nums.every((n) => g.includes(`- [${n}] ${R.sources.find((y) => y.n === n).title}`));
    check(t(`get_sector gives ${x.name} in full, with its sources`), full);
    const moved = x.moves.every((m) => R.entries.find((e) => e.id === m.id) && (m.intelligence !== R.entries.find((e) => e.id === m.id).intelligence
      || m.enterprise !== R.entries.find((e) => e.id === m.id).enterprise));
    check(t(`${x.name}: every entry placed differently differs from its general labels`), moved);
    const sr2 = await client.callTool({ name: 'search_radar', arguments: { sector: x.slug, limit: 100 } });
    const got = sr2.structuredContent.results.map((r) => r.id);
    check(t(`search_radar keeps to ${x.name}`), got.length === x.relevant.length && got.every((id) => x.relevant.includes(id)), got.join(', '));
    const m0 = x.moves[0];
    const sr3 = textOf(await client.callTool({ name: 'search_radar', arguments: { sector: x.slug, query: R.entries.find((e) => e.id === m0.id).title } }));
    check(t(`search_radar notes the ${x.name} placement`), sr3.includes(`Intelligence ${m0.intelligence}, Enterprise ${m0.enterprise}`), sr3.slice(0, 300));
    const ge = textOf(await client.callTool({ name: 'get_entry', arguments: { entry: m0.id } }));
    check(t(`get_entry carries the ${x.name} lens`), ge.includes('## Sector lens') && ge.includes(m0.why));
    const vw = await client.callTool({ name: 'show_radar', arguments: { sector: x.name } });
    check(t(`show_radar lights ${x.name}`), vw.structuredContent.sector === x.slug && JSON.stringify(vw.structuredContent.shown) === JSON.stringify(R.entries.filter((e) => x.relevant.includes(e.id)).map((e) => e.id))
      && textOf(vw).includes(x.headline));
    const cp = textOf(await client.callTool({ name: 'check_plan', arguments: { text: plan, sector: x.slug } }));
    check(t(`check_plan reads a plan through ${x.name}`), cp.includes(`What binds in ${x.name.toLowerCase()}`) && x.rules.every((r) => cp.includes(r.text)));
  }
  const badSector = await client.callTool({ name: 'get_sector', arguments: { sector: 'Underwater basket weaving' } });
  check(t('get_sector reports a sector it does not cover'), badSector.isError === true);
  const badSearch = await client.callTool({ name: 'search_radar', arguments: { sector: 'Underwater basket weaving' } });
  check(t('search_radar reports a sector it does not cover'), badSearch.isError === true);

  const { resources } = await client.listResources();
  const uris = resources.map((x) => x.uri);
  check(t('lists the resources'), ['radar://about', 'radar://labels', 'radar://full-text', 'ui://intelligence-radar/radar-view.html', 'radar://dimensions/1', 'radar://entries/IR-001']
    .every((u) => uris.includes(u)), `${uris.length} resources`);
  const { resourceTemplates } = await client.listResourceTemplates();
  check(t('lists the two resource templates'), resourceTemplates.length === 2, resourceTemplates.map((x) => x.uriTemplate).join(', '));
  const view = await client.readResource({ uri: 'ui://intelligence-radar/radar-view.html' });
  check(t('serves the radar view as an MCP App'), view.contents[0].mimeType === 'text/html;profile=mcp-app' && view.contents[0].text.includes('id="rv-data"')
    && (view.contents[0].text.match(/class="pt"/g) || []).length === R.entries.length * 2 && view.contents[0].text.includes('id="rv-sec"'));
  const vdata = JSON.parse((view.contents[0].text.match(/<script type="application\/json" id="rv-data">([\s\S]*?)<\/script>/) || [])[1] || '{}');
  check(t('the radar view carries every entry and the sector lens'), vdata.entries?.length === R.entries.length
    && JSON.stringify((vdata.sectors || []).map((x) => [x.slug, x.relevant, x.moves.map((m) => m.id)])) === JSON.stringify(R.sectors.map((x) => [x.slug, x.relevant, x.moves.map((m) => m.id)])));
  const entryRes = await client.readResource({ uri: 'radar://entries/IR-001' });
  check(t('reads an entry resource'), entryRes.contents[0].text.startsWith('# IR-001'));
  const full = await client.readResource({ uri: 'radar://full-text' });
  check(t('reads the complete text'), full.contents[0].text.length > 200000);

  const { prompts } = await client.listPrompts();
  check(t('lists the four prompts'), JSON.stringify(prompts.map((p) => p.name).sort()) === '["board_questions","brief_dimension","plan_trial","review_roadmap"]');
  const bd = await client.getPrompt({ name: 'brief_dimension', arguments: { dimension: 'Agents and workflow', audience: 'our board' } });
  check(t('brief_dimension carries the dimension and the audience'), bd.messages[0].content.text.includes('How much freedom should software have') && bd.messages[0].content.text.includes('our board'));
  const pt = await client.getPrompt({ name: 'plan_trial', arguments: { entry: 'IR-028' } });
  check(t('plan_trial carries the entry'), pt.messages[0].content.text.includes('# IR-028 MCP tool integration'));
  const rr = await client.getPrompt({ name: 'review_roadmap', arguments: { roadmap: plan } });
  check(t('review_roadmap carries the roadmap'), rr.messages[0].content.text.includes('check_plan') && rr.messages[0].content.text.includes('Salesforce'));
  const bq = await client.getPrompt({ name: 'board_questions', arguments: { topic: '4' } });
  check(t('board_questions carries a dimension'), bq.messages[0].content.text.includes('Assurance, security and governance'));
  const comp = await client.complete({ ref: { type: 'ref/prompt', name: 'brief_dimension' }, argument: { name: 'dimension', value: 'ag' } });
  check(t('completes dimension names'), comp.completion.values.includes('Agents and workflow'), comp.completion.values.join(', '));
  await contributing(client, t);
  await client.close();
}

// ---------------------------------------------------------------- contributions

const C = R.community;
// In the editorial package the sources sit beside the server; the server's own repository carries the data only
const SOURCE = path.join(PKG, 'source', 'entries');
const HAS_SOURCE = existsSync(SOURCE);
const entryText = (id) => (HAS_SOURCE ? readFileSync(path.join(SOURCE, `${id}.md`), 'utf8') : C.entries[id]);
// The examples follow IR-028 as it stands, so a published contribution that changes it cannot break these checks:
// FIND is a phrase that occurs once in its judgement, ALT an intelligence label it does not carry.
const E28 = parseEntry(C.entries['IR-028']);
function uniquePhrase(section) {
  const words = section.split(/\s+/);
  for (let n = 4; n <= 12; n++) {
    for (let i = 0; i + n <= words.length; i++) {
      const phrase = words.slice(i, i + n).join(' ');
      if (phrase.length >= 15 && !/[[\]]/.test(phrase) && section.split(phrase).length === 2) return phrase;
    }
  }
  throw new Error('IR-028 has no unique phrase in its judgement');
}
const FIND = uniquePhrase(E28.sections.judgement);
const REPL = `${FIND} (as checked)`;
const ALT = ['Use', 'Trial', 'Evaluate', 'Wait', 'Prepare'].find((l) => l !== E28.header.intelligence);
const AFTER = E28.sections.judgement.split(FIND)[1].slice(0, 20);
const newEntry = {
  title: 'Agent run books', intelligence: 'Evaluate', enterprise: 'Watch',
  judgement: 'Teams that run agents in production now write run books for them, as they do for services: what the agent may do, how to stop it, '
    + 'and who answers when it fails. Early reports show fewer and shorter incidents where run books exist and are rehearsed.',
  where: 'Agents that act on production systems or customer data.', test: 'Run a drill: stop the agent, roll back its last actions and time the recovery.',
  failure: 'A run book nobody has rehearsed, which gives false comfort.', examples: 'Incident run books for coding and support agents.', owner: 'Platform engineering lead',
};
// One valid contribution of each kind, naming its target as a person might
const VALID = {
  review: { kind: 'review', target: { entry: 'MCP tool integration' }, title: 'Review of MCP tool integration',
    summary: 'Clear and well sourced. The test could say how to check tool output for prompt injection.',
    review: { makes_sense: 'yes', easy_to_read: 'partly', intelligence_label: 'yes' }, disclosure: 'None' },
  correction: { kind: 'correction', target: { entry: 'ir28' }, title: 'Name the neutral home of Agent Skills',
    summary: 'The foundation is named in its announcement; the entry should say so precisely.',
    edits: [{ section: 'judgement', find: FIND, replace: REPL }],
    evidence: [{ url: 'https://example.org/aaif', title: 'Announcement' }], disclosure: 'None', credit: { name: 'Test Contributor' } },
  evidence: { kind: 'evidence', target: { entry: 28 }, title: 'A survey of MCP server permissions',
    summary: 'A survey of public MCP servers found broad, unscoped credentials in many of them.', claim: 'Treat each MCP server as a privileged dependency.',
    evidence: [{ url: 'https://example.org/mcp-survey', title: 'MCP server survey', publisher: 'Example Lab', date: '2026-10', relation: 'supports' }], disclosure: 'None' },
  'label-change': { kind: 'label-change', target: { entry: 'IR-028' }, title: `Move MCP tool integration to ${ALT}`,
    summary: 'Vetted MCP servers now run in production agent platforms with mature controls.', labels: { intelligence: ALT },
    conditions: 'Where servers are vetted, pinned and scoped to read-only tools first.', evidence: [{ url: 'https://example.org/mcp-adoption', title: 'Adoption survey' }],
    disclosure: 'None', credit: { public: false } },
  'new-entry': { kind: 'new-entry', target: { dimension: 'Agents and workflow' }, title: 'Propose agent run books',
    summary: 'Run books for agents are spreading fast, and readers ask where they stand.', entry: newEntry,
    evidence: [{ url: 'https://example.org/run-books', title: 'Run books for agents' }], disclosure: 'None' },
};

/** The contributor tools with no Desk: prepare each kind, refuse what the edition does not hold, and the GitHub route. */
async function contributing(client, t) {
  const call = (name, args = {}) => client.callTool({ name, arguments: args });
  const how = textOf(await call('how_to_contribute'));
  check(t('how_to_contribute names every kind and its review, and says this assistant is not connected to GitHub'),
    Object.values(C.config.kinds).every((k) => how.includes(k.name)) && how.includes('One approval, from an editor') && /not connected to a GitHub account/.test(how));

  const drafts = {};
  for (const [kind, args] of Object.entries(VALID)) {
    const r = await call('prepare_contribution', args);
    const s = r.structuredContent ?? {};
    const p = s.payload ?? {};
    const base = p.base?.edition === C.edition && (!p.target?.entry || p.base.entry_digest === entryDigest(entryText(p.target.entry)));
    check(t(`prepare_contribution: a valid ${kind} is ready, with its preview, its base and a draft_id that is the payload's digest`),
      !r.isError && s.ready === true && s.draft_id === digest(p) && base && textOf(r).includes(`: ${args.title}**`) && textOf(r).includes(`draft_id: ${s.draft_id}`),
      JSON.stringify(s.problems ?? textOf(r).slice(0, 300)));
    drafts[kind] = s;
  }
  const targets = Object.fromEntries(Object.entries(drafts).map(([k, s]) => [k, JSON.stringify(s.payload?.target)]));
  check(t('prepare_contribution finds the target from a title, "ir28", a number or a dimension name'),
    ['review', 'correction', 'evidence', 'label-change'].every((k) => targets[k] === '{"entry":"IR-028"}') && targets['new-entry'] === '{"dimension":3}'
    && drafts['new-entry'].payload?.entry?.dimension === 3, JSON.stringify(targets));
  check(t('prepare_contribution records the labels the entry had'), JSON.stringify(drafts['label-change'].payload?.base?.labels) === JSON.stringify({ intelligence: E28.header.intelligence, enterprise: E28.header.enterprise }));

  const bad = await call('prepare_contribution', { ...VALID.correction, edits: [{ section: 'judgement', find: 'words that are not in the entry', replace: 'other words' }] });
  check(t('prepare_contribution refuses find text that is not in the entry, says what to fix and shows the current text'),
    bad.structuredContent?.ready === false && bad.structuredContent.draft_id === null && /edit 1: the text to replace occurs nowhere in Judgement/.test(bad.structuredContent.problems.join(' '))
    && textOf(bad).includes('Fix these') && textOf(bad).includes('Agent Skills moved to neutral governance'), textOf(bad).slice(0, 300));
  const many = await call('prepare_contribution', { kind: 'correction', target: { entry: 'IR-028' }, title: 'Fix', edits: [{ find: 'not in the entry at all', replace: 'x' }] });
  const mp = many.structuredContent?.problems ?? [];
  check(t('prepare_contribution lists every problem at once'), ['title must be', 'summary must be', 'disclosure is required', 'occurs nowhere'].every((w) => mp.some((x) => x.includes(w))), mp.join(' | '));
  const noEntry = await call('prepare_contribution', { ...VALID.correction, target: { entry: 'quantum teleportation of spreadsheets' } });
  check(t('prepare_contribution reports an entry it cannot find'), noEntry.structuredContent?.ready === false && /No entry of The Intelligence Radar matches/.test(textOf(noEntry)));

  const dim = C.dimensions['3'];
  const sec = C.sectors.insurance;
  for (const [what, target, find] of [['dimension', { dimension: 'Agents and workflow' }, dim.question], ['sector', { sector: 'Insurance' }, sec.headline]]) {
    const r = await call('prepare_contribution', { kind: 'correction', target, title: `Sharpen the ${what} wording`, summary: 'The wording should say who answers for the outcome.',
      edits: [{ find, replace: `${find} Say who answers for it.` }], disclosure: 'None' });
    check(t(`prepare_contribution checks a correction to a ${what} against its text`), r.structuredContent?.ready === true, JSON.stringify(r.structuredContent?.problems));
  }

  const sub = await call('submit_contribution', { draft_id: drafts.correction.draft_id });
  const link = new URL(sub.structuredContent?.url ?? 'https://invalid.example/');
  const q = link.searchParams;
  let prepared = null;
  try { prepared = JSON.parse(q.get('prepared')); } catch { /* checked below */ }
  check(t('submit_contribution without GitHub returns the pre-filled GitHub issue: template, title, text fields and the prepared payload'),
    !sub.isError && sub.structuredContent.route === 'github-link' && `${link.origin}${link.pathname}` === `https://github.com/${C.forms.repo}/issues/new`
    && q.get('template') === 'correction.yml' && q.get('title') === '[Correction] Name the neutral home of Agent Skills' && q.get('entry') === 'IR-028'
    && q.get('current') === FIND && q.get('proposed') === REPL && q.get('disclosure') === 'None'
    && q.get('why') === VALID.correction.summary && prepared && digest(prepared) === drafts.correction.draft_id, link.href.slice(0, 300));
  check(t('submit_contribution says to check the form and press Submit new issue, and how to apply'),
    /Submit new issue/.test(textOf(sub)) && /list of people/.test(textOf(sub)) && /apply_to_contribute/.test(textOf(sub)));
  const long = await call('prepare_contribution', { ...VALID['new-entry'], title: 'Propose agent run books, in full',
    entry: { ...newEntry, judgement: newEntry.judgement.repeat(14).slice(0, 3900), where: 'Production agents. '.repeat(50), test: 'Rehearse the run book. '.repeat(40) } });
  const lsub = await call('submit_contribution', { draft_id: long.structuredContent?.draft_id ?? 'none' });
  const lq = new URL(lsub.structuredContent?.url ?? 'https://invalid.example/').searchParams;
  check(t('submit_contribution gives a shorter link and the JSON to paste when the payload is too long for a link'),
    lsub.structuredContent?.prepared_included === false && !lq.has('prepared') && lq.get('template') === 'new-entry.yml'
    && textOf(lsub).includes('"Prepared by an AI assistant"') && digest(JSON.parse(lsub.structuredContent.prepared)) === long.structuredContent.draft_id);
  const unknown = await call('submit_contribution', { draft_id: `sha256:${'1'.repeat(64)}` });
  check(t('submit_contribution refuses a draft it did not prepare'), unknown.isError === true && /prepare_contribution again/.test(textOf(unknown)));
  const mine = await call('my_contributions');
  check(t('my_contributions without GitHub says the status is on the GitHub issue'), !mine.isError && /status on its GitHub issue/.test(textOf(mine)) && textOf(mine).includes(C.forms.repo));
  const revise = await call('revise_contribution', { id: 'C-0001', draft_id: drafts.correction.draft_id });
  check(t('revise_contribution without GitHub says how to connect'), revise.isError === true && /GitHub account/.test(textOf(revise)));
  const apply = await call('apply_to_contribute', { name: 'Jane Doe', affiliation: 'Example Ltd', experience: 'Ten years of platform engineering.', links: 'https://example.org/jane', disclosure: 'None' });
  const aq = new URL(apply.structuredContent?.url ?? 'https://invalid.example/').searchParams;
  check(t('apply_to_contribute returns the pre-filled apply form'), aq.get('template') === 'apply.yml' && aq.get('name') === 'Jane Doe' && aq.get('affiliation') === 'Example Ltd'
    && aq.get('experience') === 'Ten years of platform engineering.' && aq.get('links') === 'https://example.org/jane' && aq.get('disclosure') === 'None' && /Submit new issue/.test(textOf(apply)));
}

/** The data the contribution tools check against is the review desk's: the same files, byte for byte. */
function communityData() {
  if (!HAS_SOURCE) {
    console.log('NOTE: the check of data/radar.json against the sources was skipped: the sources are in the editorial package.');
    return;
  }
  const files = readdirSync(path.join(PKG, 'source', 'entries')).filter((f) => /^IR-\d{3}\.md$/.test(f));
  check('data: carries the exact text of every entry file, so its entry digests are the Desk\'s',
    files.length === Object.keys(C.entries).length && files.every((f) => entryDigest(C.entries[f.slice(0, -3)]) === entryDigest(entryText(f.slice(0, -3)))), `${files.length} files`);
  const cat = JSON.parse(readFileSync(path.join(PKG, 'source', 'catalogue.json'), 'utf8'));
  const slug = (n) => n.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');
  const secs = JSON.parse(readFileSync(path.join(PKG, 'source', 'sectors.json'), 'utf8')).sectors;
  check('data: carries the raw dimensions, the sectors by slug, the edition, the forms and the community config without its note',
    cat.dimensions.every((d) => JSON.stringify(C.dimensions[String(d.id)]) === JSON.stringify(d)) && secs.every((s) => JSON.stringify(C.sectors[slug(s.name)]) === JSON.stringify(s))
    && C.edition === JSON.parse(readFileSync(path.join(PKG, 'source', 'edition.json'), 'utf8')).id && C.config.note === undefined && C.config.kinds && C.forms.forms.length === 6);
}

// RETIRED with the review desk service (7 November 2026): whoamiDesk, roles and endToEnd below are no longer called.
// githubFlow, at the end, tests the contribution tools against GitHub instead. Remove these at the next clean-up.
const token = () => `rdk_${randomBytes(32).toString('base64url')}`; // made up for each run: no real token lives in this file

/** A stand-in for the review desk that answers whoami only, to see which tools each role gets and what happens when the Desk fails. */
async function whoamiDesk(people) {
  const server = createServer((req, res) => {
    const who = people[(req.headers.authorization ?? '').replace(/^Bearer /, '')];
    if (who === 'silent') return; // never answers
    const [status, body] = req.url !== '/api/whoami' ? [404, { error: { code: 'not_found', message: 'There is no such endpoint.' } }]
      : who ? [200, who] : [401, { error: { code: 'unauthorised', message: 'The token is not recognised.' } }];
    res.writeHead(status, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(body));
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  return { url: `http://127.0.0.1:${server.address().port}`, close: () => new Promise((ok) => { server.closeAllConnections(); server.close(() => ok()); }) };
}

/** Which tools appear for each role, and what the server says when the Desk cannot be used. */
async function roles() {
  const T = { reviewer: token(), editor: token(), contributor: token(), unknown: token(), silent: token() };
  const person = (role, name) => ({ id: `p-${role.slice(0, 6)}`, name, role, github: null, areas: [] });
  const desk = await whoamiDesk({ [T.reviewer]: person('reviewer', 'Rosa Reviewer'), [T.editor]: person('editor', 'Edna Editor'),
    [T.contributor]: person('contributor', 'Cora Contributor'), [T.silent]: 'silent' });
  const open = async (env) => {
    const client = await connect(env);
    try {
      const { tools } = await client.listTools();
      return { tools, names: tools.map((x) => x.name), how: textOf(await client.callTool({ name: 'how_to_contribute', arguments: {} })) };
    } finally {
      await client.close();
    }
  };
  const t = (name) => `Desk settings: ${name}`;
  try {
    const rv = await open({ RADAR_DESK_URL: desk.url, RADAR_DESK_TOKEN: T.reviewer });
    check(t('a reviewer\'s token adds the four reviewer tools, without publish_queue'), same(rv.names, [...READING, ...CONTRIBUTOR, ...REVIEWER]), rv.names.join(', '));
    const ann = Object.fromEntries(rv.tools.map((x) => [x.name, x.annotations ?? {}]));
    check(t('decide_contribution and edit_contribution are destructive writes that reach the Desk'),
      ['decide_contribution', 'edit_contribution'].every((n) => ann[n].readOnlyHint === false && ann[n].destructiveHint === true && ann[n].openWorldHint === true));
    check(t('review_queue and open_contribution are read-only'), ['review_queue', 'open_contribution'].every((n) => ann[n].readOnlyHint === true));
    const decide = rv.tools.find((x) => x.name === 'decide_contribution');
    check(t('decide_contribution tells the assistant that the reviewer decides, in their own words'), /reviewer decides, not the assistant/.test(decide.description) && /own words/.test(decide.description));
    check(t('how_to_contribute names the person the token belongs to, and never the token'), rv.how.includes('as Rosa Reviewer (reviewer)') && !rv.how.includes(T.reviewer));
    const ed = await open({ RADAR_DESK_URL: desk.url, RADAR_DESK_TOKEN: T.editor });
    check(t('an editor\'s token adds publish_queue too, read-only'), same(ed.names, [...READING, ...CONTRIBUTOR, ...REVIEWER, 'publish_queue'])
      && ed.tools.find((x) => x.name === 'publish_queue').annotations?.readOnlyHint === true, ed.names.join(', '));
    const co = await open({ RADAR_DESK_URL: desk.url, RADAR_DESK_TOKEN: T.contributor });
    check(t('a contributor\'s token adds no reviewer tools'), same(co.names, [...READING, ...CONTRIBUTOR]) && co.how.includes('as Cora Contributor (contributor)'));
    const bad = await open({ RADAR_DESK_URL: desk.url, RADAR_DESK_TOKEN: T.unknown });
    check(t('a token the Desk does not know adds no reviewer tools, and how_to_contribute says why without showing it'),
      same(bad.names, [...READING, ...CONTRIBUTOR]) && /did not accept the token/.test(bad.how) && !bad.how.includes(T.unknown), bad.how.slice(-400));
    const down = await open({ RADAR_DESK_URL: 'http://127.0.0.1:1', RADAR_DESK_TOKEN: T.reviewer });
    check(t('a Desk that cannot be reached adds no reviewer tools, and how_to_contribute says so'),
      same(down.names, [...READING, ...CONTRIBUTOR]) && /could not be reached/.test(down.how), down.how.slice(-400));
    const started = Date.now();
    const slow = await open({ RADAR_DESK_URL: desk.url, RADAR_DESK_TOKEN: T.silent });
    check(t('a Desk that does not answer is given up after 3 seconds, and the server still starts'),
      same(slow.names, [...READING, ...CONTRIBUTOR]) && /did not answer within 3 seconds/.test(slow.how) && Date.now() - started < 10_000, `${Date.now() - started} ms`);
    const unset = await open({ RADAR_DESK_URL: '', RADAR_DESK_TOKEN: '${user_config.desk_token}' });
    check(t('an empty bundle setting, passed through as ${user_config.desk_token}, counts as no token'),
      same(unset.names, [...READING, ...CONTRIBUTOR]) && /not connected to the review desk/.test(unset.how) && !/does not look like/.test(unset.how));
    const plain = await open({ RADAR_DESK_URL: 'http://desk.example.org', RADAR_DESK_TOKEN: T.reviewer });
    check(t('a plain http address for a Desk elsewhere is refused before the token is sent'), /must start with https:\/\//.test(plain.how) && !plain.how.includes(T.reviewer));
  } finally {
    await desk.close();
  }
}

/** The whole route against a real review desk, started in this process on a temporary data directory, with GitHub off. */
async function endToEnd() {
  const deskDir = path.join(PKG, 'community', 'desk');
  if (!existsSync(path.join(deskDir, 'node_modules'))) {
    console.log('NOTE: the end-to-end run against the review desk was skipped: community/desk/node_modules is absent (run npm ci in community/desk).');
    return;
  }
  const { createDesk, startServer } = await import(pathToFileURL(path.join(deskDir, 'src', 'desk.mjs')).href);
  const dataDir = mkdtempSync(path.join(os.tmpdir(), 'radar-mcp-desk-'));
  const sourceDir = path.join(PKG, 'source');
  const clients = [];
  const said = [];
  let served;
  const t = (name) => `review desk: ${name}`;
  try {
    // no `github` option: this Desk never calls GitHub
    const setup = createDesk({ dataDir, sourceDir, log: () => {} });
    const editor = setup.init({ name: 'Edna Editor', email: 'edna@example.org' });
    const reviewer = setup.addPerson({ name: 'Ravi Reviewer', role: 'reviewer' });
    const contributor = setup.addPerson({ name: 'Cora Contributor', role: 'contributor' });
    await setup.close();
    served = await startServer({ port: 0, host: '127.0.0.1', dataDir, sourceDir, log: () => {} });
    const as = async (who) => {
      const client = await connect({ RADAR_DESK_URL: served.url, RADAR_DESK_TOKEN: who.token });
      clients.push(client);
      return async (name, args = {}) => {
        const r = await client.callTool({ name, arguments: args });
        said.push(textOf(r), JSON.stringify(r.structuredContent ?? null));
        return r;
      };
    };
    const cora = await as(contributor);
    const ravi = await as(reviewer);
    const edna = await as(editor);
    const toolsOf = async (i) => (await clients[i].listTools()).tools.map((x) => x.name);
    check(t('each person gets the tools of their role'), same(await toolsOf(0), [...READING, ...CONTRIBUTOR]) && same(await toolsOf(1), [...READING, ...CONTRIBUTOR, ...REVIEWER])
      && same(await toolsOf(2), [...READING, ...CONTRIBUTOR, ...REVIEWER, 'publish_queue']));

    // the contributor submits a correction through the MCP server
    const prep = await cora('prepare_contribution', VALID.correction);
    const sub = await cora('submit_contribution', { draft_id: prep.structuredContent?.draft_id });
    const receipt = sub.structuredContent?.receipt ?? {};
    check(t('the contributor submits a correction and gets the receipt, with what happens next and how to check'),
      !sub.isError && /^C-\d{4,}$/.test(receipt.id) && receipt.status === 'submitted' && /It needs one approval/.test(textOf(sub)) && textOf(sub).includes(`my_contributions with ${receipt.id}`), textOf(sub).slice(0, 400));
    const again = await cora('submit_contribution', { draft_id: prep.structuredContent?.draft_id });
    check(t('submitting the same draft again returns the first receipt'), again.structuredContent?.repeated === true && again.structuredContent.receipt.id === receipt.id);

    // the reviewer opens it and approves it
    const queue = await ravi('review_queue');
    check(t('the reviewer finds it in the review queue'), (queue.structuredContent?.items ?? []).some((c) => c.id === receipt.id), textOf(queue).slice(0, 300));
    const opened = await ravi('open_contribution', { id: receipt.id });
    const o = textOf(opened);
    check(t('open_contribution shows the current and proposed text, the evidence, the decisions, the policy, stale and the artefact digest'),
      opened.structuredContent?.artefact_digest === receipt.artefact_digest && o.includes('### Judgement') && o.includes(FIND + AFTER)
      && o.includes(REPL + AFTER) && o.includes('https://example.org/aaif') && o.includes('## Decisions so far')
      && o.includes('0 of the 1 needed') && o.includes('Stale: no') && o.includes(receipt.artefact_digest), o.slice(0, 400));
    const old = await ravi('decide_contribution', { id: receipt.id, decision: 'approve', rationale: 'Matches the announcement.', artefact_digest: `sha256:${'0'.repeat(64)}` });
    check(t('a decision on a version the reviewer did not read is refused'), old.isError === true && /changed since you read it/.test(textOf(old)), textOf(old));
    const terse = await ravi('decide_contribution', { id: receipt.id, decision: 'approve', rationale: 'Fine.', artefact_digest: receipt.artefact_digest });
    check(t('a rationale shorter than 10 characters is refused'), terse.isError === true);
    const ok = await ravi('decide_contribution', { id: receipt.id.toLowerCase(), decision: 'approve', rationale: 'Matches the announcement.', artefact_digest: receipt.artefact_digest });
    check(t('the reviewer approves it, and the decision is recorded'), !ok.isError && ok.structuredContent?.status === 'approved' && /Recorded in CHAP: Ravi Reviewer approved/.test(textOf(ok)), textOf(ok));

    // the contributor sees it approved; the editor sees it in the publish queue
    const mine = await cora('my_contributions');
    const one = await cora('my_contributions', { id: receipt.id });
    check(t('the contributor sees it approved, with the reviewer\'s reason'), (mine.structuredContent?.items ?? []).find((c) => c.id === receipt.id)?.status === 'approved'
      && one.structuredContent?.status === 'approved' && textOf(one).includes('Ravi Reviewer (reviewer) approved it') && textOf(one).includes('Matches the announcement.'));
    const pq = await edna('publish_queue');
    check(t('the editor finds it in the publish queue'), (pq.structuredContent?.items ?? []).some((x) => x.id === receipt.id && x.artefact_digest === receipt.artefact_digest)
      && textOf(pq).includes(receipt.id), textOf(pq).slice(0, 300));

    // changes requested, a revision, then an edit that approves it
    const prep2 = await cora('prepare_contribution', { ...VALID.correction, title: 'Give the foundation its short name' });
    const r2 = (await cora('submit_contribution', { draft_id: prep2.structuredContent?.draft_id })).structuredContent?.receipt ?? {};
    const asked = await ravi('decide_contribution', { id: r2.id, decision: 'request_changes', rationale: 'Add a source from the foundation itself.', artefact_digest: r2.artefact_digest });
    check(t('the reviewer asks for changes'), asked.structuredContent?.status === 'changes_requested', textOf(asked));
    const prep3 = await cora('prepare_contribution', { ...VALID.correction, title: 'Give the foundation its short name',
      evidence: [{ url: 'https://example.org/aaif-charter', title: 'Charter', publisher: 'Agentic AI Foundation' }] });
    const revised = await cora('revise_contribution', { id: r2.id, draft_id: prep3.structuredContent?.draft_id });
    check(t('the contributor sends a revised version'), !revised.isError && revised.structuredContent?.version === 2 && revised.structuredContent.status === 'in_review', textOf(revised));
    const v2 = (await ravi('open_contribution', { id: r2.id })).structuredContent ?? {};
    const refused = await ravi('edit_contribution', { id: r2.id, rationale: 'Shorter wording reads better.', artefact_digest: v2.artefact_digest,
      edits: [{ section: 'judgement', find: 'words that are not in the entry', replace: 'other words' }] });
    check(t('an edit that would break the contribution is refused with the Desk\'s list of problems'), refused.isError === true && /occurs nowhere/.test(textOf(refused)), textOf(refused));
    const edited = await ravi('edit_contribution', { id: r2.id, rationale: 'The short name in brackets is enough.', artefact_digest: v2.artefact_digest, tags: ['wording-refined'],
      edits: [{ section: 'judgement', find: FIND, replace: `${FIND} (the check)` }] });
    check(t('the reviewer edits the proposal, which approves version 3'), !edited.isError && edited.structuredContent?.version === 3 && edited.structuredContent.status === 'approved', textOf(edited));
    const both = await ravi('edit_contribution', { id: r2.id, rationale: 'Both forms at once.', artefact_digest: v2.artefact_digest, labels: { intelligence: 'Use' },
      patch: [{ op: 'replace', path: '/summary', value: 'Another summary that is long enough.' }] });
    check(t('edit_contribution refuses a patch together with edits or labels'), both.isError === true && /Give either a patch/.test(textOf(both)));
    check(t('no tool output carries a Desk token'), [editor, reviewer, contributor].every((p) => said.every((s) => !s.includes(p.token))));
  } finally {
    await Promise.all(clients.map((c) => c.close().catch(() => {})));
    if (served) await served.close();
    rmSync(dataDir, { recursive: true, force: true });
  }
}

/**
 * The contribution and review tools end to end on a stand-in GitHub: an HTTP server over the review desk's FakeGitHub, where
 * every change a person makes is answered by the real review desk before the response, as its workflow does within a minute.
 */
async function githubFlow() {
  // the review desk itself in the editorial package, or its copy in vendor/ in the server's own repository
  const deskDir = [path.join(PKG, 'community', 'github', '.github', 'desk'), path.join(ROOT, 'vendor', 'review-desk')]
    .find((d) => existsSync(path.join(d, 'desk.mjs')));
  if (!deskDir) {
    console.log('NOTE: the end-to-end run on GitHub was skipped: the review desk is not here (community/github/.github/desk or vendor/review-desk).');
    return;
  }
  const imp = (f) => import(pathToFileURL(path.join(deskDir, f)).href);
  const { FakeGitHub } = await imp('test/fake-github.mjs');
  const { Desk } = await imp('desk.mjs');
  const { GitHub } = await imp('api.mjs');
  const deskConfig = JSON.parse(readFileSync(path.join(deskDir, 'lib', 'config.json'), 'utf8'));
  const deskForms = JSON.parse(readFileSync(path.join(deskDir, 'lib', 'forms.json'), 'utf8'));
  const REPO = C.config.github_repo;
  const BOT = deskConfig.desk_bot;
  const gh = new FakeGitHub(REPO, { bot: BOT });
  gh.user(BOT, 41898282);
  const TOKENS = {}; // made up for each run: no real token lives in this file
  const person = (login, id) => {
    gh.user(login, id);
    const tok = `gho_${randomBytes(18).toString('hex')}`;
    TOKENS[tok] = login;
    return tok;
  };
  const T = { editor: person('ed-one', 101), reviewer: person('rev-two', 102), contributor: person('cont-three', 103), stranger: person('stranger', 104) };
  gh.setFile('people.json', JSON.stringify({ note: 'test', people: [
    { login: 'ed-one', id: 101, name: 'Edna Editor', role: 'editor', areas: [], since: '2026-11-07' },
    { login: 'rev-two', id: 102, name: 'Ravi Reviewer', role: 'reviewer', areas: [], since: '2026-11-07' },
    { login: 'cont-three', id: 103, name: 'Cora Contributor', role: 'contributor', areas: [], since: '2026-11-07' },
  ] }, null, 1));
  const desk = new Desk({ gh: new GitHub({ repo: REPO, token: 'desk', base: 'https://api.test', fetchImpl: gh.fetch }), config: deskConfig, forms: deskForms,
    now: () => new Date(gh.clock) });
  let polls = 0;
  const base = `/repos/${REPO}`;
  const one = new RegExp(`^${base}/issues/(\\d+)$`);
  const comments = new RegExp(`^${base}/issues/(\\d+)/comments$`);
  const server = createServer(async (req, res) => {
    const send = (status, body) => {
      res.writeHead(status, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(body));
    };
    try {
      const chunks = [];
      for await (const c of req) chunks.push(c);
      const raw = Buffer.concat(chunks).toString('utf8');
      const url = new URL(req.url, 'http://localhost');
      // signing in: GitHub's device flow, authorised on the second poll, for the reviewer
      if (url.pathname === '/login/device/code') {
        return send(200, { device_code: 'dev-1', user_code: 'WDJB-MJHT', verification_uri: 'https://github.com/login/device', expires_in: 900, interval: 0 });
      }
      if (url.pathname === '/login/oauth/access_token') {
        polls += 1;
        return send(200, polls === 1 ? { error: 'authorization_pending' } : { access_token: T.reviewer, token_type: 'bearer', scope: '' });
      }
      const login = TOKENS[String(req.headers.authorization ?? '').replace(/^Bearer /, '')];
      if (url.pathname === '/user') return login ? send(200, { login, id: gh.users.get(login).id, name: login }) : send(401, { message: 'Bad credentials' });
      if (req.method !== 'GET' && !login) return send(401, { message: 'Requires authentication' });
      const data = raw ? JSON.parse(raw) : undefined;
      let m;
      if (req.method === 'POST' && url.pathname === `${base}/issues`) {
        const issue = gh.openIssue(login, { title: data.title, body: data.body, labels: [] });
        await desk.handle('issues', { action: 'opened', issue, sender: { login } });
        return send(201, gh.issues.get(issue.number));
      }
      if (req.method === 'PATCH' && (m = url.pathname.match(one))) {
        const n = Number(m[1]);
        if (gh.issues.get(n).user.login !== login) return send(403, { message: 'Must have admin rights to Repository.' });
        const issue = gh.editIssue(n, { title: data.title ?? gh.issues.get(n).title, body: data.body ?? gh.issues.get(n).body });
        await desk.handle('issues', { action: 'edited', issue, sender: { login } });
        return send(200, gh.issues.get(n));
      }
      if (req.method === 'POST' && (m = url.pathname.match(comments))) {
        const n = Number(m[1]);
        const comment = gh.addComment(n, login, data.body);
        await desk.handle('issue_comment', { action: 'created', issue: structuredClone(gh.issues.get(n)), comment });
        return send(201, { ...comment, html_url: `https://github.com/${REPO}/issues/${n}#issuecomment-${comment.id}` });
      }
      const r = await gh.fetch(`https://api.test${url.pathname}${url.search}`, { method: req.method });
      return send(r.status, await r.json());
    } catch (err) {
      return send(500, { message: String(err?.stack ?? err) });
    }
  });
  await new Promise((ok) => server.listen(0, '127.0.0.1', ok));
  const where = `http://127.0.0.1:${server.address().port}`;
  const configDir = mkdtempSync(path.join(os.tmpdir(), 'radar-mcp-signin-'));
  const env = { RADAR_GITHUB_API: where, RADAR_GITHUB_WEB: where, RADAR_DESK_WAIT_MS: '2000' };
  const clients = [];
  const said = [];
  const t = (name) => `GitHub: ${name}`;
  const as = async (extra) => {
    const client = await connect({ ...env, ...extra });
    clients.push(client);
    const call = async (name, args = {}) => {
      const r = await client.callTool({ name, arguments: args });
      said.push(textOf(r), JSON.stringify(r.structuredContent ?? null));
      return r;
    };
    call.client = client;
    return call;
  };
  const toolsOf = async (call) => (await call.client.listTools()).tools.map((x) => x.name);
  const deskSaid = (r) => r.structuredContent?.desk ?? '';
  try {
    const cora = await as({ RADAR_GITHUB_TOKEN: T.contributor });
    const ravi = await as({ RADAR_GITHUB_TOKEN: T.reviewer });
    const edna = await as({ RADAR_GITHUB_TOKEN: T.editor });
    check(t('each person gets the tools of their role on the list of people'), same(await toolsOf(cora), [...READING, ...CONTRIBUTOR])
      && same(await toolsOf(ravi), [...READING, ...CONTRIBUTOR, ...REVIEWER]) && same(await toolsOf(edna), [...READING, ...CONTRIBUTOR, ...REVIEWER, 'publish_queue']));
    const how = textOf(await cora('how_to_contribute'));
    check(t('how_to_contribute says who is connected, and their role'), /Connected to GitHub as @cont-three/.test(how) && /as a contributor/.test(how), how.slice(-400));

    // the contributor submits a correction: an issue from their account, which the review desk takes in
    const prep = await cora('prepare_contribution', VALID.correction);
    const draft = prep.structuredContent?.draft_id;
    const sub = await cora('submit_contribution', { draft_id: draft });
    const s = sub.structuredContent ?? {};
    check(t('submit_contribution opens issue #1 from the contributor\'s account, and the review desk takes it in'),
      !sub.isError && s.route === 'github-issue' && s.id === 'C-0001' && s.issue === 1 && s.status === 'in-review'
      && /Received: correction from @cont-three/.test(textOf(sub)) && gh.issues.get(1)?.user.login === 'cont-three', textOf(sub).slice(0, 500));
    const again = await cora('submit_contribution', { draft_id: draft });
    check(t('submitting the same draft again opens nothing new'), again.structuredContent?.repeated === true && again.structuredContent.id === 'C-0001' && gh.issues.size === 1);

    // the reviewer reads it and approves it
    const queue = await ravi('review_queue');
    check(t('the reviewer finds it in the review queue'), (queue.structuredContent?.items ?? []).some((c) => c.id === 'C-0001'), textOf(queue).slice(0, 300));
    const opened = await ravi('open_contribution', { id: '#1' });
    const o = textOf(opened);
    const dg = opened.structuredContent?.digest;
    check(t('open_contribution shows the current and proposed text, the evidence and the digest of the version'),
      /^sha256:[0-9a-f]{64}$/.test(dg ?? '') && dg === draft && o.includes('### Judgement') && o.includes(FIND + AFTER) && o.includes(REPL + AFTER)
      && o.includes('https://example.org/aaif') && o.includes(dg), o.slice(0, 400));
    const stale = await ravi('decide_contribution', { id: 'C-0001', decision: 'approve', rationale: 'Matches the announcement.', digest: `sha256:${'0'.repeat(64)}` });
    check(t('a decision on a version the reviewer did not read is refused'), stale.isError === true && /changed since you read it/.test(textOf(stale)), textOf(stale));
    const ok = await ravi('decide_contribution', { id: 'c-1', decision: 'approve', rationale: 'Matches the announcement.', digest: dg });
    check(t('the reviewer approves it: the decision is a comment from their account, and the desk approves it'),
      !ok.isError && /\*\*Approved\.\*\*/.test(deskSaid(ok)) && gh.commentsOn(1).some((c) => c.user.login === 'rev-two' && c.body.startsWith('/approve sha256:'))
      && gh.labelsOf(1).includes('approved'), textOf(ok));
    const mine = await cora('my_contributions');
    const mine1 = await cora('my_contributions', { id: 'C-0001' });
    check(t('the contributor sees it approved, with the reviewer and the reason'), (mine.structuredContent?.items ?? []).find((c) => c.id === 'C-0001')?.status === 'approved'
      && mine1.structuredContent?.status === 'approved' && textOf(mine1).includes('@rev-two (reviewer) approved version 1') && textOf(mine1).includes('Matches the announcement.'),
    textOf(mine1).slice(0, 600));
    const pq = await edna('publish_queue');
    check(t('the editor finds it in the publish queue'), (pq.structuredContent?.items ?? []).some((x) => x.id === 'C-0001' && x.digest === dg), textOf(pq).slice(0, 300));

    // a label change needs an editor's approval
    const lc = await cora('prepare_contribution', VALID['label-change']);
    const ln = String((await cora('submit_contribution', { draft_id: lc.structuredContent?.draft_id })).structuredContent?.issue);
    const ldg = (await ravi('open_contribution', { id: ln })).structuredContent?.digest;
    const r1 = await ravi('decide_contribution', { id: ln, decision: 'approve', rationale: 'The evidence holds up.', digest: ldg });
    const e1 = await edna('decide_contribution', { id: ln, decision: 'approve', rationale: 'Agreed: the label moves.', digest: ldg });
    check(t("a label change needs an editor's approval: a specialist reviewer's alone leaves it in review"),
      /It needs an editor's approval/.test(deskSaid(r1)) && /\*\*Approved\.\*\*/.test(deskSaid(e1)), `${textOf(r1)} | ${textOf(e1)}`);

    // changes asked for, a revision, then a reviewer's edit that approves it
    const p3 = await cora('prepare_contribution', { ...VALID.correction, title: 'Give the foundation its short name' });
    const s3 = (await cora('submit_contribution', { draft_id: p3.structuredContent?.draft_id })).structuredContent ?? {};
    const d3 = (await ravi('open_contribution', { id: s3.id })).structuredContent?.digest;
    const asked = await ravi('decide_contribution', { id: s3.id, decision: 'request_changes', rationale: 'Add a source from the foundation itself.', digest: d3 });
    check(t('the reviewer asks for changes'), /asked for changes/.test(deskSaid(asked)) && gh.labelsOf(s3.issue).includes('changes-requested'), textOf(asked));
    const p4 = await cora('prepare_contribution', { ...VALID.correction, title: 'Give the foundation its short name',
      evidence: [{ url: 'https://example.org/aaif-charter', title: 'Charter', publisher: 'Agentic AI Foundation' }] });
    const rev = await cora('revise_contribution', { id: s3.id, draft_id: p4.structuredContent?.draft_id });
    check(t('the contributor sends a revised version, which goes back to review'), !rev.isError && /Version 2 received from @cont-three/.test(deskSaid(rev))
      && gh.labelsOf(s3.issue).includes('in-review'), textOf(rev));
    const v2 = (await ravi('open_contribution', { id: s3.id })).structuredContent ?? {};
    const bad = await ravi('edit_contribution', { id: s3.id, rationale: 'Shorter wording reads better.', digest: v2.digest,
      edits: [{ section: 'judgement', find: 'words that are not in the entry', replace: 'other words' }] });
    check(t('an edit that would break the contribution is refused before anything is sent'), bad.isError === true && /occurs nowhere/.test(textOf(bad)), textOf(bad));
    const edited = await ravi('edit_contribution', { id: s3.id, rationale: 'The short name in brackets is enough.', digest: v2.digest,
      edits: [{ section: 'judgement', find: FIND, replace: `${FIND} (the check)` }] });
    check(t('the reviewer edits it: the desk rewrites the issue, and the new version counts as their approval'),
      !edited.isError && /Version 3: edited by @rev-two/.test(deskSaid(edited)) && /\*\*Approved\.\*\*/.test(deskSaid(edited))
      && gh.issues.get(s3.issue).body.includes('(the check)'), textOf(edited));

    // a withdrawal; someone not on the list
    const pe = await cora('prepare_contribution', VALID.evidence);
    const se = (await cora('submit_contribution', { draft_id: pe.structuredContent?.draft_id })).structuredContent ?? {};
    const w = await cora('withdraw_contribution', { id: se.id, reason: 'Sent too early.' });
    check(t('the contributor withdraws a contribution, which closes the issue'), /Withdrawn by @cont-three/.test(deskSaid(w)) && gh.issues.get(se.issue)?.state === 'closed', textOf(w));
    const stranger = await as({ RADAR_GITHUB_TOKEN: T.stranger });
    const sp = await stranger('prepare_contribution', VALID.review);
    const ss = await stranger('submit_contribution', { draft_id: sp.structuredContent?.draft_id });
    check(t('someone not on the list can submit, and is told the issue waits until an application is approved'),
      ss.structuredContent?.status === 'needs-approval' && /not on the list of people yet/.test(textOf(ss)) && /not on it yet/.test(textOf(ss)), textOf(ss).slice(0, 500));

    // signing in with GitHub, from an assistant with no token
    const fresh = await as({ RADAR_GITHUB_CLIENT_ID: 'Iv23test', RADAR_CONFIG_DIR: configDir });
    check(t('without a sign-in, a reviewer has the contributor tools only'), same(await toolsOf(fresh), [...READING, ...CONTRIBUTOR]));
    const in1 = await fresh('sign_in_with_github');
    check(t('sign_in_with_github gives the code to enter at github.com/login/device'), in1.structuredContent?.user_code === 'WDJB-MJHT' && /github\.com\/login\/device/.test(textOf(in1)), textOf(in1));
    const in2 = await fresh('sign_in_with_github');
    const saved = path.join(configDir, 'intelligence-radar', 'github.json');
    check(t('called again once the code is entered, it signs in, keeps the sign-in readable by this user only, and adds the review tools'),
      in2.structuredContent?.login === 'rev-two' && in2.structuredContent.role === 'reviewer' && same(await toolsOf(fresh), [...READING, ...CONTRIBUTOR, ...REVIEWER])
      && existsSync(saved) && ((await fs.stat(saved)).mode & 0o077) === 0, textOf(in2));
    const out = await fresh('sign_in_with_github', { sign_out: true });
    check(t('sign_out removes the sign-in from this computer'), !existsSync(saved) && /Signed out/.test(textOf(out)), textOf(out));
    check(t('no tool output carries a GitHub token'), Object.keys(TOKENS).every((tok) => said.every((x) => !x.includes(tok))));
  } finally {
    await Promise.all(clients.map((c) => c.close().catch(() => {})));
    server.closeAllConnections?.();
    await new Promise((ok) => server.close(() => ok()));
    rmSync(configDir, { recursive: true, force: true });
  }
}

communityData();
await run('2025 handshake', undefined);
await run('2026-07-28', { versionNegotiation: { mode: 'auto' } });
await githubFlow();
rmSync(NO_SIGN_IN, { recursive: true, force: true });

let failed = 0;
for (const [name, ok, detail] of results) {
  if (!ok) failed++;
  console.log(`${ok ? 'PASS' : 'FAIL'} ${name}${!ok && detail ? ` [${detail}]` : ''}`);
}
console.log(`${results.length - failed} of ${results.length} checks pass`);
process.exit(failed ? 1 : 0);
