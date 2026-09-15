# 아임웹(Imweb) 삽입 가이드

아임웹은 Node.js 서버를 올릴 수 없는 호스팅형 빌더이고, 페이지에는 이미 아임웹의
CSS 리셋·테마 스타일·jQuery 위젯이 올라가 있습니다. AI Studio가 만든 원본 코드
(React + Vite + TypeScript)를 그대로 넣으면 빌드도 안 되고 스타일도 충돌합니다.

그래서 아임웹용으로 두 가지 방법을 준비했습니다.

| | 방법 A — 붙여넣기 전용 (권장) | 방법 B — 호스팅형 번들 |
| --- | --- | --- |
| 넣는 것 | [`docs/imweb-standalone.html`](./imweb-standalone.html) 전체 복사 | `<script src="...">` 한 줄 |
| 빌드 | 필요 없음 | `npm run build:embed` 필요 |
| 서버 배포 | 필요 없음 | Vercel 배포 필요 |
| 붙여넣는 양 | 약 310KB (배경 사진 포함) | 2줄 |
| AI 풀이 | 내장 해설 (서버 연결 시 자동 전환) | 배포한 Gemini API 사용 |
| 스타일 격리 | Shadow DOM (완전 분리) | CSS 선택자 범위 한정 |

**처음이라면 방법 A를 쓰세요.** 아무것도 배포하지 않아도 사주 계산과 결과 화면이
모두 동작합니다. 나중에 Vercel에 배포하면 코드를 바꾸지 않고 한 줄만 추가해서
AI 풀이로 업그레이드할 수 있습니다.

---

## 방법 A — 붙여넣기 전용 (빌드·서버 없음)

1. 아임웹 편집화면에서 **위젯 추가 → HTML(코드 입력)** 을 선택합니다.
2. [`docs/imweb-standalone.html`](./imweb-standalone.html) 의 내용을 **전부** 복사해서
   붙여넣습니다.
3. 저장하면 끝입니다.

### (선택) AI 서버 연결

Vercel 배포를 마쳤다면, 붙여넣은 코드 **맨 위**에 한 줄만 추가하세요.
연결되면 내장 해설 대신 실시간 AI 풀이가 나오고, 서버가 죽거나 느려지면 다시
내장 해설로 자동 복귀합니다.

```html
<script>window.MYEONGGYEOL_API_BASE = 'https://내프로젝트.vercel.app';</script>
```

### (선택) 히어로 배경을 내 사진으로

원본 한복·한옥 배경 사진이 코드 안에 직접 담겨 있습니다(원본 879KB를 같은
크기 1376px로 다시 압축해 162KB). 외부 주소를 부르지 않으므로 아임웹에서
사진이 깨지거나 사라지지 않고, 따로 이미지를 올릴 필요도 없습니다. 사진 뒤에는
일월오봉도(日月五峯圖)를 본뜬 SVG 배경이 한 겹 더 깔려 있어, 혹시 사진을
불러오지 못해도 배경이 비어 보이지 않습니다.

다른 사진으로 바꾸려면:

```html
<script>window.MYEONGGYEOL_HERO_IMAGE = 'https://내사이트.com/hero.jpg';</script>
```

웹폰트(Noto Serif KR·Pretendard)까지 막고 싶다면
`window.MYEONGGYEOL_NO_FONTS = true` 를 함께 지정하세요. 폰트가 없으면 시스템
글꼴로 자동 대체됩니다.

### 아임웹에서 깨지지 않도록 처리한 것

| 문제 | 처리 |
| --- | --- |
| 아임웹 테마 CSS(`!important` 포함)가 위젯 안으로 들어와 레이아웃을 깨뜨림 | 위젯을 **Shadow DOM** 안에 그려 외부 CSS가 아예 닿지 않게 함 |
| 위젯 CSS가 아임웹 페이지의 글꼴·여백·이미지 테두리를 건드림 | 같은 이유로 바깥으로도 새어 나가지 않음 (테스트로 확인) |
| 구형 브라우저에 Shadow DOM이 없음 | 모든 선택자를 `#myeonggyeol-widget` 하위로 한정한 폴백 스타일로 자동 전환 |
| React·Vite·TypeScript는 아임웹에서 빌드할 수 없음 | 빌드가 필요 없는 순수 JavaScript로 다시 작성 |
| 외부 스크립트/CSS/이미지가 아임웹 정책이나 네트워크에 막힘 | 외부 리소스를 하나도 쓰지 않음 (웹폰트만 선택적, 실패해도 정상 표시) |
| 히어로 배경 사진이 경로를 못 찾아 사라짐 | 사진을 코드 안에 data URI로 담고, 뒤에 SVG 배경을 한 겹 더 깖 |
| 아임웹 페이지의 `<form>` 안에 위젯이 들어가면 중첩 폼이 깨지고 엔터키에 페이지가 새로고침됨 | `<form>`을 쓰지 않고 버튼 클릭·엔터키를 직접 처리 |
| 위젯 헤더의 `sticky`·`z-index`가 아임웹 상단 메뉴를 덮음 | 헤더 고정을 풀고 `isolation: isolate` 로 z-index를 위젯 안에 가둠 |
| 서버가 없어서 `/api/...` 호출이 404 | 만세력은 100% 브라우저 계산, AI 풀이는 내장 해설로 자동 대체 |
| 위젯을 두 번 넣으면 중복 렌더 | 컨테이너에 마운트 표시를 남겨 1회만 렌더 |
| 위젯에서 예외가 나면 아임웹 페이지 전체가 멈춤 | 초기화·계산·통신을 모두 `try/catch`로 가둠 |

### 확인한 내용

아임웹 테마를 흉내 낸 페이지(전역 `!important` 리셋, `img { border:3px solid red }`,
`button { font-size:11px }`, `* { box-sizing: content-box }`, 페이지 전체를 감싼
`<form>`)에 넣고 Chromium으로 검증했습니다.

- 만세력 계산 결과가 원본 TypeScript 엔진과 **46,560개 입력에서 100% 일치**
  (1930~2026년 × 12개월 × 10일 × 성별 × 시간 미상 여부)
- 위젯 삽입 전후로 호스트 페이지의 계산된 스타일이 **완전히 동일**
- 콘솔 오류 0건, 모바일(390px) 가로 스크롤 0px
- 배경 사진이 코드 안에서 정상 표시되고, 호스트의
  `img { border:3px solid red !important }` 가 위젯 사진에는 닿지 않음
- 웹폰트 2개를 제외하면 외부 네트워크 요청 0건
- AI 서버 정상 / 500 오류 / 없는 주소 / Shadow DOM 미지원 — 네 경우 모두
  오류 없이 결과 화면 표시

---

## 방법 B — 호스팅형 단일 파일 번들

원본 React 화면을 그대로 쓰고 싶고 Vercel 배포까지 할 수 있다면 이 방법을 씁니다.
`npm run build:embed` → `dist-embed/myeonggyeol.js` 파일 하나가 나옵니다.

1. Vercel에 배포합니다. `npm run build`가 사이트와 임베드 번들을 함께 만들어
   `https://<프로젝트>.vercel.app/myeonggyeol.js` 로 서빙합니다.
2. 아임웹 편집 화면에서 **위젯 추가 → HTML(코드 입력)** 을 선택합니다.
3. [`docs/imweb-snippet.html`](./imweb-snippet.html) 의 내용을 붙여넣고
   `YOUR-PROJECT` 를 실제 주소로 바꿉니다.

```html
<div id="myeonggyeol-app"></div>
<script src="https://YOUR-PROJECT.vercel.app/myeonggyeol.js"></script>
```

이 번들이 아임웹에서 깨지지 않도록 처리한 내용은 `vite.embed.config.ts` 주석과
아래 표에 있습니다.

| 문제 | 처리 |
| --- | --- |
| Tailwind preflight가 아임웹 페이지 전체의 여백·글꼴·테두리를 초기화 | 모든 CSS 선택자를 `#myeonggyeol-app` 하위로 한정 |
| Tailwind v4가 CSS를 `@layer` 안에 넣어, 아임웹의 평범한 `img { … }` 한 줄에도 밀림 | 레이어를 모두 해제해 명시도(id 선택자)로 경쟁하도록 변환 |
| 아임웹 테마의 `!important` 규칙이 위젯 레이아웃을 덮어씀 | 유틸리티를 `important` 모드로 빌드 (범위는 위젯 내부로 한정됨) |
| ES 모듈 스크립트가 위젯에서 동작하지 않음 | IIFE(일반 스크립트)로 빌드 |
| CSS·이미지 상대경로가 아임웹 도메인 기준으로 잘못 잡힘 | CSS는 JS 안에 인라인, 이미지는 data URI로 인라인 |
| `/api/...` 상대 경로 호출이 아임웹 도메인으로 가서 404 | 스크립트를 불러온 origin을 API 주소로 자동 사용 |
| 위젯이 두 번 삽입되면 중복 렌더 | 컨테이너에 마운트 플래그를 두어 1회만 렌더 |

- 아임웹은 다른 도메인이므로 API는 교차 출처 호출이 됩니다. `api/_cors.ts`가
  CORS 헤더를 붙입니다. 호출 도메인을 제한하려면 Vercel 환경변수
  `ALLOWED_ORIGINS` 에 `https://내사이트.com` 형태로(쉼표 구분) 지정하세요.
- 번들은 약 1.5MB이고 대부분이 인라인된 히어로 배경 이미지입니다. 더 가볍게
  하려면 이미지를 압축한 뒤 다시 빌드하세요.
- 스타일을 바꿀 때마다 `npm run build:embed` 를 다시 돌리고 재배포해야 합니다.

### 배경 사진을 다시 압축하려면

`docs/imweb-standalone.html` 안의 `HERO_PHOTO` 값은 아래처럼 만들었습니다.
사진을 교체하거나 더 줄이고 싶을 때 같은 방법을 쓰면 됩니다.

```python
from PIL import Image
import io, base64
im = Image.open('src/assets/images/hanbok_wide_panoramic_1789361790745.jpg').convert('RGB')
buf = io.BytesIO()
im.save(buf, 'JPEG', quality=72, optimize=True, subsampling=2)
print('data:image/jpeg;base64,' + base64.b64encode(buf.getvalue()).decode())
```

WebP로 바꾸면 절반 크기가 되지만 구형 사파리(iOS 13 이하)에서 사진이 깨지므로
JPEG을 씁니다.

---

## 두 방법 모두 알아둘 점

- 아임웹 요금제에 따라 코드 위젯이 막혀 있을 수 있습니다. 그 경우
  `docs/imweb-snippet.html` 아래쪽의 iframe 방식을 쓰면 됩니다.
- **음력 입력은 아직 양력으로 환산되지 않습니다.** 원본 만세력 엔진이 음력
  변환을 하지 않아, 음력을 고르면 입력한 날짜를 양력으로 보고 계산합니다.
  방법 A에는 이 사실을 알리는 안내문이 화면에 표시됩니다. 정확한 결과를
  원하시면 양력 생일로 입력하세요.
