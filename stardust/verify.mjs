import { chromium } from 'playwright';
const HOST = 'https://site-sony--stardust-multitest-280626--paolomoz.aem.live';
const PAGES = ['/sony/', '/sony/products', '/sony/message', '/sony/news-press', '/sony/privacy'];
const browser = await chromium.launch();
for (const p of PAGES) {
  const ctx = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await ctx.newPage();
  const errs = [];
  page.on('pageerror', (e) => errs.push(String(e).slice(0, 80)));
  let status = 0;
  try {
    const r = await page.goto(HOST + p, { waitUntil: 'networkidle', timeout: 35000 });
    status = r?.status();
  } catch (e) { errs.push('nav:' + String(e).slice(0, 60)); }
  await page.waitForTimeout(2500);
  const data = await page.evaluate(() => ({
    session: document.body.classList.contains('session'),
    sections: document.querySelectorAll('main .section').length,
    blocks: document.querySelectorAll('main [class][data-block-status="loaded"], main .block-content > div').length,
    h1: document.querySelectorAll('h1').length,
    headerLinks: document.querySelectorAll('header a').length,
    footerLinks: document.querySelectorAll('footer a').length,
    imgs: document.images.length,
    brokenImgs: [...document.images].filter((i) => i.complete && i.naturalWidth === 0).length,
    heroSlides: document.querySelectorAll('.hero-carousel .hc-slide').length,
    cards: document.querySelectorAll('.cards .card').length,
  }));
  console.log(`${status} ${p}  session=${data.session} sections=${data.sections} h1=${data.h1} hdr=${data.headerLinks} ftr=${data.footerLinks} imgs=${data.imgs} broken=${data.brokenImgs} slides=${data.heroSlides} cards=${data.cards} errs=${errs.length}${errs.length ? ' :: ' + errs.join('|') : ''}`);
  await ctx.close();
}
await browser.close();
