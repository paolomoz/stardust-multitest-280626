# EDS Conversion Log — Sony Group Portal

## Runtime
- Vanilla aem-boilerplate → AuthorKit runtime ported from sibling repo (paramount), carrying both
  mandatory edits (lazy.js footer-import removed; postlcp.js `el.className = name`).
- head.html: AuthorKit head + Sony Organization/WebSite JSON-LD.

## Foundation (styles/styles.css)
- Tokens: monochrome (#000 chrome/ink, #fff bg, #656565 muted, #f5f5f5/#efefef surfaces, #0a5eb2 link).
- Self-hosted SST (Sony's proprietary corporate typeface) — sst-roman.woff2 + sst-bold.woff2.
  LICENSING ALERT: SST is proprietary; confirm embedding rights before production aem.live.
- body.session font gating (Arial metric-matched fallback → SST).
- Button system (.btn / .btn-primary / .btn-secondary), section scaffold, header min-height reservation.

## Blocks (one per distinct prototype section)
- `hero-carousel` — home rotating story hero (auto-rotate 6s, dots+arrows, reduced-motion pause, scrim).
- `banner` — full-bleed page hero (KV image behind H1 + lede); `.banner-noimg` variant = clean dark band.
- `cards` — story/initiative grid; variants `.cards.news` (16:9) and `.cards.initiatives` (3:2);
  one-row-per-card with classified cells + flattened single-cell fallback.
- Reused ported: `fragment`, `section-metadata`. Prose handled as EDS default content.

## Chrome (static fragments)
- fragments/header.html — black bar, SONY wordmark, mega-nav, CSS-only hamburger (checkbox hack), /sony/ links.
- fragments/footer.html — social icon row (6 channels) + legal links + copyright.

## Images
- Source images sit behind Akamai (block cross-origin hotlinks). DOWNLOADED on-origin via headed Chrome,
  then UPLOADED to DA Media Bus under /sony/media/, authored as content.da.live `<img>` URLs.
  Ingestion verified: about:error = 0 on all pages.

## Home directory-index gotcha
- Home authored at sony/index → served at `/sony/` (trailing slash, EDS directory index). Bare `/sony` 404s.
  Home/logo links therefore point to `/sony/` (the only trailing-slash link); all document links are slash-free.

## Pages (16): home + products + about + design + technology (section-landing) ·
  message (article) · news-press (listing) · privacy + copyright + web-accessibility-statement +
  about-this-site + sitemap + sustainability + careers + investor-relations + contact (static/nav).

## Deploy contract
- sanitise → PUT (DA Source API) → POST /preview → POST /live (published, not preview-only).
- All 16: PUT 200/201, PREVIEW 200, LIVE 200.
