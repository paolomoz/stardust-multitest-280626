# EDS Conversion Log — PayPal

Block-name locking (one prototype `<section>` = one EDS block, same-pattern
sections collapsed to one block + variant). Reserved names avoided
(`section`, `default-content`, `button`, `wrap`).

## Chrome (fragments, not blocks)
- **header** — static fragment (nav.html). Logo, Personal/Business toggle,
  primary nav, Log In/Sign Up, CSS hamburger.
- **footer** — static fragment (footer.html). 4 column nav + legal + logo.

## Blocks
| Block | Variants | Source sections | Pattern |
|-------|----------|-----------------|---------|
| `hero` | default, `interior` (page-hero navy) | home hero; all interior page-heros | full-bleed photo + scrim OR navy gradient band |
| `feature-split` | default | home shop; checkout benefits | 2-col copy + image |
| `stat-row` | default | home rewards | animated count-up stats (signature motion) |
| `cards` | default, `quartet`, `compact` | home pay-over-time, save-invest, send-receive; checkout code-options; cshelp recommended; contact help-options | responsive card grid |
| `quote-band` | navy | checkout quote; home safety (navy variant) | navy testimonial / trust band |
| `fee-table` | default | paypal-fees tables; checkout pricing compare | bordered data table w/ caption |
| `cat-cards` | default | brc-index categories; money-hub topics | image-led category cards |
| `prose` | default | brc-article, cshelp article body | long-form article text |
| `cta-band` | default | home app-cta | closing conversion gradient band |

Note: `cards`, `quote-band` collapse multiple same-pattern sections.
`stat-row` carries the brand signature (animated counters).
All block CSS scoped as `.<name> ...` (NOT `.<name>.block`) per AuthorKit
runtime; CTAs target `.btn*`.

## Deploy outcome (Phase 5-9)
- 13 content pages deployed to DA under /paolomoz/stardust-multitest-280626/paypal/ — all PUT=201, PREVIEW=200, LIVE=200 (published live).
- Delivery host: https://site-paypal--stardust-multitest-280626--paolomoz.aem.live/paypal/
- Home served at /paypal/ (trailing slash) — subfolder site-root; bare /paypal 404s (EDS folder-index behavior). Header home links use /paypal/.
- All 13 internal nav targets verified 200; no .html, no stray trailing slashes (except site-root home). External bounces: signup/signin/offers/contact to paypal.com (no local equivalent).
- Phase 9: every .plain.html 200, 0 about:error; headless render PASS on home + 7 templates (session present, blocks decorated, 1 h1, 0 broken imgs, 0 pageerrors, header/footer fragments injected).
- Blocks: hero (+interior), split, stats (animated counter signature), cards (+quartet), band (safety/quote/cta), fee-table, media-cards. No dynamic/query-index blocks (no listing feed needed at this volume).
