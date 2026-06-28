/**
 * cards — responsive card grid. Variants: default (feature cards),
 *   `quartet` (4-up compact). Section head (h2/p) authored as default content
 *   above the block. Each card = one row: title (h3) | body | optional CTA link.
 * Handles DA-flattened single-cell shape by segmenting on card headings.
 */
function buildCard(parts) {
  const card = document.createElement('div');
  card.className = 'card';
  parts.forEach((p) => card.append(p));
  return card;
}

export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const grid = document.createElement('div');
  grid.className = 'card-grid';

  const cardsFrom = (cells) => {
    const card = document.createElement('div');
    card.className = 'card';
    cells.forEach((cell) => {
      [...cell.childNodes].forEach((n) => {
        if (n.nodeType === 1) {
          // promote bold-only title to h3 if no heading present
          card.append(n);
        } else if (n.nodeType === 3 && n.textContent.trim()) {
          const p = document.createElement('p');
          p.textContent = n.textContent.trim();
          card.append(p);
        }
      });
    });
    return card;
  };

  if (rows.length > 1) {
    rows.forEach((r) => {
      const cells = [...r.children];
      if (!cells.length) return;
      grid.append(cardsFrom(cells));
    });
  } else if (rows.length === 1) {
    // flattened: segment flat siblings on h3 boundaries
    const cell = rows[0].firstElementChild || rows[0];
    const kids = [...cell.children];
    let cur = null;
    kids.forEach((k) => {
      if (k.matches('h2, h3, h4')) {
        cur = buildCard([k.matches('h3') ? k : (() => { const h = document.createElement('h3'); h.append(...k.childNodes); return h; })()]);
        grid.append(cur);
      } else if (cur) {
        cur.append(k);
      }
    });
  }

  // normalize: ensure card titles are h3, wrap stray CTA p in btn-group handled globally
  grid.querySelectorAll('.card').forEach((card) => {
    const h = card.querySelector('h1,h2,h4');
    if (h && h.tagName !== 'H3') { const n = document.createElement('h3'); n.append(...h.childNodes); h.replaceWith(n); }
  });

  wrap.append(grid);
  block.replaceChildren(wrap);
}
