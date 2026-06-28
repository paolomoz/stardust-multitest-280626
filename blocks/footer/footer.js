const FOOTER_PATH = '/sycamorepartners/footer';

function stripTrailingSlash(href) {
  if (!href || href === '/') return href;
  return href.replace(/\/+$/, '');
}

export default async function decorate(block) {
  let html = '';
  try {
    const resp = await fetch(`${FOOTER_PATH}.plain.html`);
    if (resp.ok) html = await resp.text();
  } catch (e) { /* graceful */ }
  if (!html) return;
  const inner = document.createElement('div');
  inner.className = 'footer-inner';
  inner.innerHTML = html;
  inner.querySelectorAll('a').forEach((a) => {
    a.href = stripTrailingSlash(a.getAttribute('href') || a.href);
  });
  block.append(inner);
}
