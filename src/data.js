// The edition's data, bundled into the server at build time: reading the Radar needs no network requests.
// R.community holds what the contribution tools check against: the community config, the issue forms and the raw sources.
import radar from '../data/radar.json' with { type: 'json' };
import fullText from '../data/full-text.md';

export const R = radar;
export const FULL_TEXT = fullText;
export const TECH = R.labels.intelligence.map((l) => l.name);
export const ENT = R.labels.enterprise.map((l) => l.name);
export const ED = R.edition;

export const byId = new Map(R.entries.map((e) => [e.id, e]));
export const dimensionByNumber = new Map(R.dimensions.map((d) => [d.number, d]));
export const sourceByNumber = new Map(R.sources.map((s) => [s.n, s]));
export const labelMeaning = Object.fromEntries(
  [...R.labels.intelligence, ...R.labels.enterprise].map((l) => [l.name, l.short.replace(/\.$/, '')]),
);
export const judgementByNumber = new Map(R.judgements.map((j) => [j.number, j]));

const fold = (s) => String(s).toLowerCase().normalize('NFKD').replace(/[̀-ͯ]/g, '').replace(/[^a-z0-9]+/g, ' ').trim();

/** An entry from its ID (IR-028, ir28), its number (28) or its title, exact or partial. */
export function findEntry(ref) {
  if (ref === undefined || ref === null || ref === '') return undefined;
  const s = String(ref).trim();
  const m = s.match(/^(?:ir[\s-]?)?0*(\d{1,3})$/i);
  if (m) return byId.get(`IR-${m[1].padStart(3, '0')}`);
  const q = fold(s);
  const exact = R.entries.find((e) => fold(e.title) === q);
  if (exact) return exact;
  const starts = R.entries.find((e) => fold(e.title).startsWith(q));
  if (starts) return starts;
  return R.entries.find((e) => fold(e.title).includes(q)) || R.entries.find((e) => q.includes(fold(e.title)));
}

/** A dimension from its number (3), its name or short name, exact or partial. */
export function findDimension(ref) {
  if (ref === undefined || ref === null || ref === '') return undefined;
  const s = String(ref).trim();
  const m = s.match(/^0*(\d{1,2})$/);
  if (m) return dimensionByNumber.get(Number(m[1]));
  const q = fold(s);
  return (
    R.dimensions.find((d) => fold(d.name) === q || fold(d.short) === q) ||
    R.dimensions.find((d) => fold(d.name).startsWith(q) || fold(d.short).startsWith(q)) ||
    R.dimensions.find((d) => fold(d.name).includes(q))
  );
}

/** Match a label name whatever its case: 'plan for' gives 'Plan for'. */
export function findLabel(names, ref) {
  if (!ref) return undefined;
  return names.find((n) => n.toLowerCase() === String(ref).trim().toLowerCase());
}

export function counts(entries = R.entries) {
  const by = (k, names) => Object.fromEntries(names.map((n) => [n, entries.filter((e) => e[k] === n).length]));
  return { entries: entries.length, intelligence: by('intelligence', TECH), enterprise: by('enterprise', ENT) };
}

export const sectors = R.sectors || [];
const foldS = (s) => String(s).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
/** A sector from its slug or name, exact or partial: 'finance', 'financial-services', 'Financial services'. */
export function findSector(ref) {
  if (!ref) return undefined;
  const q = foldS(ref);
  return sectors.find((s) => foldS(s.slug) === q || foldS(s.name) === q)
    || sectors.find((s) => foldS(s.name).startsWith(q) || foldS(s.slug).startsWith(q) || q.startsWith(foldS(s.name).split(' ')[0]))
    || sectors.find((s) => foldS(s.scope).split(' ').some((w) => w.length > 3 && (w.startsWith(q) || q.startsWith(w))));
}
/** What a sector says about one entry: a start, a move (with its labels here) or a hold, or nothing. */
export function sectorNote(s, id) {
  const m = s.moves.find((x) => x.id === id);
  if (m) return { kind: 'move', ...m };
  const a = s.start.find((x) => x.id === id);
  if (a) return { kind: 'start', ...a };
  const h = s.hold.find((x) => x.id === id);
  if (h) return { kind: 'hold', ...h };
  return null;
}
