# 명결 (命結) — 전통 AI 사주 풀이

명(命)을 풀고, 사람과 운을 연결하는 전통 AI 사주 풀이 서비스.
정밀 만세력 계산(`src/utils/manseEngine.ts`)과 Gemini 기반 심층 해석을 제공합니다.

## 구성

| 경로 | 설명 |
| --- | --- |
| `src/` | React 19 + Vite + Tailwind CSS 4 프런트엔드 (SPA) |
| `server/saju.ts` | Gemini 호출 및 폴백 해석 로직 (프런트/백엔드 공용) |
| `api/` | Vercel 서버리스 함수 (`/api/health`, `/api/saju/interpret`, `/api/saju/chat`) |
| `server.ts` | 로컬 개발 전용 Express + Vite 미들웨어 서버 |
| `docs/imweb-standalone.html` | 아임웹에 그대로 붙여넣는 단일 코드 (빌드·서버 불필요) |
| `src/embed.tsx`, `vite.embed.config.ts` | 아임웹 등 외부 페이지 삽입용 단일 파일 번들 (배포 필요) |
| `shared/fallbackInterpretation.ts` | AI 서버가 없을 때 쓰는 내장 해석 (서버·브라우저 공용) |

`GEMINI_API_KEY`는 서버 측에서만 사용되므로 브라우저 번들에 노출되지 않습니다.
키가 없으면 각 API는 내장된 결정적(deterministic) 해석으로 자동 폴백합니다.

## 로컬 실행

**필수 조건:** Node.js 20 이상

```bash
npm install
cp .env.example .env.local   # GEMINI_API_KEY 값을 채워 넣으세요
npm run dev                  # http://localhost:3000
```

기타 스크립트:

| 명령 | 설명 |
| --- | --- |
| `npm run build` | 사이트 + 임베드 번들을 함께 빌드 (Vercel이 실행) |
| `npm run build:site` | SPA만 빌드 → `dist/` |
| `npm run build:embed` | 아임웹 임베드 번들만 빌드 → `dist-embed/myeonggyeol.js` |
| `npm run preview` | 빌드 결과 미리보기 |
| `npm run lint` | 타입 검사 |

## Vercel 배포

이 저장소는 Vercel에 그대로 배포할 수 있도록 구성되어 있습니다
(`vercel.json`: Vite 정적 빌드 + `api/` 서버리스 함수 + SPA 폴백 리라이트).

### 1. 대시보드에서 배포 (권장)

1. [vercel.com/new](https://vercel.com/new)에서 이 GitHub 저장소를 Import 합니다.
2. Framework Preset이 **Vite**로 잡히는지 확인합니다 (Build Command `vite build`, Output Directory `dist` — `vercel.json`에 이미 지정되어 있습니다).
3. **Environment Variables**에 `GEMINI_API_KEY`를 추가합니다 (Production/Preview/Development 모두 체크).
4. **Deploy**를 누릅니다.

### 2. CLI에서 배포

```bash
npm i -g vercel
vercel login
vercel link
vercel env add GEMINI_API_KEY production
vercel --prod
```

### 배포 후 확인

```bash
curl https://<your-project>.vercel.app/api/health
# {"status":"ok","service":"myeonggyeol-saju-api"}
```

## 아임웹(Imweb)에 삽입하기

아임웹은 Node 서버를 올릴 수 없고 자체 테마 CSS가 이미 깔려 있어, 원본 코드를
그대로 넣으면 빌드도 안 되고 스타일도 충돌합니다. 두 가지 방법이 있습니다.

### 방법 A — 붙여넣기 전용 (권장, 아무 준비도 필요 없음)

[`docs/imweb-standalone.html`](docs/imweb-standalone.html) 을 통째로 복사해서
아임웹 **위젯 추가 → HTML(코드 입력)** 에 붙여넣으면 끝입니다.

- 빌드도, 서버 배포도, 외부 파일도 필요 없습니다.
- Shadow DOM 안에서 그려지므로 아임웹 테마 CSS와 서로 침범하지 않습니다.
- 만세력은 브라우저에서 100% 계산되고, AI 서버가 없으면 내장 해설로 자동
  대체되어 결과 화면이 비지 않습니다.
- 나중에 Vercel에 배포했다면 코드 위에 한 줄만 추가해 AI 풀이로 올릴 수 있습니다.

```html
<script>window.MYEONGGYEOL_API_BASE = 'https://내프로젝트.vercel.app';</script>
```

### 방법 B — 호스팅형 번들

원본 React 화면을 그대로 쓰고 싶다면 `npm run build:embed` 로 만든 단일 파일을
배포한 뒤 `<script>` 한 줄로 불러옵니다.

```html
<div id="myeonggyeol-app"></div>
<script src="https://<your-project>.vercel.app/myeonggyeol.js"></script>
```

붙여넣을 코드와 충돌 대응 내역은 [docs/IMWEB.md](docs/IMWEB.md) 를 참고하세요.

## 참고

AI Studio 원본 앱: https://ai.studio/apps/eaa52a58-402e-4e33-b203-6320b5d2aaf3
