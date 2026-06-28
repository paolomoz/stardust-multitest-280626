import { chromium } from 'playwright';
import fs from 'fs';
const BASE='/Users/paolo/stardust/rollout/multitest-280626/sony/stardust/current';
const browser = await chromium.launch({ headless: false, channel: 'chrome' });
const ctx = await browser.newContext({ ignoreHTTPSErrors:true });
const page = await ctx.newPage();
await page.goto('https://www.sony.com/en/', { waitUntil:'domcontentloaded', timeout:45000 });
await page.waitForTimeout(1500);
const assets = [
  ['https://www.sony.com/en/template/2023/img/logo.svg','assets/logo.svg'],
  ['https://www.sony.com/en/top/2021/img/en_20260626_SpiderMan-BrandNewDayTrailer_image_l.jpg','assets/media/hero-spiderman.jpg'],
];
for (const [u,p] of assets) {
  try {
    const b64 = await page.evaluate(async (url)=>{
      const r = await fetch(url); const buf = await r.arrayBuffer();
      let bin=''; const bytes=new Uint8Array(buf); for(let i=0;i<bytes.length;i++) bin+=String.fromCharCode(bytes[i]);
      return btoa(bin);
    }, u);
    fs.writeFileSync(`${BASE}/${p}`, Buffer.from(b64,'base64'));
    console.error('saved', p, fs.statSync(`${BASE}/${p}`).size);
  } catch(e){ console.error('fail', u, String(e).slice(0,80)); }
}
await browser.close();
