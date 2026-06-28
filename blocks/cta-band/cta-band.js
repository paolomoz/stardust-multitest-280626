/**
 * cta-band — navy conversion band: heading + lede + a single CTA button.
 * Authoring (cells, order tolerant): heading (h2), body <p>, CTA <p>
 * (strong>a or em>a). Rendered as a centered rounded navy panel.
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) nodes.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      nodes.push(p);
    }
  });
  const headingNode = nodes.find((n) => n.matches?.('h2, h3') || n.querySelector?.('h2, h3'));
  const headingEl = headingNode?.matches('h2, h3') ? headingNode : headingNode?.querySelector('h2, h3');
  const ctaP = nodes.find((n) => n.tagName === 'P' && n.querySelector('a')) || nodes.find((n) => n.matches?.('a'));
  const body = nodes.find((n) => n.tagName === 'P' && n !== ctaP && !n.querySelector('a'));

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const inner = document.createElement('div');
  inner.className = 'cta-band-inner';
  if (headingEl) { const h = document.createElement('h2'); h.innerHTML = headingEl.innerHTML; inner.append(h); }
  if (body) { body.classList.add('cta-band-text'); inner.append(body); }
  if (ctaP) inner.append(ctaP);
  wrap.append(inner);
  block.replaceChildren(wrap);
}
