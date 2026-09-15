# 아임웹(Imweb) 삽입 가이드

아임웹은 Node.js 서버를 올릴 수 없는 호스팅형 빌더입니다. 그래서 이 저장소는
**아임웹 전용 임베드 번들**을 따로 빌드합니다. `npm run build:embed` →
`dist-embed/myeonggyeol.js` 파일 하나가 나오고, 이 파일만 있으면 아임웹 HTML
위젯에서 동작합니다.

## 삽입 방법

1. Vercel에 배포합니다. `npm run build`가 사이트와 임베드 번들을 함께 만들어
   `https://<프로젝트>.vercel.app/myeonggyeol.js` 로 서빙합니다.
2. 아임웹 편집 화면에서 **위젯 추가 → HTML(코드 입력)** 을 선택합니다.
3. [`docs/imweb-snippet.html`](./imweb-snippet.html) 의 내용을 붙여넣고
   `YOUR-PROJECT` 를 실제 주소로 바꿉니다.

```html
<div id="myeonggyeol-app"></div>
<script src="https://YOUR-PROJECT.vercel.app/myeonggyeol.js"></script>
```

`<script>` 한 줄만 넣어도 그 자리에 위젯이 생성됩니다.

## 아임웹에서 깨지지 않도록 처리한 것

아임웹 페이지에는 이미 자체 CSS 리셋, 테마 스타일, jQuery 위젯이 올라가 있어서
AI Studio가 만든 원본 코드를 그대로 넣으면 서로 충돌합니다. 임베드 빌드
(`vite.embed.config.ts`)가 아래를 자동으로 처리합니다.

| 문제 | 처리 |
| --- | --- |
| Tailwind preflight가 아임웹 페이지 전체의 여백·글꼴·테두리를 초기화 | 모든 CSS 선택자를 `#myeonggyeol-app` 하위로 한정(551개 규칙 전부 검증) |
| Tailwind v4가 CSS를 `@layer` 안에 넣어, 아임웹의 평범한 `img { … }` 한 줄에도 밀림 | 레이어를 모두 해제해 명시도(id 선택자)로 경쟁하도록 변환 |
| 아임웹 테마의 `!important` 규칙이 위젯 레이아웃을 덮어씀 | 유틸리티를 `important` 모드로 빌드 (범위는 위젯 내부로 한정됨) |
| `.flex` · `.grid` · `.container` 등 클래스명 충돌 | 위 두 가지로 해결 |
| 위젯 헤더의 `sticky` + `z-50` 이 아임웹 상단 메뉴를 덮음 | 임베드에서는 헤더 고정을 풀고, `isolation: isolate` 로 z-index를 위젯 안에 가둠 |
| ES 모듈 스크립트가 위젯에서 동작하지 않음 | IIFE(일반 스크립트)로 빌드 |
| CSS·이미지 상대경로가 아임웹 도메인 기준으로 잘못 잡힘 | CSS는 JS 안에 인라인, 이미지는 data URI로 인라인 → 파일 1개로 완결 |
| `/api/...` 상대 경로 호출이 아임웹 도메인으로 가서 404 | 스크립트를 불러온 origin을 API 주소로 자동 사용 (`window.MYEONGGYEOL_API_BASE`로 덮어쓰기 가능) |
| 위젯이 두 번 삽입되면 중복 렌더 | 컨테이너에 마운트 플래그를 두어 1회만 렌더 |
| 웹폰트가 안 붙음 | Noto Serif KR · Pretendard `<link>`를 스크립트가 직접 주입(중복 방지) |

## AI 연동

- 스크립트를 Vercel에서 불러오면 AI 호출(`/api/saju/interpret`, `/api/saju/chat`)이
  자동으로 그 Vercel 주소로 갑니다. 별도 설정이 필요 없습니다.
- 아임웹은 다른 도메인이므로 API는 교차 출처 호출이 됩니다. `api/_cors.ts`가
  CORS 헤더를 붙입니다. 호출 도메인을 제한하려면 Vercel 환경변수
  `ALLOWED_ORIGINS` 에 `https://내사이트.com` 형태로(쉼표 구분) 지정하세요.
- **AI 서버 없이도 오류가 나지 않습니다.** 만세력 계산은 원래부터 브라우저에서
  100% 처리되고, AI 호출이 실패하면 내장 해석문으로 자동 대체되어 결과 화면이
  비는 일이 없습니다. 즉 `<script>` 한 줄만으로도 완전히 동작합니다.

## 알아둘 점

- 번들은 약 1.5MB(gzip 약 985KB)이고, 대부분이 인라인된 히어로 배경 이미지
  (`hanbok_wide_panoramic`, 원본 879KB)입니다. 더 가볍게 하려면 이 이미지를
  먼저 압축한 뒤 다시 빌드하세요.
- 아임웹 요금제에 따라 코드 위젯이 막혀 있을 수 있습니다. 그 경우
  `docs/imweb-snippet.html` 아래쪽의 iframe 방식을 쓰면 됩니다.
- 스타일을 바꿀 때마다 `npm run build:embed` 를 다시 돌리고 파일을 재배포해야
  아임웹 쪽에 반영됩니다.
