/**
 * feature — split panel: copy half (deep green) + image half.
 * Authoring: heading (h2), body <p>, CTA <p>, and a <picture>/<img>.
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) nodes.push(...kids);
    else if (cell.textContent.trim()) { const p = document.createElement('p'); p.textContent = cell.textContent.trim(); nodes.push(p); }
  });
  const media = nodes.find((n) => n.matches('picture, img') || n.querySelector?.('picture, img'));
  const mediaEl = media?.matches('picture, img') ? media : media?.querySelector('picture, img');
  const heading = nodes.find((n) => n.matches('h2,h3') || n.querySelector?.('h2,h3'));
  const headingEl = heading?.matches('h2,h3') ? heading : heading?.querySelector('h2,h3');
  const ctaP = nodes.find((n) => n.tagName === 'P' && n.querySelector('a'));
  const body = nodes.find((n) => n.tagName === 'P' && n !== ctaP);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const copy = document.createElement('div');
  copy.className = 'feature-copy';
  if (headingEl) { const h = document.createElement('h2'); h.innerHTML = headingEl.innerHTML; copy.append(h); }
  if (body) copy.append(body);
  if (ctaP) copy.append(ctaP);
  const ph = document.createElement('div');
  ph.className = 'feature-media';
  if (mediaEl) ph.append(mediaEl);
  wrap.append(copy, ph);
  block.replaceChildren(wrap);
}
