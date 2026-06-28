#!/usr/bin/env node
// Generate DA body-fragment content pages from captured page JSON + curated config.
import fs from 'node:fs';
import path from 'node:path';

const ROOT = '/Users/paolo/stardust/rollout/multitest-280626/samsung';
const PAGES = path.join(ROOT, 'stardust/current/pages');
const OUT = path.join(ROOT, 'content/samsung');
fs.mkdirSync(OUT, { recursive: true });

const SHARED_TILES = [
  ['Galaxy Smartphones', '/samsung/smartphones/all-smartphones'],
  ['Galaxy Tab', '/samsung/tablets/all-tablets'],
  ['Galaxy Book', '/samsung/computers/galaxy-book'],
  ['Galaxy Watch', '/samsung/watches/all-watches'],
  ['Galaxy Buds', '/samsung/audio-sound/all-audio-sound'],
  ['Galaxy Ring', '/samsung/rings/all-rings'],
  ['TVs', '/samsung/tvs/all-tvs'],
  ['Accessories', '/samsung/accessories'],
];
const SHARED_SUPPORT = [
  ['Order Help', '/samsung/support/order-help', 'Track, change, or get help with an order.'],
  ['Product Help', '/samsung/support/contact', 'Chat with us or browse troubleshooting.'],
  ['Request A Repair', '/samsung/support/service', 'Set up a service for your device.'],
  ['Register A Product', '/samsung/support/register-product', 'Unlock benefits by registering.'],
];

const esc = (s) => String(s || '').replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

function load(slug) {
  const f = path.join(PAGES, slug + '.json');
  return fs.existsSync(f) ? JSON.parse(fs.readFileSync(f)) : null;
}

function pickImage(p, tokens) {
  if (!p) return null;
  const imgs = (p.media.images || []).filter((i) => /images\.samsung\.com|image-us\.samsung\.com/.test(i.src)
    && !/logo|favicon|icon|sprite|placeholder/i.test(i.src) && (i.naturalWidth || 0) >= 600);
  // prefer token match
  for (const t of tokens) {
    const m = imgs.find((i) => new RegExp(t, 'i').test(i.src));
    if (m) return m.src;
  }
  // else largest landscape-ish
  const land = imgs.filter((i) => i.naturalWidth >= i.naturalHeight).sort((a, b) => b.naturalWidth - a.naturalWidth);
  return land[0]?.src || null;
}

function realLede(p, fallback) {
  let d = (p && p.metaDescription) || '';
  d = d.replace(/\s+/g, ' ').trim();
  if (d.length > 40 && d.length < 280 && !/accessor/i.test(d.slice(0, 12))) return d;
  return fallback;
}

function realParas(p, n = 6) {
  if (!p) return [];
  const junk = /coupon|product preferences|remove this product|recommendations for you|shop by category|^buy |block settings|^contents$|^categories$|cookie|privacy policy|^read more$|^share$/i;
  const seen = new Set();
  const out = [];
  p.landmarks.flatMap((l) => l.children).flatMap((c) => c.body || []).forEach((b) => {
    const t = (b || '').replace(/\s+/g, ' ').trim();
    if (t.length > 70 && t.length < 600 && !junk.test(t) && !seen.has(t)) { seen.add(t); out.push(t); }
  });
  return out.slice(0, n);
}

function realSecHeads(p) {
  if (!p) return [];
  return p.headings.filter((h) => h.level === 2 && h.text && h.text.length < 60
    && !/^(shop|buy|view all|samsung|recommended|explore)$/i.test(h.text.trim()))
    .map((h) => h.text.replace(/\s+/g, ' ').trim());
}

function meta(title, desc) {
  return `<div>
<div class="metadata">
<div><div>Title</div><div>${esc(title)}</div></div>
<div><div>Description</div><div>${esc(desc)}</div></div>
</div>
</div>`;
}

function heroBlock(h1, lede, img, cta, ctaLabel, learn, compact) {
  const imgCell = img ? `\n<div><img src="${img}" alt="${esc(h1)}"></div>` : '';
  return `<div>
<div class="hero${compact ? ' compact' : ''}">
<div>${imgCell}
<div><h1>${esc(h1)}</h1></div>
<div>${esc(lede)}</div>
<div><strong><a href="${cta}">${ctaLabel}</a></strong> <em><a href="${learn}">Learn more</a></em></div>
</div>
</div>
</div>`;
}

function articleHeader(eyebrow, h1, deck) {
  return `<div>
<div class="article-header">
<div>
<div><em>${esc(eyebrow)}</em></div>
<div><h1>${esc(h1)}</h1></div>
<div>${esc(deck)}</div>
</div>
</div>
</div>`;
}

function tilesBlock() {
  let rows = '<div><div><h2>Shop by category</h2></div></div>\n';
  rows += SHARED_TILES.map(([l, h]) => `<div><div><a href="${h}">${esc(l)}</a></div></div>`).join('\n');
  return `<div>\n<div class="category-tiles">\n${rows}\n</div>\n</div>`;
}

function supportBlock(surface) {
  let rows = '<div><div><h2>Support &amp; services</h2></div><div><em><a href="/samsung/support">Support home</a></em></div></div>\n';
  rows += SHARED_SUPPORT.map(([l, h, d]) => `<div><div><a href="${h}">${esc(l)}</a></div><div>${esc(d)}</div></div>`).join('\n');
  return `<div>\n<div class="support-links${surface ? ' surface' : ''}">\n${rows}\n</div>\n</div>`;
}

function featureBand(eyebrow, h2, body, cta, ctaLabel, img) {
  const imgCell = img ? `\n<div><img src="${img}" alt="${esc(h2)}"></div>` : '';
  return `<div>
<div class="feature-band">
<div>
<div>${esc(eyebrow)}</div>
<div><h2>${esc(h2)}</h2></div>
<div>${esc(body)}</div>
<div><strong><a href="${cta}">${ctaLabel}</a></strong></div>${imgCell}
</div>
</div>
</div>`;
}

function articleBody(lede, sections, cta) {
  let inner = `<p>${esc(lede)}</p>\n`;
  sections.forEach(([h, body]) => { inner += `<h2>${esc(h)}</h2>\n<p>${esc(body)}</p>\n`; });
  if (cta) inner += `<p><strong><a href="${cta[1]}">${esc(cta[0])}</a></strong></p>\n`;
  return `<div>\n<div class="article-body">\n<div><div>\n${inner}</div></div>\n</div>\n</div>`;
}

function page(...blocks) {
  return `<body>\n<header></header>\n<main>\n${blocks.join('\n')}\n</main>\n<footer></footer>\n</body>\n`;
}

// ---- Config ----
const categories = [
  ['smartphones__all-smartphones', 'smartphones/all-smartphones', 'Explore Galaxy Smartphones', ['galaxy-s', 'zfold', 'zflip', 'fold7', 'flip7', 'smartphone'], '/samsung/smartphones/galaxy-s26-ultra/buy'],
  ['tvs__all-tvs', 'tvs/all-tvs', 'Explore All TVs', ['qn8', 'qn9', 'neo', 'qled', 'oled', '-tv-'], '/samsung/tvs/all-tvs'],
  ['refrigerators__all-refrigerators', 'refrigerators/all-refrigerators', 'Explore Refrigerators', ['refriger', 'bespoke', 'rf9', 'rf2', 'rf3'], '/samsung/refrigerators/all-refrigerators'],
  ['monitors__all-monitors', 'monitors/all-monitors', 'Explore Monitors', ['monitor', 'ls3', 'ls4', 'odyssey'], '/samsung/monitors/all-monitors'],
  ['watches__all-watches', 'watches/all-watches', 'Explore Galaxy Watch', ['watch', 'gwatch', 'r9'], '/samsung/watches/galaxy-watch8/buy'],
  ['accessories', 'accessories', 'Galaxy Accessories', ['accessor', 'case', 'charger', 'cover', 'buds'], '/samsung/accessories'],
  ['tablets__all-tablets', 'tablets/all-tablets', 'Explore Galaxy Tab', ['tab-s', 'galaxy-tab', 'tablet'], '/samsung/tablets/all-tablets'],
  ['audio-sound__all-audio-sound', 'audio-sound/all-audio-sound', 'Explore Galaxy Buds', ['buds', 'r64', 'audio'], '/samsung/audio-sound/all-audio-sound'],
  ['projectors__all-projectors', 'projectors/all-projectors', 'Explore Projectors', ['projector', 'freestyle', 'premiere', 'sp-'], '/samsung/projectors/all-projectors'],
  ['audio-devices__all-audio-devices', 'audio-devices/all-audio-devices', 'Home Theater Systems & Speakers', ['soundbar', 'hw-', 'speaker', 'audio'], '/samsung/audio-devices/all-audio-devices'],
  ['dishwashers__all-dishwashers', 'dishwashers/all-dishwashers', 'Explore Dishwashers', ['dishwash', 'dw8', 'dw9', 'dw6'], '/samsung/dishwashers/all-dishwashers'],
  ['laundry__washers', 'laundry/washers', 'Explore Washers', ['wash', 'laundry', 'wf5', 'wf4', 'wd9'], '/samsung/laundry/washers'],
  ['vacuum-cleaners__all-vacuum-cleaners', 'vacuum-cleaners/all-vacuum-cleaners', 'Explore Vacuums', ['vacuum', 'jet', 'vs2', 'vs9'], '/samsung/vacuum-cleaners/all-vacuum-cleaners'],
  ['memory-storage__all-memory-storage', 'memory-storage/all-memory-storage', 'Explore Memory & Storage', ['ssd', 'memory', 'mu-', 'portable', 't9', 't7'], '/samsung/memory-storage/all-memory-storage'],
  ['computers__galaxy-book', 'computers/galaxy-book', 'Explore Galaxy Book', ['book', 'np9', 'galaxy-book'], '/samsung/computers/galaxy-book'],
];

const features = [
  ['shop', 'shop', 'Shop Samsung', ['shop', 'offer', 'essential', 'kv'], 'Buy Direct', 'Discover the latest Galaxy devices, exclusive offers, and everyday value when you buy direct from Samsung.', '/samsung/why-buy-direct', 'Why buy direct?', 'When you buy direct from Samsung you get more — trade-in deals, exclusive bundles, financing, and Samsung Rewards on every order.'],
  ['smartthings', 'smartthings', 'SmartThings', ['smartthings', 'home', 'kv'], 'Smart Home', 'Connect and control your Samsung devices and your whole home with SmartThings.', '/samsung/ai-living', 'A smarter, more connected home', 'SmartThings brings your devices together so your home works the way you live — automated, energy-aware, and effortlessly connected.'],
  ['ai-living', 'ai-living', 'Your Companion to AI Living', ['ai', 'living', 'kv'], 'Galaxy AI', 'AI Living brings intelligence to every Samsung device, from your phone to your home.', '/samsung/galaxy-ai', 'AI that lives with you', 'From Galaxy AI on your phone to AI-powered appliances, Samsung intelligence adapts to your everyday life.'],
  ['galaxy-ai', 'galaxy-ai', 'Galaxy AI', ['ai', 'galaxy', 'kv'], 'Galaxy AI', 'Galaxy AI is the intelligence built into your Galaxy devices to help you communicate, create, and get more done.', '/samsung/smartphones/all-smartphones', 'Built into every Galaxy', 'Galaxy AI helps you translate calls, edit photos, summarize notes, and more — right on your device.'],
  ['why-buy-direct', 'why-buy-direct', 'Buy Direct From Samsung', ['buy', 'direct', 'kv'], 'Buy Direct, Get More', 'Get exclusive offers, trade-in deals, and Samsung Rewards when you buy direct.', '/samsung/shop', 'More reasons to buy direct', 'Exclusive bundles, the best trade-in values, flexible financing, and rewards on every purchase — only when you buy direct from Samsung.'],
  ['trade-in', 'trade-in', 'Samsung Trade-In', ['trade', 'kv'], 'Trade-In', 'Trade in your old device and save instantly on a new Galaxy.', '/samsung/shop', 'Trade up to the latest Galaxy', 'Get an instant estimate, ship your old device for free, and apply your credit toward something new.'],
  ['rewards', 'rewards', 'Samsung Rewards', ['reward', 'kv'], 'Samsung Rewards', 'Earn points on every purchase and redeem them for Samsung products and more.', '/samsung/shop', 'Earn more with every order', 'Samsung Rewards lets you earn points on purchases and redeem them toward your next Galaxy device, accessory, or service.'],
  ['apps', 'apps', 'Apps & Services', ['app', 'dex', 'notes', 'kv'], 'Apps & Services', 'Do more with Samsung apps and services across your Galaxy devices.', '/samsung/smartphones/all-smartphones', 'Built for the Galaxy ecosystem', 'Samsung Notes, Samsung Health, Samsung DeX, and more — apps and services designed to work seamlessly across your devices.'],
  ['explore', 'explore', 'Explore', ['explore', 'life', 'story', 'kv'], 'Explore', 'Tips, how-tos, and stories to help you get the most from your Samsung devices.', '/samsung/explore', 'Stories and how-tos', 'Browse life hacks, photography tips, and product guides from Samsung Explore.'],
];

const supportPages = [
  ['support', 'support', 'Support', 'Find manuals, downloads, warranty information, and ways to contact Samsung support.'],
  ['support__contact', 'support/contact', 'Contact Us', 'Get help by chat, phone, or by visiting a Samsung service center.'],
  ['support__service', 'support/service', 'Service Center', 'Request a repair or find a Samsung service location near you.'],
  ['support__downloads', 'support/downloads', 'Manuals & Downloads', 'Download manuals, firmware, and software for your Samsung device.'],
];

const corporate = [
  ['about-us__leadership-and-mission', 'about-us/leadership-and-mission', 'About Us', 'Leadership & Mission', 'Learn about Samsung Electronics America — our leadership, mission, and the people behind the products.'],
  ['sustainability', 'sustainability', 'Sustainability', 'Sustainability', 'How Samsung is working toward a more sustainable future for people and the planet.'],
  ['sustainability__environment', 'sustainability/environment', 'Sustainability', 'Environment', 'Samsung’s commitment to environmental responsibility across products and operations.'],
  ['accessibility', 'accessibility', 'Accessibility', 'Accessibility', 'Samsung is committed to making technology accessible to everyone.'],
];

const written = [];
function write(p, html) { const fp = path.join(OUT, p + '.html'); fs.mkdirSync(path.dirname(fp), { recursive: true }); fs.writeFileSync(fp, html); written.push(p); }

// categories
for (const [slug, p, h1, tokens, buyHref] of categories) {
  const j = load(slug);
  const img = pickImage(j, tokens);
  const lede = realLede(j, `Discover the latest ${h1.replace(/^Explore /, '')} from Samsung. Shop direct and get more.`);
  const html = page(
    meta(`${h1} | Samsung US`, lede),
    heroBlock(h1, lede, img, buyHref, 'Shop now', buyHref, false),
    tilesBlock(),
    supportBlock(true),
  );
  write(p, html);
}

// features
for (const [slug, p, h1, tokens, eyebrow, lede, fHref, fH2, fBody] of features) {
  const j = load(slug);
  const img = pickImage(j, tokens);
  const html = page(
    meta(`${h1} | Samsung US`, realLede(j, lede)),
    heroBlock(h1, realLede(j, lede), img, fHref, 'Learn more', fHref, false),
    featureBand(eyebrow, fH2, fBody, fHref, 'Learn more', null),
    supportBlock(false),
  );
  write(p, html);
}

// support
for (const [slug, p, h1, lede] of supportPages) {
  const html = page(
    meta(`${h1} | Samsung US Support`, lede),
    articleHeader('Support', h1, lede),
    supportBlock(false),
  );
  write(p, html);
}

// corporate
for (const [slug, p, eyebrow, h1, lede] of corporate) {
  const j = load(slug);
  const heads = realSecHeads(j);
  const paras = realParas(j, 8);
  const sections = [];
  for (let i = 0; i < Math.min(heads.length, paras.length, 5); i += 1) sections.push([heads[i], paras[i]]);
  if (!sections.length && paras.length) { paras.slice(0, 4).forEach((pa, i) => sections.push([`About ${h1}`.slice(0, 40) + (i ? ` (${i + 1})` : ''), pa])); }
  const blocks = [meta(`${h1} | Samsung US`, lede), articleHeader(eyebrow, h1, lede)];
  if (sections.length) blocks.push(articleBody(paras[0] || lede, sections.slice(0, 5), null));
  write(p, page(...blocks));
}

console.log('Wrote', written.length, 'content pages:');
written.forEach((p) => console.log('  ', p));
