// Refreshes the `community` block of data/radar.json from the package's sources, as build/radar_mcp.py's community() writes
// it: the community config without its note, the issue forms, the edition, every entry file's exact text, and the raw
// dimension and sector objects. For building the server on its own (mcp/publish.sh) after the contribution settings change,
// without a full Radar build. Run from mcp/:  node scripts/refresh-community.mjs
import { readdirSync, readFileSync, writeFileSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const PKG = path.resolve(ROOT, '..');
const read = (...p) => JSON.parse(readFileSync(path.join(PKG, ...p), 'utf8'));
const slug = (name) => String(name).toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/^-|-$/g, '');

const file = path.join(ROOT, 'data', 'radar.json');
const radar = JSON.parse(readFileSync(file, 'utf8'));
const { note, ...config } = read('source', 'community', 'config.json');
const entries = {};
for (const f of readdirSync(path.join(PKG, 'source', 'entries')).filter((x) => /^IR-\d{3}\.md$/.test(x)).sort()) {
  entries[f.slice(0, -3)] = readFileSync(path.join(PKG, 'source', 'entries', f), 'utf8');
}
radar.community = {
  config,
  forms: read('community', 'forms.json'),
  edition: read('source', 'edition.json').id,
  entries,
  dimensions: Object.fromEntries(read('source', 'catalogue.json').dimensions.map((d) => [String(d.id), d])),
  sectors: Object.fromEntries(read('source', 'sectors.json').sectors.map((s) => [slug(s.name), s])),
};
// the version the server reports is the package's own
radar.version = JSON.parse(readFileSync(path.join(ROOT, 'package.json'), 'utf8')).version;
writeFileSync(file, `${JSON.stringify(radar, null, 1)}\n`);
console.log(`mcp: data/radar.json community block refreshed (${Object.keys(entries).length} entries, edition ${radar.community.edition}, version ${radar.version})`);
