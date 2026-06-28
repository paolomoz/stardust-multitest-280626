/**
 * cta-band — cream band with a heading and a CTA button.
 * Authoring: heading (h2) cell + CTA cell (strong>a primary).
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) nodes.push(...kids);
    else if (cell.textContent.trim()) { const p = document.createElement('p'); p.textContent = cell.textContent.trim(); nodes.push(p); }
  });
  const heading = nodes.find((n) => n.matches('h2,h3') || n.querySelector?.('h2,h3'));
  const headingEl = heading?.matches('h2,h3') ? heading : heading?.querySelector('h2,h3');
  const ctaP = nodes.find((n) => n.tagName === 'P' && n.querySelector('a')) || nodes.find((n) => n.matches('a'));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const inner = document.createElement('div');
  inner.className = 'cta-band-inner';
  if (headingEl) { const h = document.createElement('h2'); h.innerHTML = headingEl.innerHTML; inner.append(h); }
  if (ctaP) inner.append(ctaP);
  wrap.append(inner);
  block.replaceChildren(wrap);
}
