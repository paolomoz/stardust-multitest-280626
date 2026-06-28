---
colors:
  background: "#FFFFFF"
  surface: "#F7F0E4"
  surfaceDeep: "#1E3932"
  text: "#1A1A1A"
  textMuted: "#4A4A4A"
  primary: "#00754A"
  primaryDark: "#006442"
  accent: "#CBA258"
typography:
  heading: "'SoDo Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  body: "'SoDo Sans', 'Helvetica Neue', Helvetica, Arial, sans-serif"
  scaleRatio: 1.25
rounded: "lg"
spacing:
  base: "4pt"
  sectionPadding:
    desktop: "64px"
    tablet: "48px"
    mobile: "32px"
components: [button-primary, button-secondary, card, input, badge, link]
---
# DESIGN — Starbucks (target)

## Overview
A faithful, modernized expression of the Starbucks consumer brand: white-ground,
photography-led, Siren-green action color, with cream (#F7F0E4) and deep forest
green (#1E3932) editorial bands for warmth. Balanced density, pill CTAs, large
rounded product cards in responsive category grids.

## Color
- **Ground:** white (#FFFFFF). Warm cream (#F7F0E4) and deep green (#1E3932) for alternating editorial bands.
- **Action:** Siren green #00754A (primary), #006442 (hover/dark). Gold #CBA258 sparingly for premium accents.
- **Text:** #1A1A1A primary, #4A4A4A muted. AA on white and on cream.

## Typography
- Family: SoDo Sans with humanist-sans fallback. Heading and body share the family.
- Scale ratio 1.25. Mixed-case headlines; uppercase only for short nav/eyebrow labels and CTAs.

## Spacing & Layout
- 4pt base. Balanced section rhythm: 64 / 48 / 32px desktop/tablet/mobile.
- One dominant hero per page, then categorized card grids. Max content width ~1280px.

## Components
- **button-primary:** Siren-green pill, white label, ~24px radius.
- **button-secondary:** outline/ghost pill, green label.
- **card:** white, ~16px radius, soft shadow, image-top.
- **badge:** small pill for "New"/category tags.
- **link:** green underline-on-hover.

## Motion
Gentle: fade-up on scroll for cards, soft hover lift on cards/buttons. Respect `prefers-reduced-motion`. No scroll-jacking.
