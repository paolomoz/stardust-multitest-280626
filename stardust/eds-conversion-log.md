# EDS Conversion Log — Starbucks

## Target
- DA: paolomoz/stardust-multitest-280626, subfolder /starbucks/
- Branch: site-starbucks; delivery host: https://site-starbucks--stardust-multitest-280626--paolomoz.aem.live/starbucks/

## Runtime
AuthorKit runtime ported from sibling site (paramount) — ak.js/lazy.js/postlcp.js/scripts.js + utils, deps, tools. Both mandatory edits confirmed present (lazy.js: no utils/footer import; postlcp.js: el.className=name). Boilerplate (aem.js, delayed.js, demo blocks, header/footer blocks, fonts.css, lazy-styles.css) removed.

## Blocks (4 brand + fragment + section-metadata)
- hero — page lead. Variants: default (full-bleed photo + left scrim) / compact (deep-green band, no photo). Flatten-tolerant cell collector; single <h1>.
- cards — responsive grid. Variants: promo (image-top editorial, 3-up) / products (circular image + name, 4-up) / links (cream text tiles, 5-up). One row per card; whole-card link.
- cta-band — cream band: heading + CTA pill.
- feature — split: deep-green copy half + image half.

## Chrome
Static fragments fragments/header.html + footer.html. CSS-only mobile nav (checkbox-hack, no JS — fragments inject via innerHTML so <script> is inert). Header height reserved in styles.css (min-height 68px) to avoid CLS. Real favicon (Siren green SVG) + apple-touch-icon.

## Type
Brand face is proprietary SoDo Sans (not redistributable / not obtainable) — used humanist-sans fallback stack ('Helvetica Neue', Helvetica, Arial). No webfont => no CLS swap, no licensing risk. Brand carried by color + photography + layout. Documented gap.

## Content
23 pages, all real captured content + real imagery (content-prod-live, cloudassets, weblx). Home folder-index served at /starbucks/ (trailing slash). Image-fidelity: every authored <img> verified 200 before authoring; 403 renditions replaced with confirmed-200 captured products.

## Content gaps (graceful, not fabricated)
- /menu/food/snacks: SPA capture returned 0 products + leaked global h1; rendered as thin hero+cta-band, h1 corrected to "Snacks" from URL.

## Verification (Phase 9)
- .plain.html: 23/23 = 200
- Headless render (8 templates): all PASS — 200, body.session, exactly 1 h1, images load, 0 about:error, 0 pageerror.
- Link audit: all internal /starbucks links resolve 200 on live tree.
