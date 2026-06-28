/* Paramount feature band: one row, two cells — image + text (order author-defined).
   Variants: reverse (text first), dark (navy bg), surface (tint bg). */
export default function decorate(block) {
  const row = block.querySelector(':scope > div');
  if (!row) return;
  const cells = [...row.children];
  cells.forEach((cell) => {
    if (cell.querySelector('picture, img')) {
      cell.className = 'feature-media';
      const img = cell.querySelector('img');
      if (img) img.loading = 'lazy';
    } else {
      cell.className = 'feature-text';
    }
  });
  const wrap = document.createElement('div');
  wrap.className = 'feature-inner container';
  wrap.append(...row.childNodes);
  block.textContent = '';
  block.append(wrap);
}
