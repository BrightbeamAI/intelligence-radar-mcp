// The Intelligence Radar as an MCP server: read-only tools, prompts and resources over one edition, an interactive
// radar view for hosts that support MCP Apps, and the contribution and review tools (contribute.js).
import { McpServer, ResourceTemplate, completable } from '@modelcontextprotocol/server';
import { registerAppResource, registerAppTool, RESOURCE_MIME_TYPE } from '@modelcontextprotocol/ext-apps/server';
import * as z from 'zod/v4';
import VIEW_HTML from '../dist/radar-view.html';
import { R, ED, TECH, ENT, FULL_TEXT, byId, findEntry, findDimension, findLabel, sourceByNumber, counts, sectors, findSector, sectorNote } from './data.js';
import { search, checkPlan } from './search.js';
import { contributionInstructions, registerContributionTools } from './contribute.js';
import { githubSettings } from './github.js';
import * as F from './format.js';

export const VIEW_URI = 'ui://intelligence-radar/radar-view.html';
const READ_ONLY = { readOnlyHint: true, destructiveHint: false, idempotentHint: true, openWorldHint: false };

const INSTRUCTIONS = [
  `${ED.title} (${ED.label}, ${ED.volume}: ${ED.edition_title}), is a community-driven radar for technical leaders, managed by ${ED.publisher}.`,
  `It holds ${R.entries.length} entries in ${R.dimensions.length} dimensions. Each entry has an intelligence label, for readiness under the conditions it states`,
  `(${TECH.join(', ')}), and an enterprise label, for what an organisation should do now (${ENT.join(', ')}).`,
  'A label holds under the conditions its entry states, so read the entry before applying it to a situation.',
  `Evidence runs to ${ED.evidence_cutoff}.`,
  'Start with search_radar or check_plan; use get_entry for the judgement, the test to run first, the failure to watch for and the sources.',
  ...(sectors.length ? [`For ${sectors.map((x) => x.name.toLowerCase()).join(' or ')}, get_sector gives the sector lens: what binds there, where to start and the entries placed differently;`
    + ' search_radar, check_plan and show_radar take a sector too.'] : []),
  'When you use the Radar in an answer, name each entry by ID and title (for example IR-028 MCP tool integration), give both labels and link its page.',
  'Cite a figure by its source number and link.',
].join(' ');

const text = (t) => ({ type: 'text', text: t });
const notFound = (what, ref, hint) => ({ content: [text(`No ${what} matches "${ref}". ${hint}`)], isError: true });

// Inputs that accept a number or a name
const dimensionArg = z.union([z.number().int().min(1).max(R.dimensions.length), z.string().min(1)])
  .describe(`Dimension number (1 to ${R.dimensions.length}) or name, for example 3 or "Agents and workflow"`);
const entryArg = z.union([z.number().int().min(1), z.string().min(1)])
  .describe('Entry ID (IR-028), number (28) or title (MCP tool integration)');
const techArg = z.enum(TECH).describe(`Intelligence label: ${TECH.join(', ')}`);
const sectorArg = z.string().min(2).describe(`Sector, for the sector lens: ${sectors.map((x) => x.name).join(', ') || 'none yet'}`);
const entArg = z.enum(ENT).describe(`Enterprise label: ${ENT.join(', ')}`);

const EntrySummary = z.object({
  id: z.string(), number: z.number(), title: z.string(), dimension: z.object({ number: z.number(), name: z.string() }),
  intelligence: z.string(), enterprise: z.string(), summary: z.string(), url: z.string(),
});

/** The server for one connection. `gh` is this install's GitHub connection (github.js connectGitHub): its role decides the reviewer tools. */
export function createServer(gh = githubSettings()) {
  const server = new McpServer(
    { name: 'intelligence-radar', title: ED.title, version: R.version, websiteUrl: ED.site_url },
    { instructions: `${INSTRUCTIONS} ${contributionInstructions(gh)}` },
  );

  // ---------------------------------------------------------------- tools
  server.registerTool('about_radar', {
    title: 'About The Intelligence Radar',
    description: 'What The Intelligence Radar is, this edition, how many entries carry each label, the nine dimensions and how to use this server. Call it first if you have not used the Radar before.',
    annotations: READ_ONLY,
  }, async () => ({ content: [text(F.aboutMarkdown())] }));

  server.registerTool('search_radar', {
    title: 'Search the Radar',
    description: 'Find entries by topic, technology, practice or keyword, optionally filtered by dimension, intelligence label or enterprise label. '
      + 'Returns each entry\'s ID, title, dimension, both labels, a one-sentence judgement and its web page. With filters and no query, lists the matching entries in order.',
    inputSchema: z.object({
      query: z.string().max(2000).optional().describe('What to look for, for example "agent memory", "evaluation of RAG" or "GPU costs"'),
      dimension: dimensionArg.optional(),
      intelligence: techArg.optional(),
      enterprise: entArg.optional(),
      sector: sectorArg.optional().describe('Keep to the entries that matter most in this sector, with its notes'),
      limit: z.number().int().min(1).max(R.entries.length).optional().describe('Most entries to return (default 10)'),
    }),
    outputSchema: z.object({ total: z.number(), results: z.array(EntrySummary.extend({ matched: z.array(z.string()) })) }),
    annotations: READ_ONLY,
  }, async ({ query, dimension, intelligence, enterprise, sector, limit }) => {
    const d = dimension !== undefined ? findDimension(dimension) : undefined;
    if (dimension !== undefined && !d) return notFound('dimension', dimension, 'Call list_dimensions for the nine dimensions.');
    const sec = sector ? findSector(sector) : undefined;
    if (sector && !sec) return notFound('sector', sector, `The sector lens covers ${sectors.map((x) => x.name).join(', ') || 'no sector yet'}.`);
    const { total, results } = search({ query, dimension: d?.number, intelligence, enterprise, only: sec ? new Set(sec.relevant) : null, limit: limit ?? 10 });
    const filters = [sec && `the ${sec.name.toLowerCase()} lens`, d && `dimension ${d.number} ${d.name}`, intelligence && `intelligence ${intelligence}`, enterprise && `enterprise ${enterprise}`].filter(Boolean);
    const head = `${total} ${total === 1 ? 'entry matches' : 'entries match'}${query ? ` "${query}"` : ''}${filters.length ? ` (${filters.join(', ')})` : ''}`
      + (results.length < total ? `; the first ${results.length} follow.` : '.');
    const body = results.map((r) => F.entryLine(r.entry, sec && F.sectorNoteLine(sec, r.entry) ? ` ${F.sectorNoteLine(sec, r.entry)}` : '')).join('\n');
    return {
      content: [text(`${head}\n\n${body || 'Try other words, or call list_dimensions to browse.'}`)],
      structuredContent: { total, results: results.map((r) => ({ ...F.entrySummary(r.entry), matched: r.matched })) },
    };
  });

  server.registerTool('get_entry', {
    title: 'Read an entry',
    description: 'The full entry: the judgement and the conditions under which it holds, where it fits, the test to run first, the failure to watch for, '
      + 'examples, the owner, related enterprise judgements and the numbered sources with links.',
    inputSchema: z.object({ entry: entryArg }),
    annotations: READ_ONLY,
  }, async ({ entry }) => {
    const e = findEntry(entry);
    if (!e) return notFound('entry', entry, 'Use search_radar to find entries by topic.');
    return { content: [text(F.entryMarkdown(e))] };
  });

  server.registerTool('list_dimensions', {
    title: 'List the dimensions',
    description: 'The nine dimensions, grouped on three lenses (capability, context and control), each with its question and its entries by intelligence label.',
    annotations: READ_ONLY,
  }, async () => {
    const o = ['# The dimensions', ''];
    for (const l of R.lenses) {
      o.push(`## ${l.name}: ${l.question}`, '');
      for (const n of l.dimensions) {
        const d = R.dimensions.find((x) => x.number === n);
        const rings = TECH.filter((t) => d.by_ring[t].length).map((t) => `${t} ${d.by_ring[t].length}`).join(', ');
        o.push(`- **${d.number} ${d.name}**: ${d.question} ${d.entries} entries (${rings}). ${d.url}`);
      }
      o.push('');
    }
    return { content: [text(o.join('\n'))] };
  });

  server.registerTool('get_dimension', {
    title: 'Read a dimension',
    description: 'One dimension: what it covers, why its entries sit together, what its placements imply for an organisation, and its entries by intelligence label.',
    inputSchema: z.object({ dimension: dimensionArg }),
    annotations: READ_ONLY,
  }, async ({ dimension }) => {
    const d = findDimension(dimension);
    if (!d) return notFound('dimension', dimension, 'Call list_dimensions for the nine dimensions.');
    return { content: [text(F.dimensionMarkdown(d))] };
  });

  server.registerTool('check_plan', {
    title: 'Check a plan against the Radar',
    description: 'Match a plan, roadmap, architecture, policy, business case or list of initiatives against The Intelligence Radar. Returns the entries the text touches, '
      + 'with both labels, the conditions to check, the test to run first and the failure to watch for. Entries at Wait or Prepare are flagged, '
      + 'because the plan may assume readiness the Radar does not support, and dimensions the text does not touch are listed.',
    inputSchema: z.object({
      text: z.string().min(20).max(60000).describe('The plan, roadmap or document text to check'),
      sector: sectorArg.optional().describe('Read the plan through this sector\'s lens: what binds there and the entries placed differently'),
      limit: z.number().int().min(1).max(25).optional().describe('Most entries to return (default 10)'),
    }),
    outputSchema: z.object({
      matches: z.array(EntrySummary.extend({ matched: z.array(z.string()), named: z.boolean(), flag: z.string().nullable(), clause: z.string().nullable() })),
      untouched_dimensions: z.array(z.object({ number: z.number(), name: z.string(), question: z.string() })),
    }),
    annotations: READ_ONLY,
  }, async ({ text: plan, sector, limit }) => {
    const sec = sector ? findSector(sector) : undefined;
    if (sector && !sec) return notFound('sector', sector, `The sector lens covers ${sectors.map((x) => x.name).join(', ') || 'no sector yet'}.`);
    const { matches: found, touched } = checkPlan(plan, limit ?? 10);
    const flag = (e) => (e.intelligence === 'Wait' ? 'Wait: The Intelligence Radar advises deferring this until a named obstacle clears.'
      : e.intelligence === 'Prepare' ? 'Prepare: the Radar treats this as a prerequisite to build now, not a capability ready to use.'
        : e.enterprise === 'Watch' ? 'Watch: the Radar advises tracking this without commitment yet.' : null);
    const untouched = R.dimensions.filter((d) => !touched.has(d.number));
    const o = [found.length ? `The text touches ${found.length} ${found.length === 1 ? 'entry' : 'entries'} of The Intelligence Radar.` : 'The text matches no entry closely.', ''];
    for (const r of found) {
      const e = r.entry;
      o.push(`### ${F.ref(e)}`, `${F.labels(e)}. Dimension: ${R.dimensions.find((d) => d.number === e.dimension).name}.`);
      o.push(r.named ? '- Named in the text.' : `- From the text: "${r.clause}"`);
      o.push(`- Judgement: ${e.summary}`, `- Test first: ${e.test}`, `- Watch for: ${e.failure}`);
      if (flag(e)) o.push(`- Flag: ${flag(e)}`);
      if (sec && F.sectorNoteLine(sec, e)) o.push(`- ${F.sectorNoteLine(sec, e)}`);
      o.push(`- Entry: ${e.url}`, '');
    }
    if (sec) {
      o.push(`## What binds in ${sec.name.toLowerCase()}`, '', ...sec.rules.map((r) => `- ${r.text} [${r.sources.join(', ')}]`), '');
      const missed = sec.start.filter((x) => !found.some((r) => r.entry.id === x.id));
      if (missed.length) o.push('Where the sector lens would start, and the text does not:', '', ...missed.map((x) => `- ${F.ref(byId.get(x.id))}: ${x.why}`), '');
    }
    if (untouched.length) {
      o.push('## Dimensions the text does not touch', '', 'Check whether the plan needs them:', '',
        ...untouched.map((d) => `- ${d.number} ${d.name}: ${d.question}`), '');
    }
    o.push('Read the full judgement with get_entry before relying on a label: each holds under the conditions its entry states.');
    return {
      content: [text(o.join('\n'))],
      structuredContent: {
        matches: found.map((r) => ({ ...F.entrySummary(r.entry), matched: r.matched, named: r.named, flag: flag(r.entry), clause: r.clause ?? null })),
        untouched_dimensions: untouched.map((d) => ({ number: d.number, name: d.name, question: d.question })),
      },
    };
  });

  server.registerTool('list_judgements', {
    title: 'The enterprise judgements',
    description: 'This edition\'s enterprise judgements: for each, the enterprise label, the condition, the evidence, the action, the trade-off, when to review it and the related entries.',
    annotations: READ_ONLY,
  }, async () => ({ content: [text(['# Enterprise judgements', '', ...R.judgements.map((j) => F.judgementMarkdown(j) + '\n')].join('\n'))] }));

  server.registerTool('get_sources', {
    title: 'Look up sources',
    description: 'The numbered sources the Radar cites as [n], with title, links, kind and how that kind of source is read.',
    inputSchema: z.object({ numbers: z.array(z.number().int().min(1)).min(1).max(60).describe('Source numbers, for example [164, 170]') }),
    annotations: READ_ONLY,
  }, async ({ numbers }) => {
    const o = [];
    const missing = [];
    for (const n of [...new Set(numbers)]) {
      const s = sourceByNumber.get(n);
      if (!s) { missing.push(n); continue; }
      o.push(`- [${s.n}] ${s.title}${s.date ? ` (${s.date})` : ''}`, ...s.urls.map((u) => `  ${u}`),
        `  Kind: ${s.kind}. ${R.kinds[s.kind] || ''}`);
    }
    if (missing.length) o.push('', `No source numbered ${missing.join(', ')}. Numbers are permanent, so some are unused. Full register: ${R.pages.sources}`);
    return { content: [text(o.join('\n'))] };
  });

  server.registerTool('get_sector', {
    title: 'Read the sector lens',
    description: 'How the Radar reads for one sector: what binds there (the rules and their dates), the entries to start with, the entries placed '
      + 'differently there and why, what to hold back, and the entries that matter most. Without a sector, lists the sectors the lens covers.',
    inputSchema: z.object({ sector: sectorArg.optional() }),
    annotations: READ_ONLY,
  }, async ({ sector }) => {
    if (!sector) {
      return { content: [text(sectors.length ? ['# The sector lens', '', ...sectors.map((x) => `- **${x.name}** (${x.scope}): ${x.headline} ${x.card}`)].join('\n')
        : 'The sector lens covers no sector yet.')] };
    }
    const sec = findSector(sector);
    if (!sec) return notFound('sector', sector, `The sector lens covers ${sectors.map((x) => x.name).join(', ') || 'no sector yet'}.`);
    return { content: [text(F.sectorMarkdown(sec))] };
  });

  // The interactive radar: the view carries the edition's radar; the result says what to show
  registerAppTool(server, 'show_radar', {
    title: 'Show the radar',
    description: 'Show the interactive radar in the conversation, optionally filtered by dimension or label, or with entries highlighted '
      + '(for example the entries a search or plan check returned). People can select a point to read the entry and ask about it. '
      + 'Hosts without interactive views receive the same selection as text.',
    inputSchema: z.object({
      dimension: dimensionArg.optional(),
      intelligence: techArg.optional(),
      enterprise: entArg.optional(),
      sector: sectorArg.optional().describe('Light the entries that matter most in this sector and mark the ones placed differently there'),
      highlight: z.array(z.string()).max(R.entries.length).optional().describe('Entry IDs to highlight, for example ["IR-028", "IR-032"]'),
      caption: z.string().max(200).optional().describe('A short line to show above the radar'),
    }),
    _meta: { ui: { resourceUri: VIEW_URI } },
    annotations: READ_ONLY,
  }, async ({ dimension, intelligence, enterprise, sector, highlight, caption }) => {
    const d = dimension !== undefined ? findDimension(dimension) : undefined;
    if (dimension !== undefined && !d) return notFound('dimension', dimension, 'Call list_dimensions for the nine dimensions.');
    const sec = sector ? findSector(sector) : undefined;
    if (sector && !sec) return notFound('sector', sector, `The sector lens covers ${sectors.map((x) => x.name).join(', ') || 'no sector yet'}.`);
    const hi = (highlight || []).map((h) => findEntry(h)).filter(Boolean).map((e) => e.id);
    const shown = R.entries.filter((e) => (!d || e.dimension === d.number) && (!intelligence || e.intelligence === intelligence)
      && (!enterprise || e.enterprise === enterprise) && (!sec || sec.relevant.includes(e.id)));
    const c = counts(shown);
    const what = [sec && `the ${sec.name.toLowerCase()} lens`, d && `dimension ${d.number} ${d.name}`, intelligence && `intelligence ${intelligence}`, enterprise && `enterprise ${enterprise}`].filter(Boolean);
    const o = [`The radar shows ${c.entries} of ${R.entries.length} entries${what.length ? ` (${what.join(', ')})` : ''}.`,
      'By intelligence label: ' + TECH.map((t) => `${t} ${c.intelligence[t]}`).join(', ') + '.'];
    if (sec) o.push('', `${sec.name}: ${sec.headline}`, ...sec.moves.map((m) => `- Placed differently here: ${F.ref(byId.get(m.id))}, ${m.intelligence} and ${m.enterprise}. ${m.why}`));
    if (hi.length) o.push('', 'Highlighted:', ...hi.map((id) => F.entryLine(byId.get(id))));
    o.push('', `Explore it on the web: ${R.pages.radar}`);
    return {
      content: [text(o.join('\n'))],
      structuredContent: { dimension: d?.number ?? null, intelligence: intelligence ?? null, enterprise: enterprise ?? null, sector: sec?.slug ?? null,
        highlight: hi, caption: caption ?? null, shown: shown.map((e) => e.id) },
    };
  });

  // Contributions and review on GitHub: contributor tools always, reviewer tools for a reviewer or editor on the list of people
  registerContributionTools(server, gh);

  registerAppResource(server, 'The Intelligence Radar view', VIEW_URI, {
    description: 'The interactive radar: every entry by dimension and ring, with filters and the entry beside it.',
    _meta: { ui: { prefersBorder: false } },
  }, async () => ({ contents: [{ uri: VIEW_URI, mimeType: RESOURCE_MIME_TYPE, text: VIEW_HTML }] }));

  // ---------------------------------------------------------------- resources
  server.registerResource('about', 'radar://about', { title: 'About The Intelligence Radar', mimeType: 'text/markdown',
    description: 'The edition, the labels, the dimensions and how to use this server' },
  async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: F.aboutMarkdown() }] }));

  server.registerResource('labels', 'radar://labels', { title: 'How to read the labels', mimeType: 'text/markdown',
    description: 'Both label scales, how to read them together, and the evidence labels' },
  async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: F.labelsMarkdown() }] }));

  server.registerResource('full-text', 'radar://full-text', { title: 'The complete text', mimeType: 'text/markdown',
    description: 'Every page, figure description, entry and source of the edition in one Markdown file' },
  async (uri) => ({ contents: [{ uri: uri.href, mimeType: 'text/markdown', text: FULL_TEXT }] }));

  server.registerResource('dimension', new ResourceTemplate('radar://dimensions/{number}', {
    list: async () => ({ resources: R.dimensions.map((d) => ({ uri: `radar://dimensions/${d.number}`, name: `${d.number} ${d.name}`, mimeType: 'text/markdown' })) }),
  }), { title: 'A dimension', description: 'One dimension with what its placements imply and its entries', mimeType: 'text/markdown' },
  async (uri, { number }) => {
    const d = findDimension(number);
    if (!d) throw new Error(`No dimension ${number}`);
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: F.dimensionMarkdown(d) }] };
  });

  server.registerResource('entry', new ResourceTemplate('radar://entries/{id}', {
    list: async () => ({ resources: R.entries.map((e) => ({ uri: `radar://entries/${e.id}`, name: F.ref(e), mimeType: 'text/markdown' })) }),
  }), { title: 'An entry', description: 'One entry in full, with its sources', mimeType: 'text/markdown' },
  async (uri, { id }) => {
    const e = findEntry(id);
    if (!e) throw new Error(`No entry ${id}`);
    return { contents: [{ uri: uri.href, mimeType: 'text/markdown', text: F.entryMarkdown(e) }] };
  });

  // ---------------------------------------------------------------- prompts
  const dimensionChoice = completable(z.string().describe('Dimension number or name'), (v) => {
    const q = String(v || '').toLowerCase();
    return R.dimensions.map((d) => d.name).filter((n) => n.toLowerCase().includes(q));
  });
  const entryChoice = completable(z.string().describe('Entry ID or title'), (v) => {
    const q = String(v || '').toLowerCase();
    return R.entries.map((e) => `${e.id} ${e.title}`).filter((n) => n.toLowerCase().includes(q)).slice(0, 25);
  });
  const user = (t) => ({ role: 'user', content: text(t) });

  server.registerPrompt('brief_dimension', {
    title: 'Brief a dimension',
    description: 'A one-page brief on one dimension of the Radar for your leadership team or board.',
    argsSchema: z.object({
      dimension: dimensionChoice,
      audience: z.string().optional().describe('Who the brief is for, for example "our board" or "engineering leads"'),
    }),
  }, ({ dimension, audience }) => {
    const d = findDimension(dimension) || R.dimensions[0];
    return { messages: [user(`Here is the dimension "${d.name}" from ${ED.title} (${ED.label}).\n\n${F.dimensionMarkdown(d)}\n\n`
      + `Write a one-page brief for ${audience || 'our leadership team'}: what this dimension is about and why it matters now; what the placements imply `
      + 'for us (Revisit, Test, Plan for, Watch); the three entries to act on first, each with its test and the failure to watch for; and the decisions we need to make. '
      + 'Name entries by ID and title, give both labels and link each entry. Use get_entry if you need an entry\'s full judgement or sources.')] };
  });

  server.registerPrompt('plan_trial', {
    title: 'Plan a trial',
    description: 'Turn an entry\'s test into a 30-day trial plan with measures, thresholds and a decision at the end.',
    argsSchema: z.object({
      entry: entryChoice,
      context: z.string().optional().describe('Your setting: the team, the work, the data and any constraints'),
    }),
  }, ({ entry, context }) => {
    const e = findEntry(entry) || R.entries[0];
    return { messages: [user(`Here is an entry from ${ED.title}.\n\n${F.entryMarkdown(e)}\n\n`
      + `Plan a 30-day trial built on its test${context ? ` for this setting: ${context}` : ''}. Give the hypothesis; the work and data in scope; `
      + 'what to measure and the threshold that counts as success; the baseline to compare against; the failure to watch for and how to detect it; '
      + 'the owner and who else is involved; the stop conditions; and the decision to take on day 30 (adopt, extend, or stop). Keep it to one page.')] };
  });

  server.registerPrompt('review_roadmap', {
    title: 'Review a roadmap',
    description: 'Check an AI roadmap, plan or architecture against The Intelligence Radar: what is well placed, what is at risk and what is missing.',
    argsSchema: z.object({ roadmap: z.string().describe('The roadmap or plan text') }),
  }, ({ roadmap }) => ({ messages: [user(`Review this AI roadmap against ${ED.title}. First call check_plan with the text below, then use get_entry `
    + 'for any entry you rely on. Report: (1) what is well placed, with the entries that support it; (2) what is at risk, especially anything the '
    + 'Radar places at Wait or Prepare that the roadmap treats as ready; (3) missing prerequisites and dimensions the roadmap does not cover; and '
    + '(4) the three tests to run first. Name entries by ID and title, give both labels and link each entry.\n\nRoadmap:\n\n' + roadmap)] }));

  server.registerPrompt('board_questions', {
    title: 'Questions for the board',
    description: 'Questions a board or executive committee should ask about an entry or a dimension, with what a good answer looks like.',
    argsSchema: z.object({ topic: z.string().describe('An entry (ID such as IR-028, or title) or a dimension (number 1 to 9, or name)') }),
  }, ({ topic }) => {
    // a bare number from 1 to 9 names a dimension here; an entry is named by its ID or title
    const t = String(topic).trim();
    const bare = /^\d{1,2}$/.test(t) && Number(t) <= R.dimensions.length;
    const e = bare ? undefined : findEntry(t);
    const d = e ? undefined : findDimension(t);
    const body = e ? F.entryMarkdown(e) : d ? F.dimensionMarkdown(d) : '';
    return { messages: [user((body ? `From ${ED.title}:\n\n${body}\n\n` : `Search ${ED.title} for "${topic}" with search_radar first.\n\n`)
      + 'Write the eight questions a board should ask management about this, in plain language. For each, say what a good answer would include '
      + 'and which entry of the Radar it draws on (ID and title, with both labels).')] };
  });

  return server;
}

export const meta = { TECH, ENT, findLabel };
