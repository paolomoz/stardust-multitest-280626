# EDS conversion log — Bank of America

## Block name decisions (one prototype <section> = one EDS block)
| Prototype section (data-section) | EDS block | Variants |
|---|---|---|
| trust-strip | (default content, top band) | — |
| header | fragment `/bankofamerica/nav` | — |
| footer | fragment `/bankofamerica/footer` | — |
| hero (home: login+cards) | `hero` | `hero login`, `hero simple` |
| product-grid / credit-cards-band / better-money-habits / cards | `cards` | `cards`, `cards feature` |
| investing / mobile-app (image+text) | `columns` | `columns`, `columns reverse` |
| steps (how-it-works) | `cards` | `cards steps` |
| editorial-cards (trending scams) | `cards` | `cards editorial` |
| flags (red flags) | `cards` | `cards flags` |
| cta-band | `cta` | — |

## Reuse rule
All card-pattern sections collapse into ONE `cards` block with variant classes.
Image+text sections use `columns`. Navy conversion bands use `cta`.
No block named after reserved class (section/default-content/button/wrap).

## Templates
- landing (home), product-landing (cash-back / auto-loans / deposits / compare), editorial-article (avoid-bank-scams).

## Deploy summary (Phase 0/4/8/9 — completed)
- **Runtime:** AuthorKit ported from sibling `starbucks` (both mandatory edits present).
  head.html: BofA favicon + theme-color + Organization/WebSite JSON-LD. Vanilla
  aem.js/delayed.js + boilerplate header/footer/widget removed.
- **Final block inventory:** `hero` (variants: `login` home / default simple),
  `cards` (variants: `feature` / `editorial` / `steps` / `flags` / `links`),
  `columns` (+ `reverse`), `cta-band`. Chrome = static fragments
  `fragments/{header,footer}.html` (CSS-only checkbox mobile nav; non-submitting search).
- **Foundation:** styles/styles.css — BofA tokens, `.btn*` system (AuthorKit strong/em),
  EDS section scaffold, default-content section-head styling, header min-height reservation.
- **Pages delivered (6, all PUT/preview/LIVE 200):**
  /bankofamerica/ (home) · /bankofamerica/credit-cards/cash-back-credit-cards ·
  /bankofamerica/security-center/avoid-bank-scams · /bankofamerica/auto-loans ·
  /bankofamerica/deposits · /bankofamerica/credit-cards/compare-credit-cards
- **Verify (Phase 9):** rendered .plain.html 200 + 1 h1 + 0 about:error on all 6;
  headless render PASS on home + 3 templates (body.session, sections>0, grid=grid
  [no mobile-on-desktop], header+footer injected, 0 broken imgs, 0 pageerror).
- **Link audit (Phase 8):** 6 built targets local (no trailing slash; home = trailing
  slash); all unbuilt nav/footer/in-body links repointed to verified-200 source URLs.
- **What's missing:** only the 6 cap'd pages migrated (extract capped at 6 of ~200);
  nav/footer destinations beyond the 6 bounce to source. No dynamic/query-index blocks
  needed (no listing pages in scope). Alt-section background striping not reproduced
  (minor; cards carry borders/shadows on white).
