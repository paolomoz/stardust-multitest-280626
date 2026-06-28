/**
 * fee-table — bordered data table with caption. Authoring:
 *   row 1: caption (single cell)  → <caption>
 *   row 2: column headers (N cells) → <thead>
 *   rows 3..N: data (N cells)       → <tbody>
 * Section head (h2) authored as default content above the block.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  if (!rows.length) return;
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const table = document.createElement('table');
  table.className = 'fee-table-el';

  const first = [...rows[0].children];
  let idx = 0;
  if (first.length === 1) {
    const cap = document.createElement('caption');
    cap.append(...first[0].childNodes);
    table.append(cap);
    idx = 1;
  }
  const headRow = [...rows[idx].children];
  const thead = document.createElement('thead');
  const htr = document.createElement('tr');
  headRow.forEach((c) => { const th = document.createElement('th'); th.append(...c.childNodes); htr.append(th); });
  thead.append(htr);
  table.append(thead);

  const tbody = document.createElement('tbody');
  rows.slice(idx + 1).forEach((r) => {
    const tr = document.createElement('tr');
    [...r.children].forEach((c) => { const td = document.createElement('td'); td.append(...c.childNodes); tr.append(td); });
    tbody.append(tr);
  });
  table.append(tbody);

  wrap.append(table);
  block.replaceChildren(wrap);
}
