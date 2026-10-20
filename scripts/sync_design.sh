#!/usr/bin/env bash
#
# porest-design 의 토큰을 이 레포로 가져온다 — css/tokens*.css 는 손으로 고치지 않는다.
#
#   css/tokens.css       ← DESIGN.md      (공통: 글꼴 · 글자 · 간격 · 모서리 · 중립색 · 역할색)  :root
#   css/tokens.hr.css    ← DESIGN.hr.md   (이음 브랜드색)                                         .theme-hr
#   css/tokens.desk.css  ← DESIGN.desk.md (담다 브랜드색)                                         .theme-desk
#
# 디자인 시스템이 내보내는 Tailwind v4 `@theme { }` 의 첫 블록(라이트 값)만 가져와 선택자만 바꾼다.
# 값은 한 글자도 안 건드린다. 값을 바꾸려면 porest-design 원본을 고친다.
#
# porest-design 은 옆 폴더(../porest-design)라고 본다. 다르면 PORESTDESIGN_DIR 로 알려 준다.
#
# 사용: scripts/sync_design.sh
set -euo pipefail

ROOT="$(cd "$(dirname "${BASH_SOURCE[0]}")/.." && pwd)"
DESIGN_DIR="${PORESTDESIGN_DIR:-../porest-design}"
case "${DESIGN_DIR}" in
  /*) ;;
  *) DESIGN_DIR="${ROOT}/${DESIGN_DIR}" ;;
esac
[ -f "${DESIGN_DIR}/DESIGN.md" ] || { echo "porest-design 을 찾지 못했다: ${DESIGN_DIR}" >&2; exit 1; }

( cd "${DESIGN_DIR}" && npm run -s export:tailwind:all )

emit() { # <입력> <출력> <선택자> <원본 이름>
  {
    echo "/* ${4} 에서 생성 — scripts/sync_design.sh. 손으로 고치지 않는다. */"
    awk -v sel="$3" '
      !started && /^@theme[[:space:]]*\{/ { print sel " {"; started=1; next }
      started && !done { print; if ($0 ~ /^}/) done=1 }
    ' "${DESIGN_DIR}/exports/$1"
  } > "${ROOT}/css/$2"
}

emit tokens.css      tokens.css      ":root"      DESIGN.md
emit tokens.hr.css   tokens.hr.css   ".theme-hr"   DESIGN.hr.md
emit tokens.desk.css tokens.desk.css ".theme-desk" DESIGN.desk.md
echo "synced: $(wc -c < "${ROOT}/css/tokens.css") / $(wc -c < "${ROOT}/css/tokens.hr.css") / $(wc -c < "${ROOT}/css/tokens.desk.css") bytes"
