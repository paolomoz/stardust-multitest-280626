export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('logo-item');
    const link = row.querySelector('a');
    const img = row.querySelector('img, picture');
    if (link && img) {
      // ensure the image lives inside the link
      if (!link.contains(img)) link.append(img.closest('picture') || img);
      link.classList.add('logo-link');
    }
  });
}
