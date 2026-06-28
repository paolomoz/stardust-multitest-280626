/**
 * hero — page lead. Variants: default (full-bleed photo + scrim), compact (deep-green band, no photo).
 * Authoring (flattened single cell tolerated): optional <picture>/<img> bg, eyebrow (short <p>),
 * <h1> headline, lede <p>, CTA <p> (strong>a primary, em>a secondary).
 */
function collectNodes(block) {
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
  const nodes = collectNodes(block);
  const media = nodes.find((n) => n.matches('picture, img') || n.querySelector?.('picture, img'));
  const headingCell = nodes.find((n) => n.matches('h1, h2, h3') || n.querySelector?.('h1, h2, h3'));
  const heading = headingCell?.matches('h1,h2,h3') ? headingCell : headingCell?.querySelector('h1,h2,h3');
  const paras = nodes.filter((n) => n.tagName === 'P');
  const ctaP = paras.find((p) => p.querySelector('a'));
  const textParas = paras.filter((p) => p !== ctaP);
  const eyebrow = textParas[0];
  const lede = textParas[1] || (textParas[0] && heading ? null : textParas[0]);

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  if (eyebrow && eyebrow !== lede) {
    const e = document.createElement('span');
    e.className = 'hero-eyebrow';
    e.textContent = eyebrow.textContent.trim();
    inner.append(e);
  }
  if (heading) { heading.classList.add('hero-title'); inner.append(heading); }
  if (lede) { lede.classList.add('hero-lede'); inner.append(lede); }
  if (ctaP) { ctaP.classList.add('hero-actions'); inner.append(ctaP); }
  wrap.append(inner);

  const mediaEl = media?.matches('picture, img') ? media : media?.querySelector('picture, img');
  if (mediaEl) {
    const bg = document.createElement('div');
    bg.className = 'hero-bg';
    bg.append(mediaEl);
    block.replaceChildren(bg, wrap);
  } else {
    block.classList.add('compact');
    block.replaceChildren(wrap);
  }
}
