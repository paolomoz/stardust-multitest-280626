import { getMetadata } from '../../scripts/ak.js';

const NAV_PATH = '/sycamorepartners/nav';

function stripTrailingSlash(href) {
  if (!href || href === '/') return href;
  return href.replace(/\/+$/, '');
}

export default async function decorate(block) {
  const navPath = getMetadata('nav') || NAV_PATH;
  let html = '';
  try {
    const resp = await fetch(`${navPath}.plain.html`);
    if (resp.ok) html = await resp.text();
  } catch (e) { /* graceful: render nothing */ }
  if (!html) return;

  const inner = document.createElement('div');
  inner.className = 'header-inner';
  inner.innerHTML = html;

  // First link (with logo image) is the brand
  const brand = inner.querySelector('a');
  if (brand) {
    brand.classList.add('header-brand');
    brand.href = stripTrailingSlash(brand.getAttribute('href') || '/');
  }

  // The list of nav links
  const list = inner.querySelector('ul');
  if (list) list.classList.add('header-nav');
  inner.querySelectorAll('a').forEach((a) => {
    a.href = stripTrailingSlash(a.getAttribute('href') || a.href);
  });

  // Mobile toggle
  const toggle = document.createElement('button');
  toggle.className = 'header-toggle';
  toggle.setAttribute('aria-label', 'Toggle navigation');
  toggle.innerHTML = '<span></span><span></span><span></span>';
  toggle.addEventListener('click', () => block.classList.toggle('is-open'));
  inner.append(toggle);

  block.append(inner);

  // close on link click (mobile)
  inner.querySelectorAll('.header-nav a').forEach((a) => {
    a.addEventListener('click', () => block.classList.remove('is-open'));
  });

  // shrink on scroll
  const onScroll = () => block.classList.toggle('is-scrolled', window.scrollY > 4);
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });
}
