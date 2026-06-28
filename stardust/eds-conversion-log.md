# EDS conversion log — Xfinity

## Block roster (one prototype section = one block; same-pattern collapsed to variants)
| Block | Purpose | Variants | From template(s) |
|-------|---------|----------|------------------|
| `hero` | Page hero: eyebrow + h1 + body + CTAs + optional image | `dark`, `gradient`, `split`, `has-media` | all |
| `tiles` | Offer/deal/card grid (signature merchandising) | `two`/`three`/`four`, `editorial` | home, learn-listing, hub-overview |
| `feature` | Alternating text/image feature rows | `reverse`, auto-flip | product-landing, local, detail |
| `compare` | Competitor comparison table | — | compare |
| `cta-band` | Full-width gradient CTA band | `dark` | all (closing CTA) |
| `rail` | Compact proof/stat strip | — | (available; reserved) |

Default content (headings + p + buttons) handles prose-heavy sections (hub-article, legal-static) via global CSS — no dedicated `prose` block needed.

## Naming notes
- No block named after a reserved class (`section`, `default-content`, `button`, `wrap`).
- AuthorKit conventions honored: block CSS scoped as `.<name>` (never `.<name>.block`); CTAs styled on `.btn`/`.btn-primary`/`.btn-secondary`/`.btn-accent` (ak.js decorator from `<strong>`/`<em>` links); empty page-metadata section collapsed via `main .section:empty{display:none}`; header CLS reserve on bare `<header>`.

## Chrome
- `fragments/header.html` — mega-nav distilled from captured `xc-header` (149 links → 6 top-level + sign-in + shop CTA); mobile nav via `:target` CSS (no inline script, per innerHTML injection rule).
- `fragments/footer.html` — 4-column footer from captured `xc-footer` (62 links); company links bounce to corporate.comcast.com (no local equivalent).
- Logo: inline SVG wordmark (real logo not capturable — web-component glyph; see findings). favicon.ico = real captured brand mark.

## Templates (9) → pages (23)
home(1) · product-landing(12) · learn-listing(3) · learn-detail(1) · hub-overview(2) · hub-article(1) · local(1) · compare(1) · legal-static(1)
