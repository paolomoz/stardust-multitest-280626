import { chromium } from 'playwright';
import fs from 'fs';
const DIR='/Users/paolo/stardust/rollout/multitest-280626/sony/stardust/current/assets/media';
const IMGS=[
 ['en_20260626_SpiderMan-BrandNewDayTrailer_image_l.jpg','/en/top/2021/img/en_20260626_SpiderMan-BrandNewDayTrailer_image_l.jpg'],
 ['en_20260626_BRAVIA-ShortFilm_image_l.jpg','/en/top/2021/img/en_20260626_BRAVIA-ShortFilm_image_l.jpg'],
 ['en_20260626_LegacyOfSound_image_l.jpg','/en/top/2021/img/en_20260626_LegacyOfSound_image_l.jpg'],
 ['en_20260626_1000X-BTS_image_l.jpg','/en/top/2021/img/en_20260626_1000X-BTS_image_l.jpg'],
 ['en_20260626_CEV-PortalLink_image_l.png','/en/top/2021/img/en_20260626_CEV-PortalLink_image_l.png'],
 ['en_20260626_SpideyTracker_image_l.jpg','/en/top/2021/img/en_20260626_SpideyTracker_image_l.jpg'],
 ['en_20260626_Yonezu-IRISOUT-MAJ_image_l.jpg','/en/top/2021/img/en_20260626_Yonezu-IRISOUT-MAJ_image_l.jpg'],
 ['en_20260626_SocialReckoningTrailer_image_l.jpg','/en/top/2021/img/en_20260626_SocialReckoningTrailer_image_l.jpg'],
 ['products-mv.png','/en/SonyInfo/products/topassets/img/mv.png'],
 ['product-mobility.png','/en/SonyInfo/products/topassets/img/product-mobility.png'],
 ['product-img01.png','/en/SonyInfo/products/topassets/img/product-img01.png'],
 ['product-img02.png','/en/SonyInfo/products/topassets/img/product-img02.png'],
 ['product-img03.png','/en/SonyInfo/products/topassets/img/product-img03.png'],
 ['product-img04.png','/en/SonyInfo/products/topassets/img/product-img04.png'],
 ['product-img05.png','/en/SonyInfo/products/topassets/img/product-img05.png'],
 ['product-img06.png','/en/SonyInfo/products/topassets/img/product-img06.png'],
 ['message-KV.png','/en/SonyInfo/message/l8qsi60000011s58-img/KV.png'],
 ['about-KV.jpg','/en/SonyInfo/rsslst00000001gl-img/KV_PC.jpg'],
 ['design-mv.png','/en/SonyInfo/design/topassets/img/mv.png'],
 ['technology-mv.jpg','/en/SonyInfo/technology/si5i340000000598-img/copy_of_sony_technology_2nd_pc.jpg'],
];
const browser=await chromium.launch({headless:false,channel:'chrome'});
const ctx=await browser.newContext({ignoreHTTPSErrors:true});
const page=await ctx.newPage();
await page.goto('https://www.sony.com/en/',{waitUntil:'domcontentloaded',timeout:45000});
await page.waitForTimeout(1500);
const res=[];
for(const [name,path] of IMGS){
 try{
  const b64=await page.evaluate(async(u)=>{const r=await fetch(u);if(!r.ok)return 'ERR'+r.status;const buf=await r.arrayBuffer();let bin='';const a=new Uint8Array(buf);for(let i=0;i<a.length;i++)bin+=String.fromCharCode(a[i]);return btoa(bin);},'https://www.sony.com'+path);
  if(b64.startsWith('ERR')){res.push([name,b64]);console.error('FAIL',name,b64);continue;}
  fs.writeFileSync(`${DIR}/${name}`,Buffer.from(b64,'base64'));
  res.push([name,fs.statSync(`${DIR}/${name}`).size]);
  console.error('OK',name,fs.statSync(`${DIR}/${name}`).size);
 }catch(e){res.push([name,String(e).slice(0,60)]);console.error('FAIL',name,e);}
}
await browser.close();
console.error('DONE',res.filter(r=>typeof r[1]==='number').length,'/',IMGS.length);
