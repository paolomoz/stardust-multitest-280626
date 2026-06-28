/**
 * hero block
 * variants:
 *   hero          → interior page hero (eyebrow + h1 + optional lede)
 *   hero video    → full-bleed home hero with autoplay background video
 * authoring:
 *   video variant: first cell = a link/text with the video URL; following cells = overlay text
 *   default:       a single cell with eyebrow (em/p) + h1 + lede
 */
export default async function decorate(block) {
  const isVideo = block.classList.contains('video');
  const rows = [...block.children];

  if (isVideo) {
    // find a video URL anywhere in the block
    let videoUrl = '';
    const link = block.querySelector('a[href]');
    if (link) videoUrl = link.getAttribute('href');
    if (!videoUrl) {
      const m = block.textContent.match(/https?:\/\/\S+\.(?:mp4|webm|mov)/i);
      if (m) [videoUrl] = m;
    }
    // overlay text = everything that's not the video url row
    const overlay = document.createElement('div');
    overlay.className = 'hero-overlay';
    rows.forEach((row) => {
      const t = row.textContent.trim();
      if (t && !/https?:\/\/\S+\.(?:mp4|webm|mov)/i.test(t)) {
        overlay.append(...row.childNodes);
      }
    });
    block.textContent = '';

    if (videoUrl) {
      const media = document.createElement('div');
      media.className = 'hero-media';
      const video = document.createElement('video');
      video.autoplay = true;
      video.loop = true;
      video.muted = true;
      video.playsInline = true;
      video.setAttribute('aria-hidden', 'true');
      video.src = videoUrl;
      // respect reduced motion
      if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
        video.removeAttribute('autoplay');
        video.pause?.();
      }
      media.append(video);
      block.append(media);
    }
    block.append(overlay);
    return;
  }

  // interior hero: wrap content
  const content = document.createElement('div');
  content.className = 'hero-content';
  rows.forEach((row) => content.append(...row.childNodes));
  block.textContent = '';
  block.append(content);
}
