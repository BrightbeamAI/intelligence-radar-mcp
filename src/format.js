// Markdown for the model: every answer names entries by ID and title, gives both labels and links the page.
import { R, ED, TECH, ENT, labelMeaning, dimensionByNumber, sourceByNumber, judgementByNumber, counts, sectors, sectorNote, byId } from './data.js';

const dom = (e) => dimensionByNumber.get(e.dimension);
export const ref = (e) => `${e.id} ${e.title}`;
export const labels = (e) => `Intelligence: ${e.intelligence} · Enterprise: ${e.enterprise}`;

export function entryLine(e, extra = '') {
  return `- **${ref(e)}** (${dom(e).name}). ${labels(e)}. ${e.summary}${extra} [Entry](${e.url})`;
}

export function entrySummary(e) {
  return { id: e.id, number: e.number, title: e.title, dimension: { number: e.dimension, name: dom(e).name },
    intelligence: e.intelligence, enterprise: e.enterprise, summary: e.summary, url: e.url };
}

export function sourceLine(s) {
  const url = s.urls && s.urls[0];
  return `- [${s.n}] ${s.title}${url ? ` ${url}` : ''}${s.kind ? ` (${s.kind})` : ''}`;
}

export function entryMarkdown(e) {
  const d = dom(e);
  const o = [
    `# ${ref(e)}`, '',
    `Dimension: ${d.number} ${d.name}. ${labels(e)}.`,
    `- Intelligence label, ${e.intelligence}: ${labelMeaning[e.intelligence]}.`,
    `- Enterprise label, ${e.enterprise}: ${labelMeaning[e.enterprise]}.`, '',
    '## Judgement', '', ...e.judgement.flatMap((p) => [p, '']),
    `**Where it fits:** ${e.where}`, '',
    `**Test first:** ${e.test}`, '',
    `**Watch for:** ${e.failure}`, '',
    `**Examples:** ${e.examples}`, '',
    `**Owner:** ${e.owner}`, '',
  ];
  if (e.judgements.length) {
    o.push('**Enterprise judgements that draw on it:** ' + e.judgements.map((n) => `${n}. ${judgementByNumber.get(n).title}`).join('; '), '');
  }
  if (e.sectors.length) o.push(`**Matters most in:** ${e.sectors.join('; ')}`, '');
  const sec = sectorNotesForEntry(e);
  if (sec.length) o.push('## Sector lens', '', ...sec.map((x) => `- ${x}`), '');
  if (e.disclosure) o.push('Disclosure: this entry cites work published by Brightbeam, which manages the Radar.', '');
  if (e.contribution) {
    o.push(`**Community contribution:** ${e.contribution.text}${e.contribution.interests ? ` Declared interests: ${e.contribution.interests}` : ''}`, '');
  }
  o.push('## Sources', '', ...e.sources.map((n) => sourceLine(sourceByNumber.get(n))), '', `Entry page: ${e.url}`);
  return o.join('\n');
}

export function dimensionMarkdown(d) {
  const o = [`# ${d.number} ${d.name}`, '', `**${d.question}**`, '', d.description, '', d.intro, '', '## What the placements imply', '',
    ...d.implications.map((s) => `- ${s}`), '', '## Entries by ring', ''];
  for (const t of TECH) {
    const ids = d.by_ring[t];
    if (!ids.length) continue;
    o.push(`### ${t} (${labelMeaning[t].toLowerCase()})`, '');
    for (const id of ids) {
      const e = R.entries.find((x) => x.id === id);
      o.push(`- **${ref(e)}**. Enterprise: ${e.enterprise}. ${e.summary} [Entry](${e.url})`);
    }
    o.push('');
  }
  o.push(`Dimension page: ${d.url}`);
  return o.join('\n');
}

export function labelsMarkdown() {
  const o = ['# How to read the labels', '', R.legend, '', '## Intelligence labels', '',
    'Readiness under the conditions the entry states. On the radar, Use sits at the centre, then Trial, Evaluate and Wait; Prepare is the outer ring.', ''];
  for (const l of R.labels.intelligence) o.push(`- **${l.name}**: ${l.short} ${l.meaning}`);
  o.push('', '## Enterprise labels', '', 'What an organisation should do now.', '');
  for (const l of R.labels.enterprise) o.push(`- **${l.name}**: ${l.short} ${l.meaning}`);
  o.push('', '## Reading the two together', '');
  for (const p of R.pairings) o.push(`- ${p.intelligence} with ${p.enterprise}: ${p.meaning}${p.example ? ` (for example ${p.example})` : ''}.`);
  if (R.labels.evidence?.length) {
    o.push('', '## Evidence labels', '');
    for (const l of R.labels.evidence) o.push(`- **${l.name}**: ${l.meaning}`);
  }
  return o.join('\n');
}

export function aboutMarkdown() {
  const c = counts();
  const o = [
    `# ${ED.title}, ${ED.label}`, '',
    `${ED.volume}: ${ED.edition_title}. Published by ${ED.publisher}, ${ED.released}. Evidence to ${ED.evidence_cutoff}.`, '',
    `${ED.title} is a community-driven radar for technical leaders. It places ${c.entries} capabilities and practices `
      + `in ${R.dimensions.length} dimensions. Each entry carries an intelligence label, for readiness under the stated conditions, and an `
      + 'enterprise label, for the action an organisation should take now. It is built with partners and '
      + 'practitioners and managed by Brightbeam.', '',
    '## Entries by label', '',
    '- Intelligence: ' + TECH.map((t) => `${t} ${c.intelligence[t]}`).join(', '),
    '- Enterprise: ' + ENT.map((t) => `${t} ${c.enterprise[t]}`).join(', '), '',
    '## Dimensions', '',
    ...R.dimensions.map((d) => `- ${d.number} **${d.name}** (${d.entries} entries): ${d.question}`), '',
    '## How to use this server', '',
    '- `search_radar` finds entries by topic, with filters; `get_entry` gives the full judgement, test, failure and sources.',
    '- `get_dimension` explains a dimension and what its placements imply; `list_judgements` gives the enterprise judgements.',
    '- `check_plan` matches a plan or roadmap to the entries it touches; `show_radar` draws the radar where the host supports it.',
    ...(sectors.length ? [`- \`get_sector\` reads The Intelligence Radar for one sector (${sectors.map((x) => x.name).join(', ')}): what binds there, where to start and the entries placed differently.`] : []),
    '- When you use the Radar in an answer, name entries by ID and title, give both labels and link the entry page.',
    '- Anyone can contribute: `how_to_contribute` explains how to propose a review, a correction, evidence, a label change or a new entry; '
      + '`prepare_contribution` checks one against this edition and shows its preview before anything is sent, and `submit_contribution` sends it '
      + 'as a GitHub issue. Specialist reviewers and editors review contributions from here too (`review_queue`, `decide_contribution`).', '',
    `Website: ${ED.site_url}. Text under ${ED.licence}, with credit to ${ED.title}, Brightbeam. Cite as: ${ED.cite}`,
  ];
  return o.join('\n');
}

export function judgementMarkdown(j) {
  return [`### ${j.number}. ${j.title}`, '', `- Enterprise label: ${j.label}`, `- Condition: ${j.condition}`, `- Evidence: ${j.evidence}`,
    `- Action: ${j.action}`, `- Trade-off: ${j.tradeoff}`, `- Review when: ${j.revisit}`,
    `- Related entries: ${j.related.map((id) => { const e = R.entries.find((x) => x.id === id); return e ? ref(e) : id; }).join('; ')}`].join('\n');
}

const cite = (ns) => (ns && ns.length ? ` [${ns.join(', ')}]` : '');

/** One line on what a sector says about an entry, for answers that name the entry. */
export function sectorNoteLine(s, e) {
  const x = sectorNote(s, e.id);
  if (!x) return '';
  if (x.kind === 'move') return `In ${s.name.toLowerCase()} it is placed differently: Intelligence ${x.intelligence}, Enterprise ${x.enterprise} (elsewhere ${e.intelligence} and ${e.enterprise}). ${x.why}${cite(x.sources)}`;
  if (x.kind === 'start') return `In ${s.name.toLowerCase()}, start here: ${x.why}`;
  return `In ${s.name.toLowerCase()}, hold back: ${x.why}${cite(x.sources)}`;
}

export function sectorMarkdown(s) {
  const line = (x) => `- **${ref(byId.get(x.id))}**: ${x.why}${cite(x.sources)} [Entry](${byId.get(x.id).url})`;
  const o = [`# The sector lens: ${s.name}`, '', `${s.scope}. **${s.headline}**`, '', '## What binds', '',
    ...s.rules.map((r) => `- ${r.text}${cite(r.sources)}`), '', '## Start with', '', ...s.start.map(line), '', '## Placed differently here', ''];
  for (const m of s.moves) {
    const e = byId.get(m.id);
    o.push(`- **${ref(e)}**: here Intelligence ${m.intelligence} · Enterprise ${m.enterprise}; elsewhere ${labels(e)}. ${m.why}${cite(m.sources)} [Entry](${e.url})`);
  }
  if (s.hold.length) o.push('', '## Hold back', '', ...s.hold.map(line));
  o.push('', `## The entries that matter most here (${s.relevant.length})`, '', s.relevant.map((id) => ref(byId.get(id))).join('; '), '',
    `The sector lens on the website: ${s.card}`, `On the radar: ${s.url}`);
  const nums = [...new Set([...s.rules.flatMap((r) => r.sources), ...s.moves.flatMap((m) => m.sources), ...s.hold.flatMap((h) => h.sources || [])])].sort((a, b) => a - b);
  o.push('', '## Sources', '', ...nums.map((n) => sourceLine(sourceByNumber.get(n))));
  return o.join('\n');
}

export function sectorNotesForEntry(e) {
  return sectors.map((s) => sectorNoteLine(s, e)).filter(Boolean);
}
