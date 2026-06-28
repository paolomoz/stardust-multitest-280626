/**
 * banner — full-bleed page hero (KV image behind title + optional lede).
 * Used by section-landing and article pages.
 *
 * Authoring (flat siblings in one cell, or separate rows):
 *   - a <picture>/<img>  (background KV)
 *   - a heading (<h1>)
 *   - an optional lede <p>
 * The image is decorative background; the heading is the page <h1>.
 */
export default async function decorate(block) {
  const media = block.querySelector('picture, img');
  const heading = block.querySelector('h1, h2, h3');
  const lede = [...block.querySelectorAll('p')].find((p) => !p.querySelector('a') && (!media || !p.contains(media)));

  block.replaceChildren();

  if (media) {
    const m = media.cloneNode(true);
    m.classList.add('banner-bg');
    block.append(m);
  } else {
    block.classList.add('banner-noimg');
  }
  const cap = document.createElement('div');
  cap.className = 'banner-cap';
  const inner = document.createElement('div');
  inner.className = 'banner-inner';
  if (heading) inner.append(heading.cloneNode(true));
  if (lede) { const p = document.createElement('p'); p.className = 'banner-lede'; p.textContent = lede.textContent.trim(); inner.append(p); }
  cap.append(inner);
  block.append(cap);
}
