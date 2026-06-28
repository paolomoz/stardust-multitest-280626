<!--
_provenance:
  writtenBy: stardust:direct
  writtenAt: 2026-06-28
  readArtifacts: [stardust/current/_brand-extraction.json, stardust/current/pages/home.json]
-->

# Improvements — Bank of America (Mode A, site-wide)

1. **[dated-pattern]** The home hero crams a login panel beside a 4-card credit-card
   showcase on a flat royal-blue block — busy, low-hierarchy. *Fix:* keep the login
   affordance but give the card showcase a calmer navy→blue gradient band with clearer
   numeral hierarchy and one primary CTA per card.

2. **[ia-clutter]** Many near-duplicate CTAs with different verbs (Open an account /
   Get started / Shop all credit cards / Apply). *Fix:* one canonical primary verb per
   surface (Open / Apply / Compare); demote the rest to secondary links.

3. **[contrast/density]** Section bands are visually undifferentiated white-on-white,
   so the page reads as one long scroll. *Fix:* alternate white / `#f4f6f8` bands with
   64px padding to create rhythm.

4. **[cliché]** Credit-card offers shown as raw text overlays. *Fix:* use a consistent
   card component (image-top, badge for "No annual fee"/"NEW OFFER", benefit numeral,
   one CTA).

5. **[missed-opportunity]** Real lifestyle/product photography exists but is small and
   inconsistent. *Fix:* use full-width photography in the hero and editorial card grids
   at consistent aspect ratios.
