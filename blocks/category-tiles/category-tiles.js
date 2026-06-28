/**
 * category-tiles — "shop by category" chip row. Each authored link becomes a
 * rounded chip linking to a category listing page.
 * Authoring: optional leading head row (h2), then one row per category link.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  const head = document.createElement('div');
  head.className = 'tiles-head wrap';
  const grid = document.createElement('div');
  grid.className = 'tiles-grid wrap';

  rows.forEach((row) => {
    const link = row.querySelector('a');
    if (link) {
      const tile = document.createElement('a');
      tile.className = 'tile';
      tile.href = link.getAttribute('href') || '#';
      const chip = document.createElement('span');
      chip.className = 'chip';
      chip.setAttribute('aria-hidden', 'true');
      const label = document.createElement('span');
      label.className = 'tile-label';
      label.textContent = link.textContent.trim();
      tile.append(chip, label);
      grid.append(tile);
    } else if (row.textContent.trim()) {
      [...row.children].forEach((c) => { [...c.childNodes].forEach((n) => head.append(n.cloneNode(true))); });
    }
  });

  block.replaceChildren(...(head.childNodes.length ? [head, grid] : [grid]));
}
