/* Paramount prose: rich text content, constrained measure. */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  const wrap = document.createElement('div');
  wrap.className = 'prose-inner container';
  cells.forEach((c) => wrap.append(...c.childNodes));
  block.textContent = '';
  block.append(wrap);
}
