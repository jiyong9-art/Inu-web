# I&U (아이엔유) — 공식 웹사이트

`inu.ai.kr` 연결용 기업 공식 사이트. 의존성 없는 정적 HTML/CSS/JS로 만들었고, GitHub Pages로 배포합니다.

## 구성

| 파일 | 내용 |
| --- | --- |
| `index.html` | 랜딩 페이지 — 회사소개 / What we do(I&U 사업 소개) / 3개 사업 영역 / 진행 중인 프로젝트 3종 / Contact & Support / 사업자 정보 푸터 |
| `privacy.html` | 개인정보처리방침 (국문·영문) — 앱스토어 심사용 |
| `terms.html` | 이용약관 (국문·영문) |
| `support.html` | 고객지원 — 연락처, FAQ |
| `404.html` | 없는 페이지 안내 |
| `styles.css` / `main.js` | 스타일시트 / 한·영 전환 (localStorage 저장) |
| `favicon.svg`, `favicon-32.png`, `icon-192.png`, `apple-touch-icon.png` | 아이콘 |
| `site.webmanifest` | 홈 화면 추가용 매니페스트 |

- 외부 폰트·CDN·추적 스크립트를 쓰지 않습니다. 콘솔 에러 0건, 네트워크 요청은 자체 파일뿐입니다.
- 언어 전환: 우측 상단 `KO / EN`. `<html data-lang>` + CSS로 전환하므로 JS가 막혀도 국문으로 정상 표시됩니다.

## 진행 중인 프로젝트 섹션 (`#projects`)

`index.html`의 `<!-- ================= PROJECTS ================= -->` 구간이 프로젝트 쇼케이스입니다.

| 번호 | 프로젝트 | 영문명 | 성격 |
| --- | --- | --- | --- |
| 01 | 사진 위버스 | PhotoWeavers | 모바일 사진 앱 |
| 02 | 언더어스 | UnderEarth | 좀비·청소 콘셉트 게임 |
| 03 | 파페라 | Papera | 뮤직비디오·영상/미디어 콘텐츠 |

- 세 카드 모두 `기획·개발 중(In development)` 배지로 표기해, 완성품이 아닌 진행 중 프로젝트임이 드러나게 했습니다.
- 각 카드 상단 `figure.proj-media`가 **대표 사진 슬롯**(16:10)입니다. 지금은 프로젝트 이니셜(PW·UE·PP) 플레이스홀더가 들어 있고, 사진이 준비되면 해당 카드 주석 안내대로 `<span class="proj-art">…</span>`를 지우고 `<img src="projects/01-photoweavers.jpg" alt="…" width="1200" height="750">`를 넣으면 슬롯에 그대로 채워집니다(`object-fit: cover`). 파일은 `projects/` 폴더를 만들어 넣으면 됩니다.
- 사진을 넣으면 점선 안내선(`.proj-media::after`)은 `:has(img)` 규칙으로 자동으로 사라집니다.

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
