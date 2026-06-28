import { chromium } from 'playwright';
const url = process.argv[2];
const b = await chromium.launch({headless:true});
const p = await b.newPage();
const errs=[]; p.on('pageerror',e=>errs.push(String(e)));
await p.goto(url,{waitUntil:'networkidle',timeout:45000});
await p.waitForTimeout(1500);
const r = await p.evaluate(()=>({
  bodySession: document.body.classList.contains('session'),
  sections: document.querySelectorAll('main .section').length,
  blocks: [...document.querySelectorAll('[data-block-name]')].map(b=>b.dataset.blockName),
  h1: document.querySelectorAll('h1').length,
  h1text: document.querySelector('h1')?.textContent.trim().slice(0,40),
  imgs: document.querySelectorAll('img').length,
  brokenImgs: [...document.querySelectorAll('img')].filter(i=>i.complete&&i.naturalWidth===0).length,
  headerLinks: document.querySelectorAll('header a').length,
  footerLinks: document.querySelectorAll('footer a').length,
}));
console.log(JSON.stringify(r,null,1));
console.log('pageerrors:',errs.length, errs[0]?errs[0].slice(0,120):'');
await b.close();
