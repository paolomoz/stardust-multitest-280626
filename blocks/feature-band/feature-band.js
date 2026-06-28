/**
 * feature-band — dark full-width promotional band: eyebrow, h2, body, one CTA,
 * and a feature image. Authoring: one cell with an optional eyebrow
 * <p><em>/<strong>, an <h2>, a <p> body, a CTA <p> (<strong><a>), and an <img>.
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
  const mediaNode = nodes.find((n) => n.matches?.('picture, img') || n.querySelector?.('picture, img'));
  const pic = mediaNode?.matches?.('picture, img') ? mediaNode : mediaNode?.querySelector('picture, img');
  const heading = nodes.find((n) => n.matches?.('h2,h3'));
  const paras = nodes.filter((n) => n.tagName === 'P');
  const ctaP = paras.find((p) => p.querySelector('a'));
  const textPs = paras.filter((p) => p !== ctaP);
  // short first paragraph is the eyebrow
  const eyebrow = textPs[0] && textPs[0].textContent.trim().length < 40 ? textPs.shift() : null;

  const band = document.createElement('div');
  band.className = 'feature wrap';
  const copy = document.createElement('div');
  copy.className = 'feature-copy';
  if (eyebrow) { eyebrow.classList.add('eyebrow'); copy.append(eyebrow); }
  if (heading) copy.append(heading);
  textPs.forEach((p) => copy.append(p));
  if (ctaP) copy.append(ctaP);
  const fig = document.createElement('div');
  fig.className = 'feature-img';
  if (pic) fig.append(pic);

  band.append(copy, fig);
  block.replaceChildren(band);
  block.classList.add('dark');
}
