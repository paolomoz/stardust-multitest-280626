/**
 * media-cards — image-led category cards. Section head (h1/h2/p) authored as
 *   default content above. Each card = one row: image | title (h3) | body | CTA.
 *   Cards without an image render text-only gracefully.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const grid = document.createElement('div');
  grid.className = 'mc-grid';

  rows.forEach((r) => {
    const cells = [...r.children];
    if (!cells.length) return;
    const card = document.createElement('article');
    card.className = 'mc-card';
    const media = cells.find((c) => c.querySelector('picture, img'));
    if (media) {
      const m = media.querySelector('picture, img');
      const mc = document.createElement('div');
      mc.className = 'mc-media';
      mc.append(m.closest('picture') || m);
      card.append(mc);
    }
    const body = document.createElement('div');
    body.className = 'mc-body';
    cells.forEach((c) => {
      if (c === media) return;
      [...c.childNodes].forEach((n) => {
        if (n.nodeType === 1) body.append(n);
        else if (n.nodeType === 3 && n.textContent.trim()) { const p = document.createElement('p'); p.textContent = n.textContent.trim(); body.append(p); }
      });
    });
    // normalize title to h3
    const h = body.querySelector('h1,h2,h4');
    if (h && h.tagName !== 'H3') { const n = document.createElement('h3'); n.append(...h.childNodes); h.replaceWith(n); }
    card.append(body);
    grid.append(card);
  });

  wrap.append(grid);
  block.replaceChildren(wrap);
}
