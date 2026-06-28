/**
 * article-header — type-led editorial hero on a dark band: breadcrumb/eyebrow,
 * the page <h1>, and a deck. Authoring: one cell with an optional eyebrow
 * <p><em>, an <h1>, and a <p> deck.
 */
function collectNodes(block) {
  const out = [];
  block.querySelectorAll(':scope > div > div').forEach((cell) => {
    const kids = [...cell.children];
    if (kids.length) out.push(...kids);
    else if (cell.textContent.trim()) {
      const p = document.createElement('p');
      p.textContent = cell.textContent.trim();
      out.push(p);
    }
  });
  return out.length ? out : [...block.children];
}

export default async function decorate(block) {
  const nodes = collectNodes(block);
  const headingNode = nodes.find((n) => n.matches?.('h1,h2'));
  const heading = headingNode?.matches?.('h1,h2') ? headingNode : null;
  const paras = nodes.filter((n) => n.tagName === 'P');
  const eyebrow = paras[0] && paras[0].textContent.trim().length < 40 ? paras[0] : null;
  const deck = paras.find((p) => p !== eyebrow);

  const inner = document.createElement('div');
  inner.className = 'ahero-inner wrap';
  if (eyebrow) { eyebrow.classList.add('eyebrow'); inner.append(eyebrow); }
  if (heading) inner.append(heading);
  if (deck) { deck.classList.add('ahero-deck'); inner.append(deck); }

  block.replaceChildren(inner);
  block.classList.add('dark');
}
