<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-28
  readArtifacts: [stardust/current/pages/home.json, stardust/current/_brand-extraction.json, DESIGN.md, DESIGN.json, stardust/direction.md]
  capturedSourceLineage: see ## Sections
  surprise: low
  signatureElements: [{kind: brand-flagscape-logo, capturedSource: header css-bg, mechanism: inline svg, fallback: text wordmark}]
  voiceClassification: all captured-verbatim except direction-authorized eyebrow labels
-->

# Shape brief — home (Bank of America)

**Surprise budget:** low (brand-faithful + improvements). ia-fidelity: faithful.
**Register:** brand. **Motion:** arrival (restrained entrance fades).

## Sections (each maps to a captured source region)

1. **trust-strip** — site-wide system-component (`_brand-extraction.json#systemComponents.trustStrip`). Thin gray band: "Bank of America deposit products: FDIC-Insured — Backed by the full faith and credit of the U.S. Government".
2. **header** — site-wide system-component. Utility nav (Personal, Wealth Management, Business, Corporations & Institutions | Security, About Us, En espanol, Contact Us, Help), flagscape logo, search, main nav (Checking, Savings & CDs, Credit Cards, Home Loans, Auto Loans, Merrill Investing, Better Money Habits), Sign-in.
3. **hero** — captured `pages/home.json#landmarks[hero]`. Navy→royal-blue gradient band. Headline "Choose the card that works for you". Left: compact Sign-in / "Open an account" affordance. Right: 4-card credit-card showcase with real card renditions + offer numerals (6% / 2% / 1.5 / 0%, "No annual fee"), CTA per card.
4. **product-grid (deposits/checking)** — captured H2 "Stay flexible with Bank of America Advantage Banking" + "Savings made simple and rewarding". 2–3 cards: checking, savings, fees. CTA "Explore checking solutions".
5. **credit-cards-band** — captured H2 "Find the perfect credit card from among our most popular options". Card grid + "Shop all credit cards".
6. **investing** — captured H2 "Reinventing what it means to be a confident investor" (Merrill). Image + copy + CTA.
7. **better-money-habits** — captured H2 "Videos and tips to better manage your financial life". 3-up editorial card grid. CTA "Visit BetterMoneyHabits.com".
8. **mobile-app** — captured "Get the Mobile Banking app". App promo with real lifestyle image.
9. **footer** — site-wide system-component. Product columns + legal (Privacy, Security, Online Privacy Notice, Equal Housing) + FDIC + copyright.

## Anti-template pass
- Hero: NOT centered-stack + dual CTA. Use split: brand login/benefit left, card showcase grid right (mirrors captured shape, which IS the brand signature).
- Card grids: consistent image-top card component with badge + benefit + single CTA.
- Substrate: white default; one navy/blue hero band + one alt `#f4f6f8` band. ≤2 transitions.

## Real imagery (all verified 200)
- Logo: stardust/current/assets/logo.svg (flagscape)
- Card renditions: card_mh_cust_newcrd2 (Customized Cash Rewards), card_mh_un_newcrd2 (Unlimited Cash Rewards), 5779014_Travel_3 (Travel Rewards), card_mh_bac_no (BankAmericard) — all under www1.bac-assets.com/homepage/spa-assets/images/
- Hero lifestyle: mb_yni_bb_3034668_1440 jpg

## Internal links — prefix /bankofamerica
All internal nav/CTA links must be root-relative with /bankofamerica prefix
(e.g. /bankofamerica/credit-cards/cash-back-credit-cards), no trailing slash.

## Unsourced content
None — all copy/offers are captured-verbatim. Offers shown as captured ("6% cash back offer", "$200 online bonus offer").
