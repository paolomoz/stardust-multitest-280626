/**
 * cards — story / initiative grid (variants: .cards.news, .cards.initiatives).
 *
 * Authoring: one row per card. Cells (classified by content, order-tolerant):
 *   - a <picture>/<img>  → card media (optional)
 *   - a short text cell  → category badge (optional, e.g. "Movies & TV")
 *   - a heading (<h3>)   → card title
 *   - a text cell        → card description
 *   - an <a>             → makes the whole card a link
 * Falls back to segmenting a single flattened cell on <h3> boundaries.
 */

function media(el) {
  if (!el) return null;
  return el.matches?.('picture, img') ? el : el.querySelector?.('picture, img');
}

function buildCard({ pic, badge, title, desc, link }) {
  const card = document.createElement('article');
  card.className = 'card';
  const inner = link ? document.createElement('a') : document.createElement('div');
  if (link) inner.href = link;
  inner.className = 'card-link';
  if (pic) { const t = document.createElement('div'); t.className = 'card-thumb'; t.append(pic.cloneNode(true)); inner.append(t); }
  const body = document.createElement('div'); body.className = 'card-body';
  if (badge) { const b = document.createElement('span'); b.className = 'card-badge'; b.textContent = badge; body.append(b); }
  if (title) { const h = title.cloneNode(true); body.append(h); }
  if (desc) { const p = document.createElement('p'); p.textContent = desc; body.append(p); }
  inner.append(body); card.append(inner);
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const cards = [];

  // one-row-per-card if ≥2 rows have a heading
  const rowsWithHeading = rows.filter((r) => r.querySelector('h2, h3, h4'));
  if (rowsWithHeading.length >= 1 && rows.length > 1) {
    rows.forEach((row) => {
      const cells = [...row.children];
      let pic = null; let title = null; let badge = ''; let desc = ''; let link = '';
      cells.forEach((cell) => {
        const m = media(cell);
        const h = cell.matches?.('h2,h3,h4') ? cell : cell.querySelector?.('h2,h3,h4');
        const a = cell.querySelector?.('a');
        if (m && !pic) { pic = m; return; }
        if (h && !title) { title = h; return; }
        if (a && a.getAttribute('href')) link = a.getAttribute('href');
        const txt = cell.textContent.trim();
        if (txt) { if (!badge && txt.length <= 28) badge = txt; else if (!desc) desc = txt; }
      });
      if (title || pic) cards.push({ pic, badge, title, desc, link });
    });
  }

  // fallback: single flattened cell — segment on h3 boundaries
  if (!cards.length) {
    const cell = block.querySelector(':scope > div > div') || block;
    const kids = [...cell.children];
    let cur = null;
    kids.forEach((k) => {
      const h = k.matches?.('h2,h3,h4') ? k : null;
      if (h) { if (cur) cards.push(cur); cur = { title: h, pic: null, badge: '', desc: '', link: '' }; return; }
      if (!cur) cur = { title: null, pic: null, badge: '', desc: '', link: '' };
      const m = media(k); if (m && !cur.pic) { cur.pic = m; return; }
      const a = k.querySelector?.('a'); if (a) cur.link = a.getAttribute('href');
      const txt = k.textContent.trim(); if (txt) { if (!cur.badge && txt.length <= 28) cur.badge = txt; else if (!cur.desc) cur.desc = txt; }
    });
    if (cur) cards.push(cur);
  }

  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  cards.forEach((c) => grid.append(buildCard(c)));

  const wrap = document.createElement('div');
  wrap.className = 'cards-wrap';
  wrap.append(grid);
  block.replaceChildren(wrap);
}
