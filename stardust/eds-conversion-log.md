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
