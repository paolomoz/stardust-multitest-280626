import { chromium } from 'playwright';

const ORIGIN = 'https://www.sony.com';
const ENTRY = 'https://www.sony.com/en/';

const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const context = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  deviceScaleFactor: 2,
  colorScheme: 'light',
  locale: 'en-US',
  ignoreHTTPSErrors: true,
});

const page = await context.newPage();
console.error('navigating to', ENTRY);
const resp = await page.goto(ENTRY, { waitUntil: 'domcontentloaded', timeout: 45000 });
console.error('status', resp?.status(), 'url', page.url());

// consent dismiss
try {
  await page.evaluate(() => {
    try { if (window.OneTrust?.RejectAll) window.OneTrust.RejectAll(); } catch {}
  });
} catch {}
for (const sel of ['#onetrust-reject-all-handler','#onetrust-accept-btn-handler','[aria-label*="accept" i]']) {
  try { await page.click(sel, { timeout: 2500 }); break; } catch {}
}
await page.waitForTimeout(2000);

// header/footer links
const navLinks = await page.evaluate((origin) => {
  const out = [];
  const seen = new Set();
  const collect = (root, zone) => {
    if (!root) return;
    root.querySelectorAll('a[href]').forEach(a => {
      let href = a.getAttribute('href');
      if (!href) return;
      try { href = new URL(href, location.href).href; } catch { return; }
      if (!href.startsWith(origin)) return;
      const key = zone + '|' + href;
      if (seen.has(key)) return;
      seen.add(key);
      out.push({ zone, href, text: (a.textContent||'').trim().slice(0,60) });
    });
  };
  collect(document.querySelector('header') || document.querySelector('[role=banner]'), 'header');
  collect(document.querySelector('footer') || document.querySelector('[role=contentinfo]'), 'footer');
  collect(document.querySelector('nav'), 'nav');
  return out;
}, ORIGIN);

// try sitemap via in-page fetch
let sitemap = null;
for (const sm of ['/sitemap.xml','/sitemap_index.xml','/en/sitemap.xml']) {
  try {
    const txt = await page.evaluate(async (u) => {
      const r = await fetch(u);
      if (!r.ok) return null;
      return (await r.text()).slice(0, 200000);
    }, ORIGIN + sm);
    if (txt) { sitemap = { url: sm, body: txt }; break; }
  } catch {}
}

// all same-origin links on home
const allLinks = await page.evaluate((origin) => {
  const set = new Set();
  document.querySelectorAll('a[href]').forEach(a => {
    let href = a.getAttribute('href'); if (!href) return;
    try { href = new URL(href, location.href).href.split('#')[0].split('?')[0]; } catch { return; }
    if (href.startsWith(origin)) set.add(href);
  });
  return [...set];
}, ORIGIN);

const title = await page.title();
const h1 = await page.evaluate(() => document.querySelector('h1')?.textContent?.trim() || null);

import fs from 'fs';
fs.writeFileSync('/Users/paolo/stardust/rollout/multitest-280626/sony/stardust/discovery.json', JSON.stringify({
  status: resp?.status(), finalUrl: page.url(), title, h1,
  navLinks, allLinks, sitemapFound: sitemap?.url || null,
  sitemapSample: sitemap ? sitemap.body.slice(0, 3000) : null,
}, null, 2));
console.error('navLinks', navLinks.length, 'allLinks', allLinks.length, 'sitemap', sitemap?.url);
await browser.close();
