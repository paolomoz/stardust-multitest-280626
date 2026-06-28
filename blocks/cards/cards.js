/**
 * cards — responsive card grid. Variants (class on block):
 *   promo    : image-top rectangular editorial cards (3-up)   [default look]
 *   products : circular product image + name (4-up)
 *   links    : text-only link tiles (cream)
 * Authoring: one row per card. Cell order tolerant:
 *   optional <picture>/<img>, heading (h3), body <p>, optional link.
 * Whole card becomes a link if a single <a> is present.
 */
function cardFromRow(row) {
  const cells = [...row.children];
  const flat = [];
  cells.forEach((c) => { const k = [...c.children]; if (k.length) flat.push(...k); else if (c.textContent.trim()) { const p = document.createElement('p'); p.textContent = c.textContent.trim(); flat.push(p); } });
  const media = flat.find((n) => n.matches('picture, img') || n.querySelector?.('picture, img'));
  const mediaEl = media?.matches('picture, img') ? media : media?.querySelector('picture, img');
  const heading = flat.find((n) => n.matches('h2,h3,h4') || n.querySelector?.('h2,h3,h4'));
  const headingEl = heading?.matches('h2,h3,h4') ? heading : heading?.querySelector('h2,h3,h4');
  const link = flat.find((n) => n.matches('a') || n.querySelector?.('a'));
  const linkEl = link?.matches('a') ? link : link?.querySelector('a');
  const body = flat.find((n) => n.tagName === 'P' && n !== heading && !n.querySelector('a'));

  const href = linkEl?.getAttribute('href');
  const card = document.createElement(href ? 'a' : 'div');
  card.className = 'card';
  if (href) card.href = href;

  if (mediaEl) { const ph = document.createElement('div'); ph.className = 'card-media'; ph.append(mediaEl); card.append(ph); }
  const b = document.createElement('div');
  b.className = 'card-body';
  if (headingEl) { const h = document.createElement('h3'); h.innerHTML = headingEl.innerHTML; b.append(h); }
  if (body) b.append(body);
  if (linkEl && linkEl.textContent.trim() && headingEl && linkEl.textContent.trim() !== headingEl.textContent.trim()) {
    const more = document.createElement('span'); more.className = 'card-more'; more.textContent = linkEl.textContent.trim(); b.append(more);
  }
  card.append(b);
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  rows.forEach((r) => grid.append(cardFromRow(r)));
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  wrap.append(grid);
  block.replaceChildren(wrap);
}
