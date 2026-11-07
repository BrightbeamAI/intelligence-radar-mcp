// Ranked search over the entries (BM25 across weighted fields) and the plan check built on it.
import { R, byId, dimensionByNumber } from './data.js';

const STOP = new Set(`a about above after again against all also am an and any are as at be because been before being below
between both but by can could did do does doing down during each few for from further had has have having he her here hers him
his how i if in into is it its itself just let me more most my no nor not now of off on once only or other our ours out over own
same she should so some such than that the their them then there these they this those through to too under until up very was
we were what when where which while who whom why will with would you your yours via per across within without use used using
new one two three make makes need needs want wants like get gets go going yet still may might must shall well way ways set sets
meet meets look looks also plus including include includes etc`.split(/\s+/));
// Words every plan uses that say nothing about which entry it means (stemmed below, once the stemmer exists)
const PLAN_WORDS = `plan plans planned planning team teams build building introduce reduce reducing run running internal
roll rollout deliver delivery launch program programme initiative initiatives phase quarter year goal goals objective project projects
work improve increase enable support create develop implement establish ensure organisation organization company business first next
q1 q2 q3 q4 h1 h2 month months week start begin continue expand scale across all our we us move moving give every let allow
website site app apps portal platform platforms solution solutions`.split(/\s+/);

// Short forms readers type, mapped to words the entries use.
const ALIAS = {
  llm: ['model', 'language'], llms: ['model', 'language'], slm: ['small', 'model'], slms: ['small', 'model'],
  genai: ['generative'], gen: ['generative'], rag: ['retrieval'], graphrag: ['graph', 'retrieval'], kg: ['knowledge', 'graph'],
  mcp: ['mcp', 'protocol', 'tool'], a2a: ['agent', 'interoperability'], agentic: ['agent'], copilot: ['assistant', 'drafting', 'analysis'],
  copilots: ['assistant', 'drafting', 'analysis'], gpu: ['gpu', 'accelerator', 'compute'], gpus: ['gpu', 'accelerator', 'compute'],
  tpu: ['accelerator', 'compute'], npu: ['accelerator', 'device'], ocr: ['ocr', 'document', 'parsing'], ml: ['machine', 'learning'],
  ai: [], finetune: ['fine', 'tuning'], finetuning: ['fine', 'tuning'], evals: ['evaluation'], eval: ['evaluation'],
  guardrails: ['guardrail', 'policy'], pii: ['personal', 'data', 'privacy'], gdpr: ['data', 'protection', 'privacy'],
  sovereign: ['sovereignty'], cloud: ['cloud', 'provider'], vendor: ['supplier', 'vendor'], vendors: ['supplier', 'vendor'],
  chatbot: ['assistant', 'customer'], chatbots: ['assistant', 'customer'], voice: ['speech', 'voice'], cv: ['vision'],
  robot: ['robotics', 'physical'], robots: ['robotics', 'physical'], forecast: ['forecasting', 'prediction'],
  forecasting: ['forecasting', 'prediction'], aiact: ['act', 'regulation'], iso: ['standard', 'certification'],
  hallucination: ['fabricated', 'grounded', 'citation', 'provenance', 'accuracy'], hallucinations: ['fabricated', 'grounded', 'citation', 'provenance', 'accuracy'],
  hallucinate: ['fabricated', 'grounded', 'citation'], lockin: ['exit', 'supplier', 'portability'], roi: ['value', 'cost', 'productivity'],
  observability: ['observability', 'trace', 'monitoring'], costs: ['cost', 'spend'], spend: ['cost', 'spend'], budget: ['cost', 'budget'],
  security: ['security', 'attack', 'threat'], privacy: ['privacy', 'personal', 'minimisation'], regulation: ['regulatory', 'regulation', 'act'],
  compliance: ['regulatory', 'conformance', 'evidence'], audit: ['audit', 'record', 'evidence'], productivity: ['productivity', 'accepted', 'work'],
  pay: ['payment', 'purchasing', 'spend'], pays: ['payment', 'purchasing', 'spend'], payment: ['purchasing', 'spend'], payments: ['purchasing', 'spend'],
  invoice: ['payment', 'purchasing'], invoices: ['payment', 'purchasing'], buy: ['purchasing'], buys: ['purchasing'], shop: ['purchasing', 'commerce'],
  analyst: ['analysis', 'drafting'], analysts: ['analysis', 'drafting'], autonomous: ['autonomy', 'approval'], autonomously: ['autonomy', 'approval'],
};
// Product names that the entries use for other things: only their aliases count ('Copilot' the assistant, not 'Copilot+ PCs').
const BRANDS = new Set(['copilot']);
// Phrases readers type, with the words the entries use for them.
const PHRASES = [[/open[\s-]?source/g, ' open weight '], [/lock[\s-]?in/g, ' lockin '], [/ai act/g, ' aiact regulation '],
  [/fine[\s-]?tun/g, ' fine tuning '], [/human[\s-]in[\s-]the[\s-]loop/g, ' human approval takeover '],
  [/on (?:its|their) own|without (?:a )?human|unattended/g, ' autonomy unsupervised ']];

/** Lower case, split, drop stop words, and strip common endings so 'agents' finds 'agent'. */
export function tokens(text) {
  const out = [];
  const words = String(text || '').toLowerCase().replace(/[’']s\b/g, '').replace(/[^a-z0-9]+/g, ' ').split(' ');
  for (const w of words) {
    if (!w || w.length < 2 || STOP.has(w) || /^\d+$/.test(w)) continue;
    out.push(stem(w));
  }
  return out;
}

// Suffixes, longest first: 'evaluating', 'evaluation' and 'evaluate' all become 'evalu'.
const SUFFIXES = ['izations', 'isations', 'ization', 'isation', 'ational', 'fulness', 'iveness', 'ations', 'ation', 'ating', 'ities',
  'ments', 'ment', 'ness', 'ance', 'ence', 'able', 'ible', 'ings', 'ated', 'ates', 'ions', 'ous', 'ion', 'ity', 'ive', 'ing', 'ate', 'ers', 'ies',
  'ed', 'er', 'es', 'al', 'ic', 'ly', 's'];

export function stem(w) {
  if (w.length === 4 && w.endsWith('s') && !/(ss|us|is)$/.test(w)) return w.slice(0, -1);   // 'pays' to 'pay'
  if (w.length <= 4) return w;
  let out = w;
  for (const suf of SUFFIXES) {
    if (out.endsWith(suf) && out.length - suf.length >= 4) {
      out = suf === 'ies' ? out.slice(0, -3) + 'y' : out.slice(0, -suf.length);
      break;
    }
  }
  if (out.length > 4 && out.endsWith('e')) out = out.slice(0, -1);
  if (out.length > 5 && out.endsWith('y')) out = out.slice(0, -1);   // 'autonomy' and 'autonomous' meet at 'autonom'
  if (out.length > 4 && /([bdfgkmnprtz])\1$/.test(out)) out = out.slice(0, -1);   // 'modell' to 'model', 'runn' to 'run'
  return out;
}

const PLAN_STOP = new Set(PLAN_WORDS.map((w) => stem(w)));

/** The reader's words, stemmed, each with a weight: their own words count fully, the words an alias adds count less. */
function expand(text) {
  let t = String(text || '').toLowerCase();
  for (const [re, add] of PHRASES) t = t.replace(re, (m) => `${m}${add}`);
  const raw = t.replace(/[^a-z0-9]+/g, ' ').split(' ').filter(Boolean);
  const own = tokens(t).filter((x) => !BRANDS.has(x)).map((x) => [x, 1]);
  const extra = raw.flatMap((w) => ALIAS[w] || []).map((x) => [stem(x), 0.4]);
  return [...own, ...extra];
}

// Fields and their weights: the title counts most, then examples and where an entry fits.
const FIELDS = [
  ['title', 3.0], ['examples', 2.0], ['where', 1.5], ['summary', 1.5], ['judgement', 1.0],
  ['test', 1.0], ['failure', 1.0], ['dimension', 1.4], ['owner', 0.3],
];

const DOCS = R.entries.map((e) => {
  const d = dimensionByNumber.get(e.dimension);
  const text = {
    title: e.title, examples: e.examples, where: e.where, summary: e.summary, judgement: e.judgement.join(' '),
    test: e.test, failure: e.failure, dimension: `${d.name} ${d.covers}`, owner: e.owner,
  };
  const tf = new Map();
  let len = 0;
  for (const [f, w] of FIELDS) {
    for (const t of tokens(text[f])) {
      tf.set(t, (tf.get(t) || 0) + w);
      len += w;
    }
  }
  return { id: e.id, tf, len, title: tokens(e.title).join(' '), titleSet: new Set(tokens(e.title)) };
});
const N = DOCS.length;
const AVG = DOCS.reduce((s, d) => s + d.len, 0) / N;
const DF = new Map();
for (const d of DOCS) for (const t of d.tf.keys()) DF.set(t, (DF.get(t) || 0) + 1);
const idf = (t) => Math.log(1 + (N - (DF.get(t) || 0) + 0.5) / ((DF.get(t) || 0) + 0.5));
export const VOCAB = DF;

function bm25(doc, weights, k1 = 1.2, b = 0.75) {
  let score = 0;
  const hits = [];
  for (const [t, qw] of weights) {
    const f = doc.tf.get(t);
    if (!f) continue;
    const s = qw * idf(t) * ((f * (k1 + 1)) / (f + k1 * (1 - b + (b * doc.len) / AVG)) + (doc.titleSet.has(t) ? 1.5 : 0));
    score += s;
    hits.push([t, s]);
  }
  return { score, hits };
}

function weigh(terms) {
  const w = new Map();
  for (const [t, x] of terms) if (DF.has(t)) w.set(t, (w.get(t) || 0) + x);
  for (const [t, c] of w) w.set(t, c >= 1 ? 1 + Math.log(c) : c);
  return w;
}

/** Entries ranked for a query, after any filters. Without a query, the filtered entries in number order. */
export function search({ query, dimension, intelligence, enterprise, only = null, limit = 10 } = {}) {
  let pool = R.entries.filter((e) => (!dimension || e.dimension === dimension) && (!intelligence || e.intelligence === intelligence)
    && (!enterprise || e.enterprise === enterprise) && (!only || only.has(e.id)));
  const q = String(query || '').trim();
  if (!q) return { total: pool.length, results: pool.slice(0, limit).map((e) => ({ entry: e, score: null, matched: [] })) };
  const ids = [...q.matchAll(/\bir[\s-]?0*(\d{1,3})\b/gi)].map((m) => `IR-${m[1].padStart(3, '0')}`);
  const weights = weigh(expand(q));
  const qtitle = tokens(q).join(' ');
  const scored = pool.map((e) => {
    const doc = DOCS[e.number - 1].id === e.id ? DOCS[e.number - 1] : DOCS.find((d) => d.id === e.id);
    let { score, hits } = bm25(doc, weights);
    if (qtitle && doc.title.includes(qtitle)) score += 6;
    if (ids.includes(e.id)) score += 100;
    return { entry: e, score, matched: hits.sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t) };
  }).filter((r) => r.score > 0).sort((a, b) => b.score - a.score || a.entry.number - b.entry.number);
  return { total: scored.length, results: scored.slice(0, limit).map((r) => ({ ...r, score: Math.round(r.score * 100) / 100 })) };
}

/** The entries a plan, roadmap or policy touches: entries named by ID first, then, for each clause of the text,
 *  the one or two entries it matches best, in the order the text raises them. */
export function checkPlan(text, limit = 10) {
  const named = [...String(text).matchAll(/\bir[\s-]?0*(\d{1,3})\b/gi)]
    .map((m) => byId.get(`IR-${m[1].padStart(3, '0')}`)).filter(Boolean);
  const picked = new Map(named.map((e) => [e.id, { entry: e, score: null, matched: ['named in the text'], named: true, clause: null }]));
  const clauses = String(text).split(/\r?\n+|(?<=[.;!?])\s+|,\s+(?:and|while|plus)\s+|\s+(?:and then|then)\s+|\s*[•▪◦]\s*|(?:^|\s)[-*]\s+/)
    .map((x) => x.trim()).filter((x) => x.length > 8);
  const MIN = 5;   // weaker matches than this are coincidences of wording
  const touched = new Set(named.map((e) => e.dimension));
  let order = 0;
  for (const clause of clauses) {
    const weights = weigh(expand(clause));
    for (const [t] of weights) if (PLAN_STOP.has(t)) weights.delete(t);
    if (weights.size < 2) continue;
    // one entry per idea: after each pick, the words it covered count for little, so the next pick covers the rest
    const w = new Map(weights);
    let first = 0;
    for (let k = 0; k < 3; k++) {
      const scored = DOCS.map((doc) => ({ doc, ...bm25(doc, w) })).filter((r) => r.score >= MIN).sort((a, b) => b.score - a.score);
      if (!scored.length) break;
      if (k === 0) {
        first = scored[0].score;
        // a clause touches the dimensions of its close matches, even those not listed
        for (const r of scored) if (r.score >= first * 0.6) touched.add(byId.get(r.doc.id).dimension);
      }
      // a further pick needs a real share of the clause: two of its words, or one rare word
      const r = k === 0 ? scored[0]
        : scored.find((x) => x.score >= first * 0.45 && (x.hits.length >= 2 || (DF.get(x.hits[0][0]) || 0) <= 3));
      if (!r) break;
      const prev = picked.get(r.doc.id);
      if (!(prev && (prev.named || prev.score >= r.score))) {
        picked.set(r.doc.id, { entry: byId.get(r.doc.id), score: Math.round(r.score * 100) / 100, named: false, order: prev ? prev.order : order++,
          matched: r.hits.sort((a, b) => b[1] - a[1]).slice(0, 5).map(([t]) => t), clause: clause.length > 160 ? clause.slice(0, 157) + '...' : clause });
      }
      for (const [t] of r.hits) w.set(t, w.get(t) * 0.15);
    }
  }
  const all = [...picked.values()];
  const byName = all.filter((x) => x.named);
  const topical = all.filter((x) => !x.named).sort((a, b) => b.score - a.score).slice(0, Math.max(0, limit - byName.length))
    .sort((a, b) => a.order - b.order);
  return { matches: [...byName, ...topical], touched };
}
