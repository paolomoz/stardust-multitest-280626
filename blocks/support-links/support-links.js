/**
 * support-links — grid of quick support links. Optional leading head row
 * (h2 + view-all link), then one row per link card. Each card row: a link
 * (title) and an optional <p> description. The whole card is clickable.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const head = document.createElement('div');
  head.className = 'support-head wrap';
  const grid = document.createElement('div');
  grid.className = 'support-grid wrap';

  rows.forEach((row) => {
    if (row.querySelector('h2')) {
      [...row.children].forEach((c) => { [...c.childNodes].forEach((n) => head.append(n.cloneNode(true))); });
      return;
    }
    const link = row.querySelector('a');
    if (!link) return;
    const card = document.createElement('a');
    card.className = 'support-card';
    card.href = link.getAttribute('href') || '#';
    const strong = document.createElement('strong');
    strong.textContent = link.textContent.trim();
    card.append(strong);
    const desc = [...row.querySelectorAll('p')].find((p) => !p.querySelector('a'));
    if (desc) { const span = document.createElement('span'); span.textContent = desc.textContent.trim(); card.append(span); }
    grid.append(card);
  });

  block.replaceChildren(...(head.childNodes.length ? [head, grid] : [grid]));
}
