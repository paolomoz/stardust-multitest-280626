#!/bin/bash
set -u
ROOT=/Users/paolo/stardust/rollout/multitest-280626/samsung
cd "$ROOT" || exit 1
CURL=/usr/bin/curl
HOST=https://site-samsung--stardust-multitest-280626--paolomoz.aem.live
pass=0; warn=0
echo "=== Rendered .plain.html verification (LIVE tree) ==="
while IFS= read -r f; do
  rel=${f#content/}; src=${rel%.html}
  web="$src"; [ "$src" = "samsung/index" ] && web="samsung/"
  body=$("$CURL" -s --compressed "$HOST/$web.plain.html" 2>/dev/null)
  [ "$src" = "samsung/index" ] && body=$("$CURL" -s --compressed "$HOST/samsung/index.plain.html" 2>/dev/null)
  code=$("$CURL" -s -o /dev/null -w '%{http_code}' --compressed "$HOST/$src.plain.html")
  err=$(printf '%s' "$body" | grep -c 'about:error')
  imgs=$(printf '%s' "$body" | grep -oc '<img')
  blocks=$(printf '%s' "$body" | grep -oE 'class="(hero|cards|category-tiles|feature-band|support-links|article-header|article-body)"' | sort -u | wc -l | tr -d ' ')
  if [ "$code" = "200" ] && [ "$err" = "0" ]; then
    pass=$((pass+1)); echo "OK   $src  (img=$imgs blocks=$blocks)"
  else
    warn=$((warn+1)); echo "WARN $src  (code=$code err=$err)"
  fi
done < <(find content/samsung -name '*.html' | sort)
echo "=== plain.html: pass=$pass warn=$warn ==="
