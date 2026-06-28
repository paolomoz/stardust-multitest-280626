/**
 * hero — Xfinity hero. First cell = content (h1/eyebrow/body/CTAs),
 * optional second cell = image. Variants (on the block div): `dark` (black bg),
 * `split` (text left / image right), `gradient` (violet->magenta band).
 */
export default function decorate(block) {
  const rows = [...block.children];
  const cells = rows[0] ? [...rows[0].children] : [];
  const contentCell = cells[0];
  const imageCell = cells[1];

  const wrap = document.createElement('div');
  wrap.className = 'hero-inner';

  const content = document.createElement('div');
  content.className = 'hero-content';
  if (contentCell) {
    const firstP = contentCell.querySelector('p');
    if (firstP && firstP.querySelector('em') && !firstP.querySelector('a')) {
      firstP.classList.add('eyebrow');
      firstP.textContent = firstP.textContent.trim();
    }
    while (contentCell.firstChild) content.append(contentCell.firstChild);
  }
  wrap.append(content);

  if (imageCell && imageCell.querySelector('img, picture')) {
    const media = document.createElement('div');
    media.className = 'hero-media';
    while (imageCell.firstChild) media.append(imageCell.firstChild);
    wrap.append(media);
    block.classList.add('has-media');
  }

  block.textContent = '';
  block.append(wrap);
}
