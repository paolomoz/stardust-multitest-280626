#!/bin/bash
# Deploy all content/samsung/**.html → DA: sanitise, PUT, preview, live.
set -u
ROOT=/Users/paolo/stardust/rollout/multitest-280626/samsung
cd "$ROOT" || exit 1
source .env
CURL=/usr/bin/curl
NODE=$(command -v node)
ORG=paolomoz; REPO=stardust-multitest-280626; BRANCH=site-samsung
LOG="$ROOT/stardust/_deploy.log"
: > "$LOG"
ok=0; fail=0
while IFS= read -r f; do
  rel=${f#content/}            # samsung/...
  src=${rel%.html}            # samsung/path (no ext)
  "$NODE" skills/deploy/scripts/sanitise.js "$f" >/dev/null 2>&1
  put=$("$CURL" -s -X PUT -H "Authorization: Bearer $DA_TOKEN" -F "data=@$f;type=text/html" -o /dev/null -w '%{http_code}' "https://admin.da.live/source/$ORG/$REPO/$src.html")
  prev=$("$CURL" -s -X POST -H "Authorization: Bearer $DA_TOKEN" -o /dev/null -w '%{http_code}' "https://admin.hlx.page/preview/$ORG/$REPO/$BRANCH/$src")
  live=$("$CURL" -s -X POST -H "Authorization: Bearer $DA_TOKEN" -o /dev/null -w '%{http_code}' "https://admin.hlx.page/live/$ORG/$REPO/$BRANCH/$src")
  if [ "$put" = "201" ] && [ "$prev" = "200" ] && [ "$live" = "200" ]; then
    echo "OK   $src (PUT $put PREV $prev LIVE $live)" | tee -a "$LOG"; ok=$((ok+1))
  else
    echo "FAIL $src (PUT $put PREV $prev LIVE $live)" | tee -a "$LOG"; fail=$((fail+1))
  fi
done < <(find content/samsung -name '*.html' | sort)
echo "DONE ok=$ok fail=$fail" | tee -a "$LOG"
