#!/bin/bash
set -u
cd /Users/paolo/stardust/rollout/multitest-280626/sony
source .env
ORG=paolomoz; REPO=stardust-multitest-280626; BRANCH=site-sony
SAN=/Users/paolo/stardust/source/230626/skills/plugins/stardust/skills/deploy/scripts/sanitise.js
CURL=/usr/bin/curl
NODE=$(which node)

PAGES=(index products about design technology message news-press privacy sustainability careers investor-relations contact copyright web-accessibility-statement about-this-site sitemap)

for slug in "${PAGES[@]}"; do
  f="content/sony/$slug.html"
  "$NODE" "$SAN" "$f" >/dev/null 2>&1
  put=$("$CURL" -s -o /dev/null -w "%{http_code}" -X PUT -H "Authorization: Bearer $DA_TOKEN" \
    -F "data=@$f;type=text/html" \
    "https://admin.da.live/source/$ORG/$REPO/sony/$slug.html")
  prev=$("$CURL" -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: Bearer $DA_TOKEN" \
    "https://admin.hlx.page/preview/$ORG/$REPO/$BRANCH/sony/$slug")
  live=$("$CURL" -s -o /dev/null -w "%{http_code}" -X POST -H "Authorization: Bearer $DA_TOKEN" \
    "https://admin.hlx.page/live/$ORG/$REPO/$BRANCH/sony/$slug")
  echo "PUT=$put PREVIEW=$prev LIVE=$live  $slug"
done
echo "DEPLOY COMPLETE"
