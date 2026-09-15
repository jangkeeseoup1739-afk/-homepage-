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

`GEMINI_API_KEY`는 서버 측에서만 사용되므로 브라우저 번들에 노출되지 않습니다.
키가 없으면 각 API는 내장된 결정적(deterministic) 해석으로 자동 폴백합니다.

## 로컬 실행

**필수 조건:** Node.js 20 이상

```bash
npm install
cp .env.example .env.local   # GEMINI_API_KEY 값을 채워 넣으세요
npm run dev                  # http://localhost:3000
```

기타 스크립트: `npm run build` (프로덕션 빌드), `npm run preview`, `npm run lint` (타입 검사).

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

## 참고

AI Studio 원본 앱: https://ai.studio/apps/eaa52a58-402e-4e33-b203-6320b5d2aaf3
