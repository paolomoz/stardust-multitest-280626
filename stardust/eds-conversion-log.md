# EDS Conversion Log — Samsung US

Runtime: AuthorKit (ported from a known-good snapshot with both mandatory edits:
lazy.js footer-import removed, postlcp.js `el.className = name`). Vanilla
aem-boilerplate boilerplate files removed (aem.js, delayed.js, header/footer/
cards/columns/widget blocks, fonts.css, lazy-styles.css).

## Blocks (7)
| block | role | authoring shape |
|---|---|---|
| hero | full-bleed product hero (img + h1 + lede + CTA over scrim); dark-gradient fallback + `compact` variant for type-led pages | one cell: img, h1, lede `<p>`, CTA `<p>` (`<strong><a>`/`<em><a>`) |
| category-tiles | "shop by category" chip row | head row (h2) + one link row per category |
| cards | responsive product-card grid (2→4 up) | head row + one row per card (img, h3, desc, CTA) |
| feature-band | dark promo band (eyebrow, h2, body, CTA, img) | one cell |
| support-links | quick-link card grid | head row (h2) + one link+desc row per card |
| article-header | type-led editorial hero (eyebrow, h1, deck) on dark band | one cell |
| article-body | long-form prose (lede, h2 sections, CTA) | ONE cell holding all `<p>`/`<h2>` siblings (single-cell — multi-row flattens to default content) |

Chrome: static `fragments/header.html` (CSS-only checkbox-hack mobile nav, no
inline JS) + `fragments/footer.html`. Real favicon from source. Self-hosted
Samsung brand fonts (SamsungSharpSans + SamsungOne) with a LICENSING ALERT
(proprietary — see styles/fonts/LICENSING.md).

## Foundation (styles/styles.css)
Tokens from prototype `:root` (white/#f7f7f7/#000/#2189ff/#1428a0, 20px radius,
SamsungSharpSans/SamsungOne). EDS section scaffold scoped to `.block-content`
(no `.block` selector per AuthorKit). Global button system targets `a.btn` /
`.btn-primary` / `.btn-secondary` (AuthorKit decorateButton). Header CLS reserve.
`main .section:empty{display:none}` collapses the empty page-metadata section.

## Templates → pages (34)
- home (1): hero + category-tiles + cards + feature-band + support-links
- category-landing (15): hero(img) + category-tiles + support-links
- feature/commerce (9): hero(img) + feature-band + support-links
- support (4): article-header + support-links
- corporate (4): article-header + article-body (real captured prose)
- editorial-article (1): article-header + article-body

## Decisions / learnings
- Home (folder index `samsung/index`) serves at `/samsung/` WITH trailing slash;
  leaf docs serve without. Home/logo link uses `/samsung/`.
- Image fidelity: authored real Samsung CDN image URLs (verified 200; all ingest
  cleanly to Media Bus, 0 about:error). Token-matched per category.
- Link audit: non-migrated buy/account links localized to delivered landings;
  business/rings/xr bounced to source URLs (bounce beats 404).
- article-body / prose blocks MUST be single-cell or the pipeline strips the
  block class (logged as a general finding).
