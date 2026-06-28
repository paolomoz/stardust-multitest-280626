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
