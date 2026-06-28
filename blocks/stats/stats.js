/**
 * stats — animated count-up stat row (brand signature motion).
 * Authoring: section head (h2 + p) as default content above the block;
 *   block rows: each row = one stat — cell text "Up to 7% back" with optional
 *   second cell = label. The number is parsed from the value text.
 * Reduced-motion / no-IO → static captured text.
 */
function parseStat(text) {
  const m = text.match(/(-?\d[\d,.]*)/);
  const num = m ? parseFloat(m[1].replace(/,/g, '')) : null;
  return { num, full: text };
}

export default async function decorate(block) {
  const rows = [...block.children];
  const wrap = document.createElement('div');
  wrap.className = 'wrap';
  const row = document.createElement('div');
  row.className = 'stat-row';

  rows.forEach((r) => {
    const cells = [...r.children];
    const valText = (cells[0]?.textContent || '').trim();
    const lblText = (cells[1]?.textContent || '').trim();
    if (!valText) return;
    const { num, full } = parseStat(valText);
    const stat = document.createElement('div');
    stat.className = 'stat';
    const numEl = document.createElement('span');
    numEl.className = 'stat-num';
    numEl.textContent = full;
    if (num !== null) { numEl.dataset.value = String(num); numEl.dataset.full = full; }
    stat.append(numEl);
    if (lblText) {
      const lbl = document.createElement('span');
      lbl.className = 'stat-lbl';
      lbl.textContent = lblText;
      stat.append(lbl);
    }
    row.append(stat);
  });

  wrap.append(row);
  block.replaceChildren(wrap);

  const rm = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  if (rm || !('IntersectionObserver' in window)) return;
  const nums = block.querySelectorAll('.stat-num[data-value]');
  const run = (el) => {
    const target = parseFloat(el.dataset.value);
    const full = el.dataset.full;
    const lead = full.split(/\d/)[0];
    const tail = full.slice((lead + Math.round(target)).length);
    let t0 = null; const dur = 1100;
    const tick = (ts) => {
      if (!t0) t0 = ts;
      const p = Math.min((ts - t0) / dur, 1);
      const e = 1 - (1 - p) ** 3;
      el.textContent = lead + Math.round(target * e) + tail;
      if (p < 1) requestAnimationFrame(tick);
      else el.textContent = full;
    };
    requestAnimationFrame(tick);
  };
  const io = new IntersectionObserver((es) => es.forEach((en) => {
    if (en.isIntersecting) { run(en.target); io.unobserve(en.target); }
  }), { threshold: 0.5 });
  nums.forEach((n) => io.observe(n));
}
