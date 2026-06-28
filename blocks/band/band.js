/**
 * band — navy emphasis band. Variants: `safety` (split copy+image),
 *   `quote` (large blockquote), `cta` (centered conversion).
 * Authoring: heading + p + CTA links (+ optional image for safety variant).
 */
export default async function decorate(block) {
  const quote = block.classList.contains('quote');
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
  const flat = nodes.length ? nodes : [...block.children];

  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (quote) {
    const q = document.createElement('blockquote');
    const src = flat.find((n) => n.matches('p, blockquote, h2, h3')) || flat[0];
    q.append(...(src ? src.childNodes : []));
    wrap.append(q);
    block.replaceChildren(wrap);
    return;
  }

  const media = flat.find((n) => n.matches('picture, img') || n.querySelector?.('picture, img'));
  const copy = document.createElement('div');
  copy.className = 'band-copy';
  flat.forEach((n) => { if (n !== media) copy.append(n); });

  if (media && block.classList.contains('safety')) {
    const grid = document.createElement('div');
    grid.className = 'band-split';
    const mc = document.createElement('div');
    mc.className = 'band-media';
    const m = media.matches('picture, img') ? media : media.querySelector('picture, img');
    mc.append(m.closest('picture') || m);
    grid.append(copy, mc);
    wrap.append(grid);
  } else {
    wrap.append(copy);
  }
  block.replaceChildren(wrap);
}
