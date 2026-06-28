import { chromium } from 'playwright';
import fs from 'fs';
const BASE='/Users/paolo/stardust/rollout/multitest-280626/sony/stardust/current';
const PAGES=[
 ['message','https://www.sony.com/en/SonyInfo/message/'],
 ['privacy','https://www.sony.com/en/privacy/'],
 ['news-press','https://www.sony.com/en/SonyInfo/News/Press/'],
 ['about','https://www.sony.com/en/SonyInfo/CorporateInfo/'],
 ['design','https://www.sony.com/en/SonyInfo/design/'],
 ['technology','https://www.sony.com/en/SonyInfo/technology/'],
];
const browser=await chromium.launch({headless:false,channel:'chrome'});
const ctx=await browser.newContext({viewport:{width:1440,height:900},ignoreHTTPSErrors:true});
const out={};
for(const [slug,url] of PAGES){
 const page=await ctx.newPage();
 try{
  await page.goto(url,{waitUntil:'domcontentloaded',timeout:45000});
  await page.evaluate(()=>{try{window.OneTrust&&window.OneTrust.RejectAll&&window.OneTrust.RejectAll();}catch(e){}});
  await page.waitForTimeout(1200);
  // remove onetrust + cookie DOM, nav, header, footer
  const data=await page.evaluate(()=>{
   ['#onetrust-consent-sdk','#onetrust-banner-sdk','.onetrust-pc-dark-filter','[id*="onetrust" i]','[class*="ot-" i]'].forEach(s=>document.querySelectorAll(s).forEach(e=>e.remove()));
   const main=document.querySelector('main')||document.querySelector('#main')||document.querySelector('article')||document.body;
   const clone=main.cloneNode(true);
   clone.querySelectorAll('header,nav,footer,script,style,.gnav,#gnav,[class*="header" i],[class*="footer" i],[class*="breadcrumb" i]').forEach(e=>e.remove());
   // paragraphs and headings in order
   const blocks=[];
   clone.querySelectorAll('h1,h2,h3,h4,p,li').forEach(el=>{
     const t=(el.textContent||'').replace(/\s+/g,' ').trim();
     if(t&&t.length>2&&!/cookie|consent|vendor/i.test(t)) blocks.push({tag:el.tagName.toLowerCase(),text:t.slice(0,600)});
   });
   return {blocks:blocks.slice(0,120)};
  });
  out[slug]=data;
  console.error('OK',slug,data.blocks.length,'blocks');
 }catch(e){console.error('FAIL',slug,String(e).slice(0,80));out[slug]={error:String(e).slice(0,80)};}
 await page.close();
}
fs.writeFileSync(`${BASE}/_content-refetch.json`,JSON.stringify(out,null,2));
await browser.close();
console.error('DONE');
