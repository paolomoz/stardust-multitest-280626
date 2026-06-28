/**
 * cards — Bank of America card grid. Variants (class on block):
 *   feature   : bordered cards, optional badge + h3 + body + link-cta (default look)
 *   editorial : image-top cards, linked h3 + body (Trending scams)
 *   steps     : numbered "how it works" steps (h3 + body, CSS-counter number)
 *   flags     : red-flag list (h3 + body, red square marker)
 *   links     : compact link tiles (h3 acts as link)
 * Authoring: one row per card. Cell order tolerant — optional <picture>/<img>,
 * an optional short badge text BEFORE the heading, heading (h3), body <p>,
 * and link(s). A trailing row that is ONLY a CTA (no heading/image) renders as a
 * centered button below the grid.
 */
function flatten(row) {
  const flat = [];
  [...row.children].forEach((c) => {
    const kids = [...c.children];
    if (kids.length) flat.push(...kids);
    else if (c.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = c.textContent.trim();
      flat.push(p);
    }
  });
  return flat;
}

function buildCard(row) {
  const flat = flatten(row);
  const media = flat.find((n) => n.matches?.('picture, img') || n.querySelector?.('picture, img'));
  const mediaEl = media?.matches('picture, img') ? media : media?.querySelector('picture, img');
  const headingNode = flat.find((n) => n.matches?.('h2,h3,h4') || n.querySelector?.('h2,h3,h4'));
  const headingEl = headingNode?.matches('h2,h3,h4') ? headingNode : headingNode?.querySelector('h2,h3,h4');
  const headingIdx = flat.indexOf(headingNode);
  // link nodes: bare <a>, or a wrapper (strong/em/p) holding an <a>, excluding the heading
  const links = flat.filter((n) => n !== headingNode && (n.tagName === 'A' || !!n.querySelector?.('a')));
  const paras = flat.filter((n) => n.tagName === 'P' && !n.querySelector('a'));
  // badge = a short text paragraph that appears before the heading
  const badge = paras.find((p) => flat.indexOf(p) < headingIdx);
  const body = paras.find((p) => flat.indexOf(p) > headingIdx);

  const card = document.createElement('article');
  card.className = 'card';
  if (mediaEl) { const m = document.createElement('div'); m.className = 'card-media'; m.append(mediaEl); card.append(m); }
  const b = document.createElement('div');
  b.className = 'card-body';
  if (badge) { const span = document.createElement('span'); span.className = 'badge'; span.textContent = badge.textContent.trim(); b.append(span); }
  if (headingEl) {
    const h = document.createElement('h3');
    h.innerHTML = headingEl.innerHTML;
    b.append(h);
  }
  if (body) { body.classList.add('card-text'); b.append(body); }
  if (links.length) {
    const actions = document.createElement('div');
    actions.className = 'card-actions';
    links.forEach((n) => {
      // a bare anchor (not wrapped in strong/em) is a text link-CTA, not a button
      if (n.tagName === 'A') n.classList.add('link-cta');
      actions.append(n);
    });
    b.append(actions);
  }
  card.append(b);
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const cardRows = [];
  const actionRows = [];
  rows.forEach((r) => {
    const hasHeading = r.querySelector('h2, h3, h4');
    const hasMedia = r.querySelector('picture, img');
    const onlyLink = !hasHeading && !hasMedia && r.querySelector('a');
    if (onlyLink) actionRows.push(r); else cardRows.push(r);
  });

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const grid = document.createElement('div');
  grid.className = 'cards-grid';
  cardRows.forEach((r) => grid.append(buildCard(r)));
  wrap.append(grid);

  actionRows.forEach((r) => {
    const p = document.createElement('p');
    p.className = 'cards-action';
    const cell = r.querySelector(':scope > div');
    if (cell) p.append(...cell.childNodes);
    wrap.append(p);
  });

  block.replaceChildren(wrap);
}
