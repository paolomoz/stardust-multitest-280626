/**
 * article-body — long-form prose. Flattens the authored cell(s) into a single
 * measure-constrained column of headings, paragraphs, lists, and a CTA.
 * Authoring: one cell containing a lede <p>, <h2> section heads, body <p>s,
 * and an optional CTA <p> (<strong><a>).
 */
export default async function decorate(block) {
  const nodes = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    [...cell.children].forEach((n) => nodes.push(n));
  });
  const col = document.createElement('div');
  col.className = 'article-col wrap';
  const flow = nodes.length ? nodes : [...block.children];
  flow.forEach((n, i) => {
    if (i === 0 && n.tagName === 'P' && !n.querySelector('a')) n.classList.add('lede');
    if (n.tagName === 'P' && n.querySelector('a')) n.classList.add('endcta');
    col.append(n);
  });
  block.replaceChildren(col);
}
