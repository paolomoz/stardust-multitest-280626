/**
 * split — 2-column copy + image. Variant `reverse` flips order.
 * Authoring: one row, two cells — copy cell (heading, p, optional CTA) + media cell (img).
 * Falls back gracefully if flattened to one cell.
 */
export default async function decorate(block) {
  const rows = [...block.children];
  let copyCell; let mediaCell;
  if (rows.length === 1) {
    // flattened — split by media presence
    const cell = rows[0].firstElementChild || rows[0];
    const media = cell.querySelector('picture, img');
    copyCell = document.createElement('div');
    [...cell.children].forEach((c) => { if (!(c.matches('picture,img') || c.querySelector?.('picture,img'))) copyCell.append(c); });
    mediaCell = document.createElement('div');
    if (media) mediaCell.append(media.closest('picture') || media);
  } else {
    const cells = [...rows[0].children];
    const mediaIdx = cells.findIndex((c) => c.querySelector('picture, img'));
    mediaCell = mediaIdx >= 0 ? cells[mediaIdx] : cells[1];
    copyCell = cells.find((c) => c !== mediaCell) || cells[0];
  }

  const wrap = document.createElement('div');
  wrap.className = 'wrap split-grid';
  const copy = document.createElement('div');
  copy.className = 'split-copy';
  copy.append(...(copyCell ? copyCell.childNodes : []));
  // wrap any CTA links sitting in a <p> into btn-group (decorateButton handles classes)
  const media = document.createElement('div');
  media.className = 'split-media';
  if (mediaCell) {
    const m = mediaCell.querySelector('picture, img');
    if (m) media.append(m.closest('picture') || m);
  }
  wrap.append(copy, media);
  block.replaceChildren(wrap);
}
