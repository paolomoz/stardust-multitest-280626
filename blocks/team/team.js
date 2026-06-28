export default function decorate(block) {
  [...block.children].forEach((row) => {
    const cells = [...row.children];
    // a single-cell row that is a heading == group label
    if (cells.length === 1) { row.classList.add('team-group'); return; }
    row.classList.add('team-person');
    if (cells[0]) cells[0].classList.add('person-name');
    if (cells[1]) cells[1].classList.add('person-title');
  });
}
