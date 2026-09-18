# 고연당 홈페이지 (`/goyeondang`)

빌드 없이 그대로 배포되는 정적 페이지입니다. Vite가 `public/` 안의 파일을
`dist/`로 그대로 복사하므로, 이 폴더의 파일을 고치면 바로 반영됩니다.

| 파일 | 역할 |
| --- | --- |
| `index.html` | 페이지 구조 (섹션 문구) |
| `assets/site.config.js` | **내용 설정** — 이름·주소·영업시간·클래스·메뉴·갤러리 목록·카카오 키 |
| `assets/styles.css` | 디자인 (색·타이포·레이아웃) |
| `assets/main.js` | 동작 (갤러리, 카카오톡 공유, 메뉴 렌더링) |
| `images/hero.png` | 타이틀(히어로) 사진 |
| `images/gallery/` | 갤러리 사진을 넣는 폴더 |

로컬 확인:

```bash
npx serve public          # → http://localhost:3000/goyeondang/
# 또는
python3 -m http.server 8000 --directory public
```

## 1. 매장 정보 채우기

`assets/site.config.js` 상단의 `address`, `phone`, `hours`를 실제 값으로 바꿉니다.
**빈 문자열(`''`)로 두면 해당 줄과 버튼이 자동으로 숨겨지므로**, 값이 없는 항목은
그대로 비워 두면 됩니다.

## 2. 갤러리 사진 넣기

1. 사진을 `images/gallery/` 에 넣습니다 (`01.jpg`, `02.jpg` … 이름은 자유).
2. `assets/site.config.js`의 `gallery` 목록에서 `src`를 실제 파일명으로 맞춥니다.

파일이 아직 없는 항목은 "사진 준비 중" 자리표시자가 대신 보이고, 파일을 넣으면
자동으로 사진으로 바뀝니다 (누락된 사진 때문에 레이아웃이 깨지지 않습니다).
사진은 가로 1200px 내외, 300KB 이하로 줄여서 올리는 것을 권합니다.

## 3. 카카오톡 공유 켜기

공유 버튼은 키가 없어도 **링크 복사 / 기본 공유 시트**로 동작합니다.
카카오톡 공유 창을 쓰려면:

1. [Kakao Developers](https://developers.kakao.com)에서 애플리케이션을 만듭니다.
2. **앱 키 → JavaScript 키**를 `site.config.js`의 `kakaoJsKey`에 넣습니다.
3. **플랫폼 → Web**에 배포 도메인(`https://<배포주소>`)을 등록합니다.
   등록하지 않은 도메인에서는 공유가 차단되고, 자동으로 링크 복사로 넘어갑니다.

## 4. 카카오톡 링크 미리보기 (중요)

카카오톡·인스타 등에 링크를 붙였을 때 뜨는 썸네일은 `index.html`의
`og:url` / `og:image` 값을 사용합니다. 이 두 값은 **절대 주소여야** 하므로,
배포 도메인이 정해지면 `https://example.com` 부분을 실제 주소로 바꿔 주세요.

```html
<meta property="og:url"   content="https://실제도메인/goyeondang/" />
<meta property="og:image" content="https://실제도메인/goyeondang/images/hero.png" />
```

바꾼 뒤 [카카오 디버거](https://developers.kakao.com/tool/clear/og)에서
캐시를 지우면 새 미리보기가 바로 보입니다.

## 5. 이 페이지를 사이트 메인(`/`)으로 올리기

지금은 루트(`/`)에 명결 사주 앱이 배포되고, 이 페이지는 `/goyeondang` 에 있습니다.
메인으로 올리려면 `vercel.json`의 rewrites를 아래처럼 바꾸면 됩니다.

```json
"rewrites": [
  {"source": "/", "destination": "/goyeondang/index.html"},
  {"source": "/((?!api/|goyeondang).*)", "destination": "/index.html"}
]
```
