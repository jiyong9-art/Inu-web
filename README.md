# I&U (아이엔유) — 공식 웹사이트

`inu.ai.kr` 연결용 기업 공식 사이트. 의존성 없는 정적 HTML/CSS/JS로 만들었고, GitHub Pages로 배포합니다.

## 구성 (2026-11-19 새 홈페이지)

| 파일 | 내용 |
| --- | --- |
| `index.html` | 랜딩 페이지 — 첫 화면(APP·GAME·STORY·VIDEO) / 회사소개 / 사업영역 2개 / 프로젝트 4개 / 망상보스 엔딩메이커 에피소드 1~6 / 문의 / 사업자 정보 푸터 |
| `home.css` / `home.js` | 새 홈페이지 전용 스타일 / 모바일 메뉴와 영상·음악 재생 동작 |
| `assets/img/` | 첫 화면 네 칸, 프로젝트 대표 이미지 |
| `assets/media/` | 언더어스 트레일러, 망상보스 EP02, 뮤지컬 첫 곡 |
| `privacy.html` | 개인정보처리방침 (국문·영문) — 앱스토어 심사용 |
| `terms.html` | 이용약관 (국문·영문) |
| `support.html` | 고객지원 — 연락처, FAQ |
| `404.html` | 없는 페이지 안내 |
| `styles.css` / `main.js` | 약관·지원 페이지 스타일 / 한·영 전환 (localStorage 저장, 모든 페이지 공용) |
| `favicon.svg`, `favicon-32.png`, `icon-192.png`, `apple-touch-icon.png` | 아이콘 |
| `site.webmanifest` | 홈 화면 추가용 매니페스트 |

- 외부 요청: Google Fonts(Noto Sans KR, Space Grotesk), 에피소드 썸네일(YouTube `i.ytimg.com`). 추적 스크립트는 쓰지 않습니다.
- 언어 전환: 우측 상단 `KO / EN`. `<html data-lang>` + CSS로 전환하므로 JS가 막혀도 국문으로 정상 표시됩니다.
- 휴대폰(가로 860px 이하)에서는 상단 메뉴가 ☰ 버튼 안으로 접힙니다.

## 프로젝트 섹션 (`#projects`)

| 번호 | 프로젝트 | 구분 | 동작 |
| --- | --- | --- | --- |
| 01 | 사주니버스 I&U | 앱 | — |
| 02 | 언더어스 (UnderEarth) | 모바일게임 | 커서를 올리면 트레일러 무음 미리보기, 클릭하면 소리와 함께 전체 화면 |
| 03 | 망상보스 엔딩메이커 | 웹드라마 | 커서를 올리면 EP02가 노래와 함께 재생, 클릭하면 전체 화면 |
| 04 | 뮤지컬 드라마 | 뮤지컬 | 카드에 커서를 올리면 첫 곡 미리 듣기, 버튼을 누르면 계속 재생 |

- 영상·음악은 `data-video-cover`(카드 그림) / `data-song-card`(카드 전체) 속성으로 `home.js`가 연결합니다. 소리는 한 번에 하나만 나옵니다.
- 브라우저 정책상 페이지를 한 번도 클릭하지 않은 상태에서는 커서만 올려서 소리를 낼 수 없습니다. 이때 영상은 무음으로 흐르고 "눌러서 소리 켜기" 안내가 보입니다.
- 영상 파일 교체: 같은 이름으로 `assets/media/`에 덮어쓰면 됩니다. GitHub 파일 한도(100MB)와 로딩 속도를 생각해 720p·20MB 이하로 줄여 넣는 걸 권합니다.

## 사업자 정보 (사업자등록증 419-07-01968)

- 상호: 아이엔유 (I&U)
- 대표자: 문지용 (Jiyong Moon)
- 사업자등록번호: 419-07-01968
- 주소: 경기도 남양주시 와부읍 월문천로 95, 108동 303호(덕소아이파크) / 108-303, 95 Wolmuncheon-ro, Wabu-eup, Namyangju-si, Gyeonggi-do 12213, South Korea
- 연락처: +82-10-5557-7635 · contact@inu.ai.kr

> D-U-N-S 번호는 아직 발급 전입니다. Apple D&B 케이스 번호(#35023185)는 D-U-N-S 번호가 아니므로 사이트에 표기하지 않습니다. 실제 9자리 번호가 발급되면 푸터 `dl.legal`에 `<div><dt>D-U-N-S</dt><dd>발급번호</dd></div>`를 추가하세요.

이 값들은 `index.html`, `privacy.html`, `terms.html`, `support.html`의 푸터에 동일하게 들어 있습니다. 수정 시 네 파일을 함께 고쳐 주세요.

## 배포

```bash
gh repo create jiyong9-art/inu-web --public --source=. --remote=origin --push
gh api -X POST repos/jiyong9-art/inu-web/pages -f "source[branch]=main" -f "source[path]=/"
```

라이브: https://jiyong9-art.github.io/inu-web/

## 커스텀 도메인(inu.ai.kr) 연결 순서

1. 가비아 DNS에서 아래 레코드 추가 (GitHub Pages 표준)
   - `A` `@` → `185.199.108.153`, `185.199.109.153`, `185.199.110.153`, `185.199.111.153`
   - `CNAME` `www` → `jiyong9-art.github.io`
   - (IPv6를 쓸 경우 `AAAA` → `2606:50c0:8000::153` 등 4개)
2. 이 저장소에 `CNAME` 파일을 만들고 `inu.ai.kr` 한 줄을 넣어 커밋
3. 저장소 Settings → Pages → Custom domain에 `inu.ai.kr` 입력, DNS 전파 후 **Enforce HTTPS** 체크
4. `CNAME` 파일을 넣는 순간 `github.io/inu-web/` 주소는 커스텀 도메인으로 리다이렉트됩니다. DNS가 준비되기 전에는 넣지 마세요.

> 메일: `contact@inu.ai.kr`은 Cloudflare Email Routing 등으로 수신 설정이 필요합니다. 설정 전까지는 사이트의 mailto 링크가 수신되지 않을 수 있습니다.
