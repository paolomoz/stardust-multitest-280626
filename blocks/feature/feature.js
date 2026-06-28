/**
 * feature — alternating text/image feature rows. Each row = [text cell, image
 * cell]. Even rows render image-right, odd rows image-left (auto-alternate).
 * Variant `reverse` flips the starting side. Cell with no image is the text.
 */
export default function decorate(block) {
  const rows = [...block.children];
  rows.forEach((row, i) => {
    row.classList.add('feature-row');
    if (i % 2 === 1) row.classList.add('feature-flip');
    [...row.children].forEach((c) => {
      if (c.querySelector('img, picture')) c.classList.add('feature-media');
      else c.classList.add('feature-text');
    });
  });
}
