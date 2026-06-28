/**
 * compare — comparison table (e.g. Xfinity vs a competitor). First row = column
 * headers (blank first cell, then provider names). Each following row = a
 * feature label cell + one value cell per provider. The first value column is
 * highlighted as the Xfinity column.
 */
export default function decorate(block) {
  const rows = [...block.children];
  const table = document.createElement('table');
  table.className = 'compare-table';
  const thead = document.createElement('thead');
  const tbody = document.createElement('tbody');

  rows.forEach((row, ri) => {
    const tr = document.createElement('tr');
    const cells = [...row.children];
    cells.forEach((cell, ci) => {
      const el = document.createElement(ri === 0 ? 'th' : (ci === 0 ? 'th' : 'td'));
      if (ri === 0 && ci === 1) el.classList.add('compare-own');
      if (ri > 0 && ci === 1) el.classList.add('compare-own');
      el.innerHTML = cell.innerHTML;
      tr.append(el);
    });
    (ri === 0 ? thead : tbody).append(tr);
  });
  table.append(thead, tbody);
  block.textContent = '';
  block.append(table);
}
