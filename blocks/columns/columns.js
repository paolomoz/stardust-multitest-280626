/**
 * columns — image + text split panel (investing, mobile app).
 * Variants: columns (text left / image right), columns reverse (image left).
 * Authoring (cells, order tolerant): heading (h2), body <p>, CTA <p>
 * (strong>a primary / em>a secondary), and a <picture>/<img>.
 */
function flatten(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = flatten(block);
  const media = nodes.find((n) => n.matches?.('picture, img') || n.querySelector?.('picture, img'));
  const mediaEl = media?.matches('picture, img') ? media : media?.querySelector('picture, img');
  const headingNode = nodes.find((n) => n.matches?.('h2, h3') || n.querySelector?.('h2, h3'));
  const headingEl = headingNode?.matches('h2, h3') ? headingNode : headingNode?.querySelector('h2, h3');
  const ctaP = nodes.find((n) => n.tagName === 'P' && n.querySelector('a'));
  const body = nodes.find((n) => n.tagName === 'P' && n !== ctaP);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const split = document.createElement('div');
  split.className = 'columns-split';

  const copy = document.createElement('div');
  copy.className = 'columns-copy';
  if (headingEl) { const h = document.createElement('h2'); h.innerHTML = headingEl.innerHTML; copy.append(h); }
  if (body) { body.classList.add('columns-text'); copy.append(body); }
  if (ctaP) { ctaP.classList.add('columns-actions'); copy.append(ctaP); }

  const fig = document.createElement('div');
  fig.className = 'columns-media';
  if (mediaEl) fig.append(mediaEl);

  if (block.classList.contains('reverse')) split.append(fig, copy);
  else split.append(copy, fig);
  wrap.append(split);
  block.replaceChildren(wrap);
}
