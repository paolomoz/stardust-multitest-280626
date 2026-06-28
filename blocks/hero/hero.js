/* Paramount hero: full-bleed media (image or mp4 video) + overlay content with scrim */
export default function decorate(block) {
  const cells = [...block.querySelectorAll(':scope > div > div')];
  let media = null;
  let content = null;
  cells.forEach((cell) => {
    const hasHeading = cell.querySelector('h1, h2, h3');
    const mediaEl = cell.querySelector('picture, img, video, a[href$=".mp4"], a[href$=".webm"]');
    if (mediaEl && !hasHeading) media = cell;
    else content = cell;
  });
  block.textContent = '';

  if (media) {
    const wrap = document.createElement('div');
    wrap.className = 'hero-media';
    const vlink = media.querySelector('a[href$=".mp4"], a[href$=".webm"]');
    const pic = media.querySelector('picture, img');
    if (vlink) {
      const video = document.createElement('video');
      video.muted = true; video.loop = true; video.playsInline = true;
      video.autoplay = true; video.setAttribute('aria-hidden', 'true');
      const poster = media.querySelector('img');
      if (poster) video.poster = poster.src;
      video.src = vlink.getAttribute('href');
      if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        wrap.append(video);
      } else if (poster) {
        wrap.append(poster);
      }
    } else if (pic) {
      const img = pic.tagName === 'IMG' ? pic : pic.querySelector('img');
      if (img) { img.loading = 'eager'; img.setAttribute('fetchpriority', 'high'); }
      wrap.append(pic);
    }
    block.append(wrap);
  }

  const inner = document.createElement('div');
  inner.className = 'hero-content container';
  if (content) inner.append(...content.childNodes);
  block.append(inner);
}
