<!--
_provenance:
  writtenBy: stardust:prototype
  writtenAt: 2026-06-28
  readArtifacts:
    - stardust/current/pages/home.json
    - stardust/current/_brand-extraction.json
    - DESIGN.md
    - DESIGN.json
    - stardust/direction.md
    - stardust/prototypes/home-improvements.md
  capturedSourceLineage: per-section below
  surprise: low
  signatureElements:
    - kind: animated-stat-counter
      capturedSource: pages/home.json#headings "0 1 2 3 4 5 6 7 % back"
      mechanism: count-up on scroll into view
      fallback: static final number; prefers-reduced-motion shows final value
  antiTemplatePass:
    - pattern: hero
      defaultReflex: centered-stack + dual primary CTA
      alternatives: [left-anchored full-bleed photo overlay, split 5/3 photo]
      picked: left-anchored full-bleed photo with scrim
      rationale: improvements #5 — give captured lifestyle photo full-bleed
    - pattern: rewards-stats
      defaultReflex: three feature cards
      alternatives: [animated count-up stat row, single big number]
      picked: animated count-up stat row
      rationale: signature motion preservation (stat counters)
  substrateTransitions:
    default: white
    exceptions:
      - navy band for safety/privacy section (captured white-on-navy trust band)
  voiceClassification: captured-verbatim for all hero/section copy
  copyCadenceBypass:
    rules: [em-dash-overuse, marketing-buzzword]
    basis: captured-verbatim brand copy (Mode A)
-->

# Shape — home

**Register:** brand. **Surprise:** low (brand-faithful + improvements +
signature preservation). **Mode A.**

## Sections (in order)

1. **header** — system-component (from _brand-extraction.json). Logo (real
   PayPal SVG), Personal/Business toggle, primary nav (Personal Banking,
   Send & Request, Business, Help), Log In + Sign Up pill. Mobile hamburger.
2. **hero** — captured: home.json#headings[0] "Pay, send, and save smarter" →
   promote to single **h1** (improvements #3). Sub: tagline (meta desc).
   Full-bleed lifestyle photo (captured hero img) + scrim, left-anchored
   headline. One primary pill "Get the app" / "Sign Up", secondary text-link.
3. **shop** — captured: "Shop in stores and online" + Debit Card body. Photo
   card + copy.
4. **rewards** — captured: "Get rewards from the brands you love" + the two
   cashback stats. Render as **animated count-up stat row** ("Up to 7% back",
   "+5% back") — signature motion; NOT raw digit-ladder (improvements #1).
5. **pay-over-time** — captured: "Pay now or pay over time. It's your choice."
   Pay in 4 / Pay Monthly / in-store / Cashback Mastercard / Credit cards as
   a feature grid (12px radius cards), one secondary link each.
6. **safety** — captured: "Safety and privacy are our priority" — navy band,
   white text, trust copy. Substrate exception (named).
7. **send-receive** — captured: "Send money to just about anyone, anywhere" +
   Send/Receive/Split/Pool quartet.
8. **save-invest** — captured: "Make your money work harder", Savings 3.30%
   APY, "Crypto the easy way". Card rail.
9. **app-cta** — captured: "All in the PayPal app" — closing conversion band,
   app store badges / Sign Up pill.
10. **footer** — system-component. Column nav (Personal, Business, Products,
    Company, Help) linking to migrated pages; legal row; logo.

## Layout strategy
Single white substrate with one navy trust band. Photographic heroes/cards
(12px radius), pill CTAs, generous 64px section rhythm. Stat counters animate
on scroll-in with reduced-motion fallback.

## Heading hierarchy
One h1 (hero). Section openers h2. Card titles h3.

## Unsourced content
- App store badge links (Apple/Google) — placeholder href to store pages.
- Footer column link targets resolved at migrate to /paypal/... local paths.
