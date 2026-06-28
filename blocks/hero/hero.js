/**
 * hero — Bank of America page lead (navy/royal-blue gradient band).
 *
 * Variants:
 *  - hero (default / "simple"): inner-page hero. One cell with <h1> + optional lede <p>.
 *  - hero login: home hero. Renders a static Online Banking sign-in panel on the
 *    left, the authored <h1> + a credit-card showcase on the right. Authoring:
 *      row 1: <h1> headline
 *      rows 2..N (one per card): cells -> <img> | number | offer | fee | name | <a>CTA
 */

function num(text) {
  const span = document.createElement('div');
  span.className = 'num';
  const t = (text || '').trim();
  const m = t.match(/^(\d+(?:\.\d+)?)(%)?$/);
  if (m) {
    span.textContent = m[1];
    if (m[2]) { const s = document.createElement('sup'); s.textContent = '%'; span.append(s); }
  } else {
    span.textContent = t;
  }
  return span;
}

function buildSignin() {
  const panel = document.createElement('div');
  panel.className = 'signin';
  panel.innerHTML = `
    <h2>Sign in to Online Banking</h2>
    <div class="field"><label for="hero-uid">User ID</label><input id="hero-uid" type="text" autocomplete="username"></div>
    <div class="field"><label for="hero-pwd">Password</label><input id="hero-pwd" type="password" autocomplete="current-password"></div>
    <a class="btn btn-primary" href="/bankofamerica/online-banking/overview">Log in</a>
    <div class="links">
      <a class="link-cta" href="/bankofamerica/online-banking/forgot-id-password">Forgot ID/password?</a>
      <a class="link-cta" href="/bankofamerica/deposits/checking/checking-accounts">Open an account</a>
    </div>`;
  return panel;
}

function buildCard(row) {
  const cells = [...row.children];
  const card = document.createElement('article');
  card.className = 'ccard';
  const img = row.querySelector('picture, img');
  const link = row.querySelector('a');
  const texts = cells
    .filter((c) => !c.querySelector('picture, img') && !c.querySelector('a'))
    .map((c) => c.textContent.trim())
    .filter(Boolean);
  // texts order: number, offer, fee, name
  if (texts[0]) card.append(num(texts[0]));
  if (texts[1]) { const o = document.createElement('div'); o.className = 'offer'; o.textContent = texts[1]; card.append(o); }
  if (texts[2]) { const f = document.createElement('div'); f.className = 'fee'; f.textContent = texts[2]; card.append(f); }
  if (img) card.append(img.closest('picture') || img);
  if (texts[3]) { const n = document.createElement('div'); n.className = 'name'; n.textContent = texts[3]; card.append(n); }
  if (link) { link.classList.add('link-cta'); card.append(link); }
  return card;
}

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
  const wrap = document.createElement('div');
  wrap.className = 'wrap';

  if (block.classList.contains('login')) {
    const rows = [...block.children];
    const headRow = rows.find((r) => !r.querySelector('picture, img'));
    const cardRows = rows.filter((r) => r.querySelector('picture, img'));

    wrap.append(buildSignin());

    const right = document.createElement('div');
    right.className = 'heroright';
    const srcH = headRow && headRow.querySelector('h1, h2');
    if (srcH) {
      const h1 = document.createElement('h1');
      h1.innerHTML = srcH.innerHTML;
      right.append(h1);
    }
    const grid = document.createElement('div');
    grid.className = 'cardgrid';
    cardRows.forEach((r) => grid.append(buildCard(r)));
    right.append(grid);
    wrap.append(right);
    block.replaceChildren(wrap);
    return;
  }

  // simple inner-page hero
  const nodes = collectNodes(block);
  const headingCell = nodes.find((n) => n.matches?.('h1, h2') || n.querySelector?.('h1, h2'));
  const heading = headingCell?.matches?.('h1, h2') ? headingCell : headingCell?.querySelector('h1, h2');
  const paras = nodes.filter((n) => n.tagName === 'P');
  const inner = document.createElement('div');
  inner.className = 'hero-inner';
  if (heading) {
    const h1 = document.createElement('h1');
    h1.innerHTML = heading.innerHTML;
    inner.append(h1);
  }
  paras.forEach((p) => { p.classList.add('hero-lede'); inner.append(p); });
  wrap.append(inner);
  block.replaceChildren(wrap);
}
