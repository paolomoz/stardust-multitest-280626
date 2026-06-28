import { chromium } from 'playwright';
import fs from 'fs';
import crypto from 'crypto';

const BASE = '/Users/paolo/stardust/rollout/multitest-280626/sony/stardust/current';
const ORIGIN = 'https://www.sony.com';

const PAGES = [
  { slug: 'home', url: 'https://www.sony.com/en/', type: 'landing' },
  { slug: 'products', url: 'https://www.sony.com/en/SonyInfo/products/', type: 'listing' },
  { slug: 'about', url: 'https://www.sony.com/en/SonyInfo/CorporateInfo/', type: 'landing' },
  { slug: 'news-press', url: 'https://www.sony.com/en/SonyInfo/News/Press/', type: 'listing' },
  { slug: 'message', url: 'https://www.sony.com/en/SonyInfo/message/', type: 'article' },
  { slug: 'design', url: 'https://www.sony.com/en/SonyInfo/design/', type: 'landing' },
  { slug: 'technology', url: 'https://www.sony.com/en/SonyInfo/technology/', type: 'landing' },
  { slug: 'privacy', url: 'https://www.sony.com/en/privacy/', type: 'static' },
];

const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 }, deviceScaleFactor: 2,
  colorScheme: 'light', locale: 'en-US', ignoreHTTPSErrors: true,
});

// font intercept
const fonts = {};
context.on('response', async (r) => {
  try {
    const u = r.url();
    if (/\.(woff2?|ttf|otf|eot)(\?|$)/i.test(u) && !fonts[u]) {
      const buf = await r.body();
      const base = u.split('?')[0].split('/').pop();
      fs.writeFileSync(`${BASE}/assets/fonts/${base}`, buf);
      fonts[u] = { url: u, localPath: `assets/fonts/${base}` };
    }
  } catch {}
});

// consent dismiss once
const cp = await context.newPage();
try {
  await cp.goto(ORIGIN + '/en/', { waitUntil: 'domcontentloaded', timeout: 45000 });
  await cp.evaluate(() => { try { window.OneTrust?.RejectAll?.(); } catch {} });
  for (const sel of ['#onetrust-reject-all-handler','#onetrust-accept-btn-handler','[aria-label*="accept" i]']) {
    try { await cp.click(sel, { timeout: 2500 }); break; } catch {}
  }
  await cp.waitForTimeout(1500);
} catch {}
await cp.close();

const CAPTURE = () => {
  const txt = (el) => (el?.innerText || '').replace(/\s+\n/g, '\n').replace(/\n{3,}/g, '\n\n').trim();
  const cs = (el, p, pseudo) => { try { return getComputedStyle(el, pseudo||null)[p]; } catch { return ''; } };
  const abs = (h) => { try { return new URL(h, location.href).href; } catch { return h; } };

  // headings
  const headings = [...document.querySelectorAll('h1,h2,h3,h4,h5,h6')].map(h => ({
    level: +h.tagName[1], text: (h.textContent||'').trim().slice(0,300),
    fontFamily: cs(h,'fontFamily'), fontWeight: cs(h,'fontWeight'), fontSize: cs(h,'fontSize'),
    color: cs(h,'color'),
  })).filter(h => h.text);

  // landmarks with body/lists
  const landmarks = [...document.querySelectorAll('header,nav,main,aside,footer,[role=banner],[role=navigation],[role=main],[role=contentinfo],[role=region],section')].slice(0,40).map(el => {
    const body = [...el.querySelectorAll(':scope > p, :scope > * > p, :scope blockquote')].map(p => (p.textContent||'').trim()).filter(t => t.length > 20).slice(0,30);
    const lists = [...el.querySelectorAll(':scope ul, :scope ol')].slice(0,15).map(l => ({ ordered: l.tagName==='OL', items: [...l.querySelectorAll(':scope > li')].map(li => (li.textContent||'').trim()).filter(Boolean).slice(0,20) })).filter(l => l.items.length);
    return {
      tag: el.tagName.toLowerCase(), role: el.getAttribute('role')||null,
      id: el.id||null, class: (el.className&&el.className.toString().slice(0,80))||null,
      text: txt(el).slice(0, 6000), body, lists,
      bg: cs(el,'backgroundColor'), color: cs(el,'color'),
    };
  });

  // ctas
  const ctas = [...document.querySelectorAll('a,button,[role=button]')].filter(a => {
    const b = cs(a,'backgroundColor'); const br = parseFloat(cs(a,'borderRadius'))||0;
    return (b && b!=='rgba(0, 0, 0, 0)' && b!=='transparent') && br > 1;
  }).slice(0,40).map(a => ({
    label: (a.textContent||'').trim().slice(0,60), href: a.getAttribute('href') ? abs(a.getAttribute('href')) : null,
    bg: cs(a,'backgroundColor'), color: cs(a,'color'), borderRadius: cs(a,'borderRadius'),
    fontWeight: cs(a,'fontWeight'),
  })).filter(c => c.label);

  // links
  const links = {};
  document.querySelectorAll('a[href]').forEach(a => {
    let h = a.getAttribute('href'); if (!h) return; h = abs(h).split('#')[0];
    if (h.startsWith('http')) { const internal = h.startsWith(location.origin); (links[h] = links[h] || { href: h, internal, text: (a.textContent||'').trim().slice(0,50) }); }
  });

  // media imgs
  const imgs = [...document.querySelectorAll('img')].map(i => ({
    src: i.currentSrc || i.src, alt: i.alt||'', w: i.naturalWidth, h: i.naturalHeight,
  })).filter(i => i.src && i.w >= 40);

  // css backgrounds
  const cssBackgrounds = [];
  document.querySelectorAll('*').forEach(el => {
    const r = el.getBoundingClientRect();
    if (r.width < 100 || r.height < 80) return;
    for (const ps of [null, '::before', '::after']) {
      const bi = cs(el, 'backgroundImage', ps);
      if (bi && bi !== 'none' && bi.includes('url(')) {
        const urls = [...bi.matchAll(/url\(["']?(.*?)["']?\)/g)].map(m => abs(m[1])).filter(u => !u.startsWith('data:'));
        urls.forEach(u => cssBackgrounds.push({ url: u, rect: { w: Math.round(r.width), h: Math.round(r.height) }, pseudo: ps||null, size: cs(el,'backgroundSize',ps) }));
      }
    }
  });

  const svgCount = document.querySelectorAll('svg').length;
  const videos = [...document.querySelectorAll('video')].map(v => ({ src: v.currentSrc||v.src||null, poster: v.poster||null }));
  const iframes = [...document.querySelectorAll('iframe')].map(f => ({ src: f.src }));
  const forms = [...document.querySelectorAll('form')].map(f => ({ action: f.action, method: f.method, fields: [...f.querySelectorAll('input,select,textarea')].map(i => ({ type: i.type||i.tagName.toLowerCase(), name: i.name||null })) }));

  const cssVars = {};
  const rs = getComputedStyle(document.documentElement);
  for (let i=0;i<rs.length;i++){ const n=rs[i]; if(n.startsWith('--')) cssVars[n]=rs.getPropertyValue(n).trim().slice(0,80); }

  const meta = (n,attr='name') => document.querySelector(`meta[${attr}="${n}"]`)?.content || null;

  return {
    title: document.title,
    description: meta('description'),
    og: { title: meta('og:title','property'), description: meta('og:description','property'), image: meta('og:image','property'), siteName: meta('og:site_name','property') },
    themeColor: meta('theme-color'),
    headings, landmarks, ctas, links: Object.values(links),
    media: { imgs, cssBackgrounds, svgCount, videos, iframes },
    forms, cssVars,
    dedupBgUrls: [...new Set(cssBackgrounds.map(b=>b.url))],
  };
};

const results = [];
for (const P of PAGES) {
  try {
    const page = await context.newPage();
    const resp = await page.goto(P.url, { waitUntil: 'domcontentloaded', timeout: 45000 });
    const status = resp?.status();
    await page.waitForTimeout(2000);
    // scroll
    for (let i=0;i<4;i++){ await page.evaluate((s)=>window.scrollTo(0, s*window.innerHeight), i); await page.waitForTimeout(300); }
    await page.evaluate(()=>window.scrollTo(0,0));
    // reveal
    await page.evaluate(() => {
      document.querySelectorAll('details').forEach(d => d.open = true);
      document.querySelectorAll('[aria-expanded="false"]').forEach(b => { try { b.click(); } catch {} });
    }).catch(()=>{});
    await page.waitForTimeout(600);
    const data = await page.evaluate(CAPTURE);
    const finalUrl = page.url();
    // screenshot
    try { await page.screenshot({ path: `${BASE}/assets/screenshots/${P.slug}.png`, fullPage: true }); } catch {}
    const rec = {
      _provenance: { renderedBy: 'playwright', fetchedAt: new Date().toISOString(), waitMs: 2900, waitMode: 'domcontentloaded', httpStatus: status, finalUrl, url: P.url },
      slug: P.slug, type: P.type, ...data,
    };
    fs.writeFileSync(`${BASE}/pages/${P.slug}.json`, JSON.stringify(rec, null, 2));
    results.push({ slug: P.slug, status, imgs: data.media.imgs.length, bg: data.media.cssBackgrounds.length, headings: data.headings.length });
    console.error(`OK ${P.slug} status=${status} imgs=${data.media.imgs.length} bg=${data.media.cssBackgrounds.length} h=${data.headings.length}`);
    await page.close();
  } catch (e) {
    results.push({ slug: P.slug, error: String(e).slice(0,120) });
    console.error(`FAIL ${P.slug} ${e}`);
  }
}

fs.writeFileSync(`${BASE}/_fonts.json`, JSON.stringify(Object.values(fonts), null, 2));
fs.writeFileSync(`${BASE}/_extract-results.json`, JSON.stringify(results, null, 2));
console.error('DONE', JSON.stringify(results));
await browser.close();
