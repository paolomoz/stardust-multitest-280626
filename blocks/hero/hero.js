/**
 * hero — full-bleed product hero. Renders an editorial background <img>, the
 * page <h1>, a lede paragraph, and CTAs over a legibility scrim.
 * Authoring: one cell with an <img> (background), an <h1>, a <p> lede, and a
 * CTA <p> (primary <strong><a>, secondary <em><a>).
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
  const media = nodes.find((n) => n.matches?.('picture, img') || n.querySelector?.('picture, img'));
  const headingCell = nodes.find((n) => n.matches?.('h1,h2,h3') || n.querySelector?.('h1,h2,h3'));
  const heading = headingCell?.matches?.('h1,h2,h3') ? headingCell : headingCell?.querySelector('h1,h2,h3');
  const paras = nodes.filter((n) => n.tagName === 'P');
  const ledeP = paras.find((p) => !p.querySelector('a'));
  const ctaP = paras.find((p) => p.querySelector('a'));

  const bg = document.createElement('div');
  bg.className = 'hero-bg';
  const pic = media?.matches?.('picture, img') ? media : media?.querySelector('picture, img');
  if (pic) bg.append(pic);

  const inner = document.createElement('div');
  inner.className = 'hero-inner wrap';
  if (heading) { heading.classList.add('hero-title'); inner.append(heading); }
  if (ledeP) { ledeP.classList.add('hero-lede'); inner.append(ledeP); }
  if (ctaP) inner.append(ctaP);

  block.replaceChildren(bg, inner);
}
