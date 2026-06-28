export default function decorate(block) {
  [...block.children].forEach((row) => {
    row.classList.add('card');
    const cells = [...row.children];
    const media = cells.find((c) => c.querySelector('img, picture'));
    const body = cells.find((c) => c !== media);
    if (media) media.classList.add('card-media');
    if (body) {
      body.classList.add('card-body');
      const date = body.querySelector('em, strong');
      if (date) date.classList.add('card-date');
      const heading = body.querySelector('h2, h3, h4');
      if (heading) heading.classList.add('card-title');
    }
    // make the whole card link to the title's href if present
    const titleLink = body && body.querySelector('a[href]');
    if (titleLink) {
      row.classList.add('card-linked');
      row.addEventListener('click', (e) => {
        if (e.target.closest('a')) return;
        titleLink.click();
      });
    }
  });
}
