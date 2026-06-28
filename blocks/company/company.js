export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    const img = row.querySelector('img, picture');
    const link = row.querySelector('a');
    if (img) { row.classList.add('company-logo'); return; }
    if (link && /^https?:/i.test(link.getAttribute('href') || '')) { row.classList.add('company-website'); return; }
    row.classList.add('company-text');
  });
}
