/**
 * hero — page lead. Variants: default (full-bleed photo + scrim, white text),
 *        `interior` (navy gradient band, no photo).
 *
 * Authoring (one block, cells flatten in DA — read by query, not index):
 *   - optional <img>/<picture>  → background layer (default variant)
 *   - <h1> (or first heading)   → headline (page's single <h1>)
 *   - <p> without links          → lede
 *   - <p> with links (strong=primary, em=secondary) → CTAs
 *   - optional small <p> before heading → eyebrow
 */
function collect(block) {
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
  const interior = block.classList.contains('interior');
  const nodes = collect(block);
  const media = nodes.find((n) => n.matches('picture, img') || n.querySelector('picture, img'));
  const heading = nodes.find((n) => n.matches('h1, h2, h3') || n.querySelector('h1, h2, h3'));
  const headingEl = heading && (heading.matches('h1,h2,h3') ? heading : heading.querySelector('h1,h2,h3'));
  const paras = nodes.filter((n) => n.matches('p') && n !== media);
  const ctaP = paras.find((p) => p.querySelector('a'));
  const textParas = paras.filter((p) => !p.querySelector('a'));
  // eyebrow = short text before heading; lede = remaining
  let eyebrow = null; let lede = null;
  if (headingEl) {
    const hi = nodes.indexOf(heading);
    eyebrow = textParas.find((p) => nodes.indexOf(p) < hi) || null;
    lede = textParas.find((p) => nodes.indexOf(p) > hi) || null;
  } else {
    [lede] = textParas;
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const inner = document.createElement('div');
  inner.className = 'hero-inner';

  if (eyebrow) { eyebrow.className = 'hero-eyebrow'; inner.append(eyebrow); }
  if (headingEl) {
    // ensure single h1 face; promote to h1 if it isn't
    if (headingEl.tagName !== 'H1') {
      const h1 = document.createElement('h1');
      h1.append(...headingEl.childNodes);
      inner.append(h1);
    } else inner.append(headingEl);
  }
  if (lede) { lede.className = 'hero-lede'; inner.append(lede); }
  if (ctaP) {
    const actions = document.createElement('p');
    actions.className = 'btn-group hero-cta';
    [...ctaP.childNodes].forEach((n) => actions.append(n.cloneNode(true)));
    inner.append(actions);
  }
  wrap.append(inner);

  block.replaceChildren();
  if (!interior && media) {
    const bg = document.createElement('div');
    bg.className = 'hero-bg';
    const m = media.matches('picture, img') ? media : media.querySelector('picture, img');
    const img = m.tagName === 'IMG' ? m : m.querySelector('img');
    if (img) { img.setAttribute('loading', 'eager'); img.setAttribute('fetchpriority', 'high'); }
    bg.append(m);
    block.append(bg);
    const scrim = document.createElement('div');
    scrim.className = 'hero-scrim';
    block.append(scrim);
  }
  block.append(wrap);
}
