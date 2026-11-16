# video/ — 출처와 만드는 법

| 파일 | 쓰는 곳 | 내용 |
|---|---|---|
| `damda-promo.mp4` · `damda-promo-poster.jpg` | `/damda/` 첫 화면 | 그루 담다 소개 영상(1920×1080 · 30fps · 34.9초 · 음악). 2026-11-16 사용자 확정본을 웹용으로 다시 압축(crf 25) |
| `ieum-promo.mp4` · `ieum-promo-poster.jpg` | `/ieum/` 첫 화면 "소개 영상 보기" | 그루 이음 소개 영상(1920×1080 · 30fps · 30초 · 음악). HR 광고 8편 분석(2026-11-16)으로 정한 콘티 — 대화 → 선 → 실제 이음 화면 시연(이름표 · 확대) → 사람이 이어짐 → 로고 |
| `clip-damda.mp4` · `clip-damda-start.jpg` · `clip-damda-end.jpg` | `/` 서비스 줄 담다 칸 | 담다 짧은 장면(1200×900 · 8.1초 · 무음) — 책상 위 물건이 폰에 담긴다 |
| `clip-ieum.mp4` · `clip-ieum-start.jpg` · `clip-ieum-end.jpg` | `/` 서비스 줄 이음 칸 | 이음 짧은 장면(1200×900 · 8.4초 · 무음) — 대화 두 줄이 선으로 이어져 실제 이음 화면에서 휴가를 등록한다. 담다와 형식을 일부러 나눴다 |
| `hero-damda-loop.mp4` · `hero-damda-loop-poster.jpg` | `/damda/` 첫 화면 | 소개 영상 4~8마디(책상 → 폰)를 글자 없이 다시 렌더한 8.8초 반복. 본편은 "소개 영상 보기" 버튼으로 연다 |
| `hero-ieum-loop.mp4` · `hero-ieum-loop-poster.jpg` | `/ieum/` 첫 화면 | 소개 영상 6.5~18초(실제 화면 시연 4컷)를 이름표 없이 다시 렌더한 11.5초 반복 |
| `i-*.mp4` · `i-*.jpg` | `/ieum/` 기능 섹션 | dev 실제 화면(1440×900)을 스크립트로 조작한 7초 안팎 반복(캘린더 · 휴가 정책 · 근무 일정 · 사용자 관리). 데이터를 바꾸는 동작은 없다 |
| `d-*.mp4` · `d-*.jpg` | `/damda/` 기능 섹션 | dev 실제 화면(1440×900)을 스크립트로 조작한 6~8초 반복(자산 · 가계부 · 예산 · 통계 · 캘린더 · 할 일 · 더치페이 · 메모). 커서는 그려 넣은 것, 데이터를 바꾸는 동작은 없다 |
| `m-*.mp4` · `m-*.jpg` | `/damda/` 모바일 · 가계부 | dev 모바일 웹(393×852) 7초 반복(홈 · 가계부 · 캘린더) |

## 음악
- Mixkit **"It's Love"** — Michael Ramir C. (https://mixkit.co/free-stock-music/, id 834)
- **Mixkit Stock Music Free License**: 광고 · SNS · 유튜브 · 웹에서 상업적으로 쓸 수 있고 출처 표기는 필요 없다.
  **TV · 라디오 방송 · CD/DVD · 게임에는 쓸 수 없고, 음악만 따로 리믹스해 내놓을 수 없다.**
- 곡의 13.118초부터 34.909초를 잘라(110BPM 16마디) 앞 0.25초 · 끝 2.9초를 페이드했다. — 담다 소개 영상
- Mixkit **"Ramp It Up"** — Ahjay Stelino (id 69), 같은 라이선스. 곡의 12.15초부터 30초(120BPM 15마디 — 영상 4초에 드럼, 20초에 고조)를 잘라 끝 2초를 페이드했다. — 이음 소개 영상

## 화면
- 담다 · 이음 화면은 dev 데모 계정에서 찍은 **실제 화면**이다. dev 에만 그려지는 "DEVELOPMENT" 워터마크는 캡처할 때 숨겼다(운영과 같은 화면).
- 데모 데이터의 숫자 · 이름은 예시다. 이음 캘린더의 11월 일정 · 휴가는 영상용으로 dev 시드의 가상 인물에게 넣은 것이다.
- 이음 화면은 웹 서비스라 브라우저 창에 담았다. 소개 영상 · 짧은 장면은 확대해도 흐리지 않게 2배(2880×1800)로 찍었다.
- 이음 소개 영상의 휴가 등록 장면은 dev 에서 실제로 저장한 것이다(가상 인물의 연차 — 찍은 뒤 지웠다). 화면에 보이는 부서 · 회사 이름은 dev 데이터를 일반 이름으로 바꿔 둔 것이다.
- 폰 틀은 아이폰 15 Pro 실제 치수(화면 393×852pt · 모서리 55pt · 다이나믹 아일랜드 125×37pt @ x134 · y11 · 상태 표시줄 59pt).

## 다시 만들 때
원본(장면 HTML · 캡처 · 렌더 스크립트)은 이 레포 밖 `~/qa/damda-promo/` 에 있다(만든 컴퓨터의 작업 폴더).
- 장면: `index.html`(담다 소개 영상) · `ieum-promo.html`(이음 소개 영상, `?notext` 면 이름표 없이) · `clip-damda.html` · `clip-ieum.html`, 공용 `parts.css` · `parts.js`
- 이음 장면은 녹화본(`rec/p-*.json` → `out/rec/p-*-raw.mp4`)을 `shots/ieum/<장면>/` 에 30fps JPEG 로 뽑아 두고, 장면 HTML 이 시각마다 해당 장을 끼운다(헤드리스 크롬에서 video 탐색보다 확실하다)
- 캡처: `tools/capture.mjs`(로그인해 둔 캡처용 크롬, 원격 디버깅 9333)
- 기능 화면: `tools/record.mjs <장면.json>`(캡처용 크롬에서 커서 · 클릭 · 스크롤을 실제로 하고 프레임을 찍는다. 장면 파일은 `rec/`)
- 렌더: `tools/render.mjs` — 헤드리스 크롬으로 프레임을 찍어 ffmpeg 로 묶는다. 클립은 `PAGE=clip-damda.html W=1200 H=900 AUDIO=0 NAME=clip-damda`, 이음 소개 영상은 `PAGE=ieum-promo.html MUSIC=bgm-ieum.m4a NAME=ieum-promo`
- 웹용 압축: `ffmpeg -i <원본> -c:v libx264 -preset slow -crf 25(소개) · 26(클립) -profile:v high -pix_fmt yuv420p -movflags +faststart`
