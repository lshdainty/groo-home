# video/ — 출처와 만드는 법

| 파일 | 쓰는 곳 | 내용 |
|---|---|---|
| `damda-promo.mp4` · `damda-promo-poster.jpg` | `/damda/` 첫 화면 | 그루 담다 소개 영상(1920×1080 · 30fps · 34.9초 · 음악). 2026-11-16 사용자 확정본을 웹용으로 다시 압축(crf 25) |
| `clip-damda.mp4` · `clip-damda-start.jpg` · `clip-damda-end.jpg` | `/` 서비스 줄 담다 칸 | 담다 짧은 장면(1200×900 · 5.6초 · 무음) |
| `clip-ieum.mp4` · `clip-ieum-start.jpg` · `clip-ieum-end.jpg` | `/` 서비스 줄 이음 칸 | 이음 짧은 장면(1200×900 · 5.8초 · 무음) |

## 음악
- Mixkit **"It's Love"** — Michael Ramir C. (https://mixkit.co/free-stock-music/, id 834)
- **Mixkit Stock Music Free License**: 광고 · SNS · 유튜브 · 웹에서 상업적으로 쓸 수 있고 출처 표기는 필요 없다.
  **TV · 라디오 방송 · CD/DVD · 게임에는 쓸 수 없고, 음악만 따로 리믹스해 내놓을 수 없다.**
- 곡의 13.118초부터 34.909초를 잘라(110BPM 16마디) 앞 0.25초 · 끝 2.9초를 페이드했다.

## 화면
- 담다 · 이음 화면은 dev 데모 계정에서 찍은 **실제 화면**이다. dev 에만 그려지는 "DEVELOPMENT" 워터마크는 캡처할 때 숨겼다(운영과 같은 화면).
- 데모 데이터의 숫자 · 이름은 예시다. 이음 캘린더의 11월 일정 · 휴가는 영상용으로 dev 시드의 가상 인물에게 넣은 것이다.
- 이음 화면은 웹 서비스라 브라우저 창에 담고, 캘린더 본문만(사이드바 제외) 2배로 찍었다.
- 폰 틀은 아이폰 15 Pro 실제 치수(화면 393×852pt · 모서리 55pt · 다이나믹 아일랜드 125×37pt @ x134 · y11 · 상태 표시줄 59pt).

## 다시 만들 때
원본(장면 HTML · 캡처 · 렌더 스크립트)은 이 레포 밖 `~/qa/damda-promo/` 에 있다(만든 컴퓨터의 작업 폴더).
- 장면: `index.html`(소개 영상) · `clip-damda.html` · `clip-ieum.html`, 공용 `parts.css` · `parts.js`
- 캡처: `tools/capture.mjs`(로그인해 둔 캡처용 크롬, 원격 디버깅 9333)
- 렌더: `tools/render.mjs` — 헤드리스 크롬으로 프레임을 찍어 ffmpeg 로 묶는다. 클립은 `PAGE=clip-damda.html W=1200 H=900 AUDIO=0 NAME=clip-damda`
- 웹용 압축: `ffmpeg -i <원본> -c:v libx264 -preset slow -crf 25(소개) · 26(클립) -profile:v high -pix_fmt yuv420p -movflags +faststart`
