/* Paramount CTA band: heading + optional text + button(s), centered. */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const wrap = document.createElement('div');
  wrap.className = 'cta-inner container';
  cells.forEach((c) => wrap.append(...c.childNodes));
  block.textContent = '';
  block.append(wrap);
}
