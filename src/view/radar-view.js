// The radar inside an MCP host: filters, highlights from the tool call, and the entry beside the radar
// (or over it, in a narrow host). Works without a host too, for previews.
import { App, applyDocumentTheme, applyHostFonts, applyHostStyleVariables } from '@modelcontextprotocol/ext-apps';

const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => [...r.querySelectorAll(s)];
const esc = (s) => String(s ?? '').replace(/[&<>"]/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;' }[c]));

const DATA = JSON.parse($('#rv-data').textContent);
const E = DATA.entries;
const byId = new Map(E.map((e) => [e.id, e]));
const D = new Map(DATA.dimensions.map((d) => [d.number, d]));
const TECH = DATA.labels.intelligence.map((l) => l.name);
const ENT = DATA.labels.enterprise.map((l) => l.name);
const MEANING = Object.fromEntries([...DATA.labels.intelligence, ...DATA.labels.enterprise].map((l) => [l.name, l.short]));
const CVAR = { Use: 'use', Trial: 'trial', Evaluate: 'evaluate', Wait: 'wait', Prepare: 'prepare', Revisit: 'revisit', Test: 'test', 'Plan for': 'planfor', Watch: 'watch' };
const c = (label) => `var(--${CVAR[label]})`;

const SECTORS = DATA.sectors || [];
const SEC = new Map(SECTORS.map((x) => [x.slug, x]));
const S = { dimension: null, tech: null, ent: null, sec: null, q: '', hot: new Set(), sel: null, theme: 'light', caption: null };
const root = $('#rv');
const stage = $('#rv-stage');
const side = $('#rv-side');
const wide = window.matchMedia('(min-width: 1000px)');
let app = null;
let connected = false;
let caps = {};            // what the host offers: messages, context updates, links
let full = false;

// ------------------------------------------------------------------ filters
const hay = (e) => (e._h ||= `${e.id} ${e.title} ${e.summary} ${e.examples} ${e.where}`.toLowerCase());
const sector = () => (S.sec ? SEC.get(S.sec) : null);
const matches = (e) => (!S.dimension || e.dimension === S.dimension) && (!S.tech || e.intelligence === S.tech)
  && (!S.ent || e.enterprise === S.ent) && (!S.sec || sector().relevant.includes(e.id))
  && (!S.q || S.q.split(/\s+/).every((w) => hay(e).includes(w)));
// what the sector lens says about one entry: placed differently, a place to start, or a reason to hold back
function note(x, id) {
  if (!x) return null;
  const m = x.moves.find((y) => y.id === id);
  if (m) return { kind: 'move', ...m };
  const a = x.start.find((y) => y.id === id);
  if (a) return { kind: 'start', ...a };
  const h = x.hold.find((y) => y.id === id);
  return h ? { kind: 'hold', ...h } : null;
}
const refs = (ns) => (ns && ns.length ? ` [${ns.join(', ')}]` : '');
const visible = () => E.filter(matches);

function chips() {
  const dom = $('#rv-dimensions');
  dom.innerHTML = `<button type="button" class="rv-chip" data-dimension="0">All dimensions</button>`
    + DATA.dimensions.map((d) => `<button type="button" class="rv-chip" data-dimension="${d.number}" style="--dc:${d.colour}" title="${esc(d.question)}">`
      + `<i></i>${String(d.number).padStart(2, '0')} ${esc(d.short)}</button>`).join('');
  $('#rv-tech').innerHTML = TECH.map((t) => `<button type="button" class="rv-chip t" data-tech="${esc(t)}" style="--c:${c(t)}" title="${esc(MEANING[t])}">${esc(t)}</button>`).join('');
  $('#rv-ent').innerHTML = ENT.map((t) => `<button type="button" class="rv-chip t" data-ent="${esc(t)}" style="--c:${c(t)}" title="${esc(MEANING[t])}">${esc(t)}</button>`).join('');
  const sg = $('#rv-sec');
  sg.hidden = !SECTORS.length;
  sg.innerHTML = SECTORS.length ? '<span class="rv-sec-l">Sector lens</span>' + SECTORS.map((x) => `<button type="button" class="rv-chip s" data-sec="${esc(x.slug)}" `
    + `title="${esc(x.headline)}">${esc(x.name)} <span>${x.relevant.length}</span></button>`).join('') : '';
  sg.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-sec]');
    if (!b) return;
    S.sec = S.sec === b.dataset.sec ? null : b.dataset.sec;
    keepSelection();
    paint();
  });
  dom.addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-dimension]');
    if (!b) return;
    const n = Number(b.dataset.dimension);
    S.dimension = n && S.dimension !== n ? n : null;
    keepSelection();
    paint();
  });
  $('#rv-tech').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-tech]');
    if (!b) return;
    S.tech = S.tech === b.dataset.tech ? null : b.dataset.tech;
    keepSelection();
    paint();
  });
  $('#rv-ent').addEventListener('click', (ev) => {
    const b = ev.target.closest('[data-ent]');
    if (!b) return;
    S.ent = S.ent === b.dataset.ent ? null : b.dataset.ent;
    keepSelection();
    paint();
  });
  $('#rv-q').addEventListener('input', (ev) => {
    S.q = ev.target.value.trim().toLowerCase();
    keepSelection();
    paint();
  });
}

// a selected entry that the filters now hide is let go
function keepSelection() {
  if (S.sel && !matches(byId.get(S.sel))) S.sel = null;
}

// ------------------------------------------------------------------ the radar
function mount() {
  stage.innerHTML = $(`#rv-svg-${S.theme}`).innerHTML + '<div class="rv-card" id="rv-card" hidden></div>';
  stage.querySelector('svg').removeAttribute('aria-labelledby');
  $$('a.pt', stage).forEach((a) => {
    a.addEventListener('click', (ev) => {
      ev.preventDefault();
      select(a.dataset.id);
    });
  });
  $$('g.wedge', stage).forEach((g) => {
    g.addEventListener('click', () => {
      const n = Number(g.dataset.dimension);
      S.dimension = S.dimension === n ? null : n;
      keepSelection();
      paint();
    });
  });
  paint();
}

function paint() {
  const vis = visible();
  const ids = new Set(vis.map((e) => e.id));
  $$('a.pt', stage).forEach((a) => {
    const id = a.dataset.id;
    a.classList.toggle('is-dim', !ids.has(id));
    a.classList.toggle('is-hot', S.hot.has(id));
    a.classList.toggle('is-sel', S.sel === id);
    a.classList.toggle('is-moved', !!S.sec && sector().moves.some((m) => m.id === id));
    a.setAttribute('tabindex', ids.has(id) ? '0' : '-1');
  });
  $$('g.wedge', stage).forEach((g) => g.classList.toggle('is-off', !!S.dimension && Number(g.dataset.dimension) !== S.dimension));
  $$('#rv-dimensions [data-dimension]').forEach((b) => b.setAttribute('aria-pressed', String(Number(b.dataset.dimension) === (S.dimension || 0))));
  $$('#rv-tech [data-tech]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.tech === S.tech)));
  $$('#rv-ent [data-ent]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.ent === S.ent)));
  $$('#rv-sec [data-sec]').forEach((b) => b.setAttribute('aria-pressed', String(b.dataset.sec === S.sec)));
  $('#rv-count').textContent = vis.length === E.length ? `${E.length} entries` : `${vis.length} of ${E.length} entries`;
  const cap = $('#rv-caption');
  cap.hidden = !S.caption;
  cap.textContent = S.caption || '';
  renderSide(vis);
}

// ------------------------------------------------------------------ the entry and the list
const labelChip = (kind, l) => `<span class="rv-label" style="--c:${c(l)}">${kind} <b>${esc(l)}</b> <span>${esc(MEANING[l])}</span></span>`;
const item = (e) => {
  const d = D.get(e.dimension);
  return `<li><button type="button" class="rv-item${S.hot.has(e.id) ? ' is-hot' : ''}" data-select="${e.id}" style="--dc:${d.colour}">`
    + `<span class="n">${e.number}</span><span>${esc(e.title)}</span><span class="l">${esc(e.intelligence)} · ${esc(e.enterprise)}</span></button></li>`;
};

function detail(e, vis) {
  const d = D.get(e.dimension);
  const i = vis.findIndex((x) => x.id === e.id);
  const nav = vis.length > 1 && i >= 0
    ? `<span><button type="button" data-step="-1" aria-label="Previous entry">‹ Previous</button> ${i + 1} of ${vis.length} `
      + `<button type="button" data-step="1" aria-label="Next entry">Next ›</button></span>` : '<span></span>';
  const ask = connected && caps.message
    ? `<button type="button" class="rv-btn rv-primary" data-ask="${e.id}">Ask about this</button><button type="button" class="rv-btn" data-trial="${e.id}">Plan a trial</button>` : '';
  return `<div class="rv-nav"><button type="button" data-close>${wide.matches ? '← All entries' : 'Close'}</button>${nav}</div>`
    + `<div class="rv-id" style="--dc:${d.colour}"><i></i>${e.id} · ${String(d.number).padStart(2, '0')} ${esc(d.name)}</div>`
    + `<h2 tabindex="-1">${esc(e.title)}</h2>`
    + `<div class="rv-labels">${labelChip('Intelligence', e.intelligence)}${labelChip('Enterprise', e.enterprise)}</div>`
    + secNote(e)
    + `<p>${esc(e.summary)}</p>`
    + `<h3>Where it fits</h3><p>${esc(e.where)}</p><h3>Test first</h3><p>${esc(e.test)}</p>`
    + `<h3>Watch for</h3><p>${esc(e.failure)}</p><h3>Owner</h3><p>${esc(e.owner)}</p>`
    + `<div class="rv-actions">${ask}<button type="button" class="rv-btn" data-open="${esc(e.url)}">Open the entry</button></div>`;
}

function secNote(e) {
  const x = sector();
  const n = note(x, e.id);
  if (!n) return '';
  const head = n.kind === 'move' ? `In ${esc(x.name.toLowerCase())} it is placed differently`
    : n.kind === 'start' ? `In ${esc(x.name.toLowerCase())}, start here` : `In ${esc(x.name.toLowerCase())}, hold back`;
  const here = n.kind === 'move' ? `<div class="rv-labels">${labelChip('Intelligence', n.intelligence)}${labelChip('Enterprise', n.enterprise)}</div>` : '';
  return `<div class="rv-secnote is-${n.kind}"><b>${head}</b>${here}<p>${esc(n.why + refs(n.sources))}</p></div>`;
}

// the sector lens, above the list: what binds there, and the entries placed differently
function secBlock() {
  const x = sector();
  if (!x) return '';
  const moved = x.moves.map((m) => {
    const e = byId.get(m.id);
    return `<li><button type="button" class="rv-item" data-select="${e.id}" style="--dc:${D.get(e.dimension).colour}"><span class="n">${e.number}</span>`
      + `<span>${esc(e.title)}</span><span class="l">${esc(m.intelligence)} · ${esc(m.enterprise)}</span></button></li>`;
  }).join('');
  return `<div class="rv-secblock"><p class="rv-sec-name">${esc(x.name)} <span>${esc(x.scope)}</span></p><p class="rv-sec-head">${esc(x.headline)}</p>`
    + `<h3>What binds</h3><ul class="rv-rules">${x.rules.map((r) => `<li>${esc(r.text + refs(r.sources))}</li>`).join('')}</ul>`
    + (moved ? `<h3>Placed differently here</h3><ul class="rv-list">${moved}</ul>` : '')
    + `<button type="button" class="rv-btn" data-open="${esc(x.card || x.url)}">The lens on the website</button></div>`;
}

function renderSide(vis) {
  const e = S.sel && byId.get(S.sel);
  const card = $('#rv-card');
  if (e && !wide.matches) {
    // narrow host: the entry sits over the radar, away from the point it describes
    card.innerHTML = detail(e, vis);
    card.hidden = false;
    const pt = $(`a.pt[data-id="${e.id}"]`, stage);
    const below = pt && pt.getBoundingClientRect().top - stage.getBoundingClientRect().top > stage.clientHeight * 0.5;
    card.classList.toggle('at-top', !!below);
  } else if (card) {
    card.hidden = true;
  }
  if (e && wide.matches) {
    side.innerHTML = detail(e, vis);
    return;
  }
  const hot = [...S.hot].map((id) => byId.get(id)).filter(Boolean);
  const keyT = TECH.map((t) => `<span style="--c:${c(t)}"><i></i>${esc(t)}</span>`).join('');
  side.innerHTML = '<p class="rv-hint">Select a point on the radar, or an entry below, to read it. Select a segment to show one dimension.</p>'
    + secBlock()
    + (hot.length ? `<h3>Highlighted</h3><ul class="rv-list">${hot.map(item).join('')}</ul>` : '')
    + `<h3>${vis.length === E.length ? 'All entries' : `${vis.length} ${vis.length === 1 ? 'entry' : 'entries'} shown`}</h3>`
    + (vis.length ? `<ul class="rv-list">${vis.map(item).join('')}</ul>` : '<p class="rv-hint">No entry matches these filters.</p>')
    + `<h3>Rings, from the centre</h3><div class="rv-key">${keyT}</div>`
    + '<p class="rv-hint">The badge on each point is the enterprise label: R Revisit, T Test, P Plan for, W Watch.'
    + (S.sec ? ' A dashed ring marks an entry placed differently in this sector.' : '') + '</p>';
}

function select(id) {
  const e = byId.get(id);
  if (!e) return;
  S.sel = id;
  paint();
  const h = (wide.matches ? side : $('#rv-card')).querySelector('h2');
  if (h) h.focus({ preventScroll: true });
  if (connected && caps.updateModelContext) {
    const d = D.get(e.dimension);
    app.updateModelContext({ content: [{ type: 'text', text: `In the radar view the user selected ${e.id} ${e.title} `
      + `(${d.name}; Intelligence: ${e.intelligence}; Enterprise: ${e.enterprise}).` }] }).catch(() => {});
  }
}

function step(dir) {
  const vis = visible();
  const i = vis.findIndex((x) => x.id === S.sel);
  if (i < 0 || !vis.length) return;
  select(vis[(i + dir + vis.length) % vis.length].id);
}

async function openLink(url) {
  if (connected && caps.openLinks) {
    try {
      const r = await app.openLink({ url });
      if (!r || !r.isError) return;
    } catch { /* fall through to the browser */ }
  }
  window.open(url, '_blank', 'noopener');
}

async function say(text) {
  if (!connected || !caps.message) return;
  try { await app.sendMessage({ role: 'user', content: [{ type: 'text', text }] }); } catch { /* the host may decline */ }
}

root.addEventListener('click', (ev) => {
  const t = ev.target.closest('button');
  if (!t) return;
  if (t.dataset.select) select(t.dataset.select);
  else if (t.hasAttribute('data-close')) { S.sel = null; paint(); }
  else if (t.dataset.step) step(Number(t.dataset.step));
  else if (t.dataset.open) openLink(t.dataset.open);
  else if (t.dataset.ask) {
    const e = byId.get(t.dataset.ask);
    say(`Tell me more about ${e.id} ${e.title} from The Intelligence Radar: what it means for my organisation, the conditions it depends on and what to test first.`);
  } else if (t.dataset.trial) {
    const e = byId.get(t.dataset.trial);
    say(`Plan a 30-day trial for ${e.id} ${e.title} from The Intelligence Radar, built on its test.`);
  }
});
document.addEventListener('keydown', (ev) => {
  if (ev.key === 'Escape' && S.sel) { S.sel = null; paint(); }
  if (S.sel && (ev.key === 'ArrowRight' || ev.key === 'ArrowLeft') && !ev.target.closest('input')) step(ev.key === 'ArrowRight' ? 1 : -1);
});
wide.addEventListener('change', () => paint());

// ------------------------------------------------------------------ the host
const findDimension = (v) => {
  if (v === undefined || v === null || v === '') return null;
  const n = Number(v);
  if (Number.isInteger(n) && D.has(n)) return n;
  const q = String(v).toLowerCase();
  const d = DATA.dimensions.find((x) => x.name.toLowerCase() === q || x.short.toLowerCase() === q)
    || DATA.dimensions.find((x) => x.name.toLowerCase().includes(q));
  return d ? d.number : null;
};
const fold = (v) => String(v).toLowerCase().replace(/[^a-z0-9]+/g, ' ').trim();
const findSec = (v) => {
  if (!v) return null;
  const q = fold(v);
  const x = SECTORS.find((y) => fold(y.slug) === q || fold(y.name) === q)
    || SECTORS.find((y) => fold(y.name).startsWith(q) || fold(y.slug).startsWith(q) || q.startsWith(fold(y.name).split(' ')[0]))
    || SECTORS.find((y) => fold(y.scope).split(' ').some((w) => w.length > 3 && (w.startsWith(q) || q.startsWith(w))));
  return x ? x.slug : null;
};
const findId = (v) => {
  const m = String(v).match(/^(?:ir[\s-]?)?0*(\d{1,3})$/i);
  if (m) return `IR-${m[1].padStart(3, '0')}`;
  const q = String(v).toLowerCase();
  const e = E.find((x) => x.title.toLowerCase() === q) || E.find((x) => x.title.toLowerCase().includes(q));
  return e ? e.id : null;
};

function apply(args) {
  if (!args) return;
  S.dimension = findDimension(args.dimension);
  S.tech = TECH.includes(args.intelligence) ? args.intelligence : null;
  S.ent = ENT.includes(args.enterprise) ? args.enterprise : null;
  S.sec = findSec(args.sector);
  S.hot = new Set((args.highlight || []).map(findId).filter((id) => id && byId.has(id)));
  S.caption = args.caption || null;
  keepSelection();
  paint();
}

function context(ctx) {
  if (!ctx) return;
  if (ctx.theme && ctx.theme !== S.theme) {
    S.theme = ctx.theme === 'dark' ? 'dark' : 'light';
    applyDocumentTheme(S.theme);
    mount();
  }
  if (ctx.styles?.variables) applyHostStyleVariables(ctx.styles.variables);
  if (ctx.styles?.css?.fonts) applyHostFonts(ctx.styles.css.fonts);
  if (ctx.displayMode) {
    full = ctx.displayMode === 'fullscreen';
    root.classList.toggle('is-full', full);
  }
  const btn = $('#rv-expand');
  const modes = ctx.availableDisplayModes || [];
  btn.hidden = !(modes.includes('fullscreen') && modes.includes('inline'));
  btn.textContent = full ? 'Close full screen' : 'Expand';
}

$('#rv-expand').addEventListener('click', async () => {
  try {
    const r = await app.requestDisplayMode({ mode: full ? 'inline' : 'fullscreen' });
    context({ displayMode: r.mode });
  } catch { /* the host keeps its mode */ }
});

// ------------------------------------------------------------------ start
const ed = DATA.edition;
$('#rv-edition').textContent = `${ed.label} · ${ed.volume}`;
$('#rv-foot').innerHTML = `${esc(ed.volume)}: ${esc(ed.edition_title)}. Evidence to ${esc(ed.evidence_cutoff)}. Managed by Brightbeam. `
  + `<a href="${esc(ed.site_url)}" data-link>${esc(ed.site_url.replace(/^https?:\/\//, '').replace(/\/$/, ''))}</a>`;
$('#rv-foot a').addEventListener('click', (ev) => { ev.preventDefault(); openLink(ed.site_url); });
S.theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
applyDocumentTheme(S.theme);
chips();
mount();

try {
  app = new App({ name: 'The Intelligence Radar', version: DATA.version }, {}, { autoResize: true });
  app.ontoolinput = (p) => apply(p && p.arguments);
  app.ontoolresult = (r) => { if (r && r.structuredContent) apply(r.structuredContent); };
  app.onhostcontextchanged = context;
  app.onteardown = async () => ({});
  app.onerror = () => {};
  app.connect().then(() => {
    connected = true;
    caps = app.getHostCapabilities() || {};
    context(app.getHostContext());
    paint();
  }).catch(() => {});
} catch { /* no host: the radar still works on its own */ }
