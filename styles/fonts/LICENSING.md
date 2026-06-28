# Font licensing — REQUIRED before publishing to aem.live

| File | Family | Foundry | Status |
|---|---|---|---|
| SamsungSharpSansBd.woff2 | SamsungSharpSans (Bold) | Samsung / Monotype | PROPRIETARY — license required |
| SamsungSharpSansMd.woff2 | SamsungSharpSans (Medium) | Samsung / Monotype | PROPRIETARY — license required |
| SamsungOneLatinWeb-400.woff2 | SamsungOne (Regular) | Samsung | PROPRIETARY — license required |
| SamsungOneLatinWeb-700.woff2 | SamsungOne (Bold) | Samsung | PROPRIETARY — license required |

These are Samsung's proprietary brand faces, captured from the live site for fidelity.
Do NOT publish to aem.live until embedding/webfont rights are confirmed.
Remove path: delete these woff2 + their @font-face rules in styles/styles.css; the
stacks fall back to the metric-near Arial/Helvetica Neue fallback.
