/* Paramount people grid. Each row = one person: image + name + title(+bio). */
export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');
  ul.className = 'people-list';
  rows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'person';
    const cells = [...row.children];
    cells.forEach((c) => {
      if (c.querySelector('picture, img')) {
        const media = document.createElement('div');
        media.className = 'person-media';
        media.append(c.querySelector('picture') || c.querySelector('img'));
        li.append(media);
      } else {
        const body = document.createElement('div');
        body.className = 'person-body';
        body.append(...c.childNodes);
        li.append(body);
      }
    });
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
