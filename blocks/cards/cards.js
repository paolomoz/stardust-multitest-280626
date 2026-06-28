/**
 * cards — responsive product-card grid (2-up mobile → 4-up desktop).
 * Authoring: optional leading head row (eyebrow/h2/view-all link), then one
 * row per card. Each card row cells (flexible order): an <img>, an <h3> name,
 * a <p> description, and a CTA <p> (primary <strong><a>, secondary <em><a>).
 */
function cellChildren(row) {
  const out = [];
  [...row.children].forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out;
}

function hasCardHeading(row) {
  return !!row.querySelector('h3, h4');
}

export default async function decorate(block) {
  const rows = [...block.children];
  // Head = leading rows with no card heading and no image
  const head = document.createElement('div');
  head.className = 'cards-head wrap';
  let i = 0;
  while (i < rows.length && !hasCardHeading(rows[i]) && !rows[i].querySelector('img, picture')) {
    [...rows[i].children].forEach((c) => { [...c.childNodes].forEach((n) => head.append(n.cloneNode(true))); });
    i += 1;
  }

  const grid = document.createElement('div');
  grid.className = 'cards-grid wrap';
  for (; i < rows.length; i += 1) {
    const nodes = cellChildren(rows[i]);
    if (!nodes.length) continue;
    const card = document.createElement('article');
    card.className = 'card';
    const mediaNode = nodes.find((n) => n.matches?.('picture, img') || n.querySelector?.('picture, img'));
    const pic = mediaNode?.matches?.('picture, img') ? mediaNode : mediaNode?.querySelector('picture, img');
    const heading = nodes.find((n) => n.matches?.('h3,h4'));
    const paras = nodes.filter((n) => n.tagName === 'P');
    const descP = paras.find((p) => !p.querySelector('a'));
    const ctaP = paras.find((p) => p.querySelector('a'));

    const media = document.createElement('div');
    media.className = 'card-media';
    if (pic) media.append(pic);
    const body = document.createElement('div');
    body.className = 'card-body';
    if (heading) {
      const h3 = document.createElement('h3');
      h3.innerHTML = heading.innerHTML;
      body.append(h3);
    }
    if (descP) body.append(descP);
    if (ctaP) { ctaP.classList.add('card-actions'); body.append(ctaP); }
    card.append(media, body);
    grid.append(card);
  }

  block.replaceChildren(...(head.childNodes.length ? [head, grid] : [grid]));
}
