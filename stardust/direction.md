<!-- _provenance: stardust:direct — resolved direction + reasoning trace. -->
# Direction — Samsung US

## Active

**Phrase:** "Faithful redesign, modernized."

**Resolved at:** 2026-06-28

### Restatement (dimensional vocabulary)
A brand-faithful refresh of an existing `signal-strong` commerce site. The user wants the same Samsung identity executed to a competent 2026 standard — not a rebrand.

### Mode detection
- Captured brand signal: **signal-strong** (palette has ≥3 distinct roles incl. Samsung blue; named type families SamsungSharpSans + SamsungOne captured as woff2).
- No rebrand trigger in phrase; `--rebrand` not passed.
- **Mode A (brand-faithful) active.** Palette and type pinned to the captured surface; image-reuse contract holds (reuse Samsung CDN product imagery at same semantic position); signature hero motion reproduced.

### Movements
- expressive: restrained → committed (bolder display type usage)
- distinctiveness: familiar → distinctive (lean into SamsungSharpSans display)
- tone: unchanged (confident/aspirational)
- density: **balanced (default)** — brand register, multi-audience (>5 sections, >2 audience tracks) → hard floor 40–64px honored; sectionPadding desktop 64px
- ia-fidelity: **reimagined (default)**, but constrained — preserve commercial-conversion + audience-routing IA priorities (mutability: movable)

### Divergence (brand-faithful mode)
```
decade           inherited   → 2025-now
register         inherited   → brand / product-commerce
ground-family    inherited   → stark-white (#ffffff)  [override: brand-faithful]
font deck        inherited   → SamsungSharpSans / SamsungOne
palette          inherited   → white / f7f7f7 / black / #2189ff / #1428a0
motion register  selected    → kinetic-grid (product/modular-catalogue/transactional)
```

### Brand-faithful inversions (the "obvious fixes")
1. Promote text-in-image to real semantic headings (a11y + SEO).
2. Replace primary carousel with a responsive product-card grid.
3. Standardize CTA: one black primary pill + one blue text link per section.

(See stardust/prototypes/home-improvements.md for the full 5-item improvements list.)

### Command sequence
extract ✓ → direct ✓ → prototype (home + 1/template) → migrate → deploy → rollout

### Assumptions defaulted in
- density: balanced (phrase did not move axis; brand register default + multi-audience floor)
- ia-fidelity: reimagined with IA-priority preservation
- single canonical variant (no approval gate, per run instructions)
