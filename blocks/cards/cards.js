/* Paramount cards. Each row = one card.
   Cell with image = card media; cell(s) with text = label/title + optional desc + link.
   Variant "brands": square image with label overlay (links the whole card).
   Default/"news": image on top, title + text below. */
export default function decorate(block) {
  const rows = [...block.children];
  const ul = document.createElement('ul');
  ul.className = 'cards-list';
  rows.forEach((row) => {
    const li = document.createElement('li');
    li.className = 'card';
    const cells = [...row.children];
    let img = null;
    const textCells = [];
    cells.forEach((c) => {
      if (c.querySelector('picture, img') && !c.querySelector('h1,h2,h3,h4')) img = c;
      else textCells.push(c);
    });
    // a link wrapping the card (first link found)
    const link = row.querySelector('a[href]');
    if (img) {
      const media = document.createElement('div');
      media.className = 'card-media';
      const pic = img.querySelector('picture') || img.querySelector('img');
      media.append(pic);
      li.append(media);
    }
    const body = document.createElement('div');
    body.className = 'card-body';
    textCells.forEach((tc) => body.append(...tc.childNodes));
    if (body.childNodes.length) li.append(body);
    if (link) {
      const a = document.createElement('a');
      a.className = 'card-link';
      a.href = link.getAttribute('href');
      a.setAttribute('aria-label', (link.textContent || body.textContent || 'View').trim());
      li.append(a);
    }
    ul.append(li);
  });
  block.textContent = '';
  block.append(ul);
}
