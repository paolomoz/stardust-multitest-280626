/**
 * tiles — Xfinity offer/deal/card grid (the signature merchandising pattern).
 * Each row = one tile. Cell 1 = image (optional), remaining cell = content
 * (h3 heading, optional price <p><strong>, body <p>, CTA <p><a>).
 * Variants: `two` / `three` / `four` columns (default auto-fit), `editorial`
 * (article cards, image on top, no price).
 */
export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row) => {
    row.classList.add('tile');
    const cells = [...row.children];
    let imageCell = null;
    let contentCell = null;
    cells.forEach((c) => {
      if (!imageCell && c.querySelector('img, picture')) imageCell = c;
      else if (!contentCell) contentCell = c;
    });
    // if first cell holds image AND second is content this is fine; if a single
    // cell holds everything, treat it as content
    if (!contentCell && imageCell) { contentCell = imageCell; imageCell = imageCell.querySelector('img,picture') ? imageCell : null; }

    if (imageCell) imageCell.classList.add('tile-media');
    if (contentCell) {
      contentCell.classList.add('tile-body');
      // mark a price-looking paragraph
      contentCell.querySelectorAll('p').forEach((p) => {
        const t = p.textContent.trim();
        if (/^\$?\d/.test(t) && /\bmo\b|\/mo|month|\$/.test(t) && t.length < 60) p.classList.add('tile-price');
      });
    }
  });
}
