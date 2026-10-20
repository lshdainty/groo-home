# groo-home — 작업 규칙

> **워크스페이스 공통 규칙**(Git 작업 격리 · 스테이징 범위 · 태그·릴리스)은
> 상위 `/home/lshdainty/study/CLAUDE.md` 에 있다. Claude Code 가 디렉토리 워크업으로
> 자동 로드하므로 여기에 복사하지 않는다 — 복사본은 원문이 바뀌어도 따라오지 않는다.

## 이 레포는

`porest.cloud` 루트의 그룹 홈페이지. 정적 HTML 세 쪽이고 빌드가 없다.

| 주소 | 파일 | 내용 |
|---|---|---|
| `/` | `index.html` | 그루 소개 (그룹 자체) |
| `/ieum/` | `ieum/index.html` | 그루 이음 (HR) 소개 |
| `/damda/` | `damda/index.html` | 그루 담다 (Desk) 소개 |

구성과 톤은 당근 소개 사이트(about.daangn.com)를 본뜬다 — 큰 문장, 넉넉한 여백, 평평한 면. 서비스는 서비스별 페이지에서 따로 설명하고,
메인은 그루 자체를 말한다. 서비스가 늘면 `/<이름>/` 쪽을 하나 더 만들고 메인 카드에 올린다.

**디자인은 `groo-design` 을 따른다**(2026-10-20 사용자 결정 — 이전에는 일부러 따르지 않았다).
- 값은 전부 `css/tokens*.css` 의 변수(`--color-*` · `--text-*` · `--spacing-*` · `--radius-*`)를 `var()` 로 부른다. 새 색·크기를 `site.css` 에서 정하지 않는다
- `css/tokens*.css` 는 `scripts/sync_design.sh` 가 만든다 — **손으로 고치지 않는다.** 값을 바꾸려면 groo-design 원본을 고치고 다시 가져온다
- 이음 쪽은 `.theme-hr`, 담다 쪽은 `.theme-desk` 클래스로 브랜드색을 얹는다. 그루 메인은 중립색이다
- 말투는 groo-design Voice and Tone(해요체 · 차분하게 · 느낌표 아끼기)을 따른다
- 바닥(`<footer>`)은 `specs/components/footer.md` 짜임을 따른다(2026-10-15)

페이지 문구는 그루 브랜드 기준(`groo/GROO-BRAND.md`)을 따른다 — 사명은 한글로만, 지금 있는 기능만 사실로 쓴다.

## 지킬 것

- 외부 의존은 글꼴(Pretendard · jsdelivr)뿐이다 — 제품과 같은 글꼴. 막혀도 시스템 글꼴로 서므로 페이지는 선다. 스크립트·스타일은 이 레포 파일로 둔다
- 사진은 Unsplash 에서 받아 `img/` 에 둔다(출처 id 는 `img/PHOTOS.md`). **서양인이 나오는 사진은 쓰지 않는다** — 한글 간판이 보이는 서울 거리·카페, 또는 사람이 안 나오는 사진(손 · 책상 · 새싹 · 숲)을 쓴다(2026-10-20 사용자 결정). 무료 사진에서는 국적을 거를 수 없어서, 한국임을 확인할 단서(한글 간판 · 서울 촬영)가 있는 것만 고른다
- 제품 화면 목업의 숫자는 가짜다. 실제 스크린샷으로 바꿀 때는 운영 화면을 깨끗한 계정으로 찍는다(dev 는 워터마크가 박힌다)
- 링크는 운영 도메인만(`hr.` `desk.` `sso.porest.cloud`, `desk.porest.cloud/guide/`). 관리자 도구(jenkins·grafana·cards)는 싣지 않는다
