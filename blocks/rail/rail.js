/**
 * rail — compact proof/stat strip. Each row = one item: a stat/number cell
 * (first) + a label cell. Renders as an evenly-spaced horizontal strip.
 */
export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('rail-item');
    const cells = [...row.children];
    if (cells[0]) cells[0].classList.add('rail-stat');
    if (cells[1]) cells[1].classList.add('rail-label');
  });
}
