/**
 * hero-carousel — Sony home rotating story hero.
 *
 * Authoring: one row per slide. Each slide cell holds (flat siblings, any order):
 *   - a <picture>/<img>  (slide background)
 *   - an eyebrow line (first short text / first <p>) — the category
 *   - a heading (<h1> for the first slide, <h2> for the rest)
 *   - a body <p>
 *   - a CTA: <strong><a> (rendered as a text "more" link)
 * Auto-rotates (6s); pauses on hover and prefers-reduced-motion. Dots + arrows.
 */

function pickMedia(cell) {
  return cell.querySelector('picture, img');
}

export default async function decorate(block) {
  const rows = [...block.children];
  const slides = [];

  rows.forEach((row) => {
    const cell = row.querySelector(':scope > div') || row;
    const media = pickMedia(cell);
    const heading = cell.querySelector('h1, h2, h3');
    const paras = [...cell.querySelectorAll('p')];
    const link = cell.querySelector('a');
    // eyebrow = first link-free, heading-free short <p>; body = the other
    const textPs = paras.filter((p) => !p.querySelector('a'));
    let eyebrow = '';
    let body = '';
    if (textPs.length >= 2) { eyebrow = textPs[0].textContent.trim(); body = textPs[1].textContent.trim(); } else if (textPs.length === 1) { body = textPs[0].textContent.trim(); }
    if (!heading && !media) return;
    slides.push({ media, heading, eyebrow, body, link });
  });

  block.replaceChildren();
  const track = document.createElement('div');
  track.className = 'hc-track';

  slides.forEach((s, i) => {
    const slide = document.createElement('div');
    slide.className = `hc-slide${i === 0 ? ' is-active' : ''}`;
    if (s.media) { const m = s.media.cloneNode(true); m.classList.add('hc-img'); slide.append(m); }
    const scrim = document.createElement('div'); scrim.className = 'hc-scrim'; slide.append(scrim);
    const cap = document.createElement('div'); cap.className = 'hc-cap';
    const inner = document.createElement('div'); inner.className = 'hc-cap-inner';
    if (s.eyebrow) { const e = document.createElement('div'); e.className = 'hc-eyebrow'; e.textContent = s.eyebrow; inner.append(e); }
    if (s.heading) { const h = s.heading.cloneNode(true); inner.append(h); }
    if (s.body) { const p = document.createElement('p'); p.textContent = s.body; inner.append(p); }
    if (s.link) { const a = s.link.cloneNode(true); a.className = 'hc-more'; inner.append(a); }
    cap.append(inner); slide.append(cap);
    track.append(slide);
  });

  block.append(track);

  if (slides.length > 1) {
    const dots = document.createElement('div'); dots.className = 'hc-dots'; dots.setAttribute('role', 'tablist');
    const prev = document.createElement('button'); prev.className = 'hc-arrow hc-prev'; prev.setAttribute('aria-label', 'Previous slide'); prev.innerHTML = '&#8249;';
    const next = document.createElement('button'); next.className = 'hc-arrow hc-next'; next.setAttribute('aria-label', 'Next slide'); next.innerHTML = '&#8250;';
    const slideEls = [...track.children];
    let idx = 0; let timer = null;
    const reduce = window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const go = (n) => {
      slideEls[idx].classList.remove('is-active'); dots.children[idx].setAttribute('aria-selected', 'false');
      idx = (n + slideEls.length) % slideEls.length;
      slideEls[idx].classList.add('is-active'); dots.children[idx].setAttribute('aria-selected', 'true');
    };
    slideEls.forEach((_, n) => {
      const b = document.createElement('button'); b.setAttribute('role', 'tab'); b.setAttribute('aria-label', `Slide ${n + 1}`);
      b.setAttribute('aria-selected', n === 0 ? 'true' : 'false');
      b.addEventListener('click', () => { go(n); restart(); });
      dots.append(b);
    });
    const start = () => { if (!reduce) timer = setInterval(() => go(idx + 1), 6000); };
    const restart = () => { if (timer) clearInterval(timer); start(); };
    prev.addEventListener('click', () => { go(idx - 1); restart(); });
    next.addEventListener('click', () => { go(idx + 1); restart(); });
    block.append(prev, next, dots);
    block.addEventListener('mouseenter', () => { if (timer) clearInterval(timer); });
    block.addEventListener('mouseleave', start);
    start();
  }
}
