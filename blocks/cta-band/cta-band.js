/**
 * cta-band — full-width gradient call-to-action band. Single cell with an h2,
 * optional body <p>, and a CTA <p><a>. Variant `dark` for solid black instead
 * of the violet->magenta gradient.
 */
export default function decorate(block) {
  const inner = document.createElement('div');
  inner.className = 'cta-band-inner';
  const cell = block.querySelector(':scope > div > div') || block.querySelector(':scope > div');
  if (cell) { while (cell.firstChild) inner.append(cell.firstChild); }
  block.textContent = '';
  block.append(inner);
}
