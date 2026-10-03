# 청라 더리브 티아모 Casa — 분양 랜딩페이지

이 폴더는 **이미 배포되어 있는 명결(사주) 사이트와 완전히 별개**입니다.
저장소 루트의 사주 앱(`index.html`, `src/`, `api/`, `vercel.json` 등)은
이 폴더 때문에 바뀌는 것이 하나도 없고, 기존 배포 결과물에도 포함되지 않습니다.
(Vite 빌드 대상 밖에 있는 순수 정적 파일 한 장입니다.)

## 구성

| 파일 | 설명 |
| --- | --- |
| `index.html` | 랜딩페이지 전체 (HTML·CSS·JS 한 파일, 빌드 과정 없음) |
| `images/` | 조감도·평면도 등 이미지 — 파일명과 권장 크기는 `images/README.md` |

## 미리보기

빌드할 것이 없으므로 `index.html`을 브라우저로 그냥 열면 됩니다.
간단한 로컬 서버로 보려면 이 폴더에서:

```bash
python3 -m http.server 8080   # http://localhost:8080
```

## 해야 할 일 2가지

**1. 이미지 넣기**
`images/` 폴더에 사진을 넣고, `index.html` 안의 각 `.slot` 블록에서
주석으로 숨겨둔 `<img>` 태그의 주석을 풀어주세요. 넣는 즉시 안내 문구가
사라지고 이미지가 채워집니다. 필요한 파일 목록은 `images/README.md` 참고.

**2. 문의 폼 연결**
`index.html` 맨 아래 `const GAS_URL = "";` 에 구글 Apps Script 웹앱 URL을
넣으면 접수 내용이 구글 시트에 쌓입니다. 단계별 설명은 `index.html`
맨 위 주석에 적혀 있습니다. 비워 두면 폼 전송 시 데이터는 전송되지 않고
"010-8873-7258로 연락 부탁드립니다" 안내만 표시됩니다.

## 새 사이트로 따로 배포하기

기존 명결 프로젝트를 건드리지 않으려면, Vercel에서 **새 프로젝트**를
하나 더 만들어 이 폴더만 올립니다.

1. [vercel.com/new](https://vercel.com/new) → 같은 GitHub 저장소를 Import
2. **Project Name**은 기존 것과 다르게 (예: `cheongna-tiamo-casa`)
3. **Root Directory** → `cheongna-tiamo-casa` 선택
4. **Framework Preset** → `Other`, Build Command는 비워 둠 (빌드 불필요)
5. Deploy

CLI로 할 경우에도 이 폴더 안에서 실행하면 됩니다:

```bash
cd cheongna-tiamo-casa
vercel --prod
```

Vercel 외에 Netlify Drop, GitHub Pages, 카페24 등 어떤 정적 호스팅에
올려도 동작합니다. 외부에서 불러오는 것은 구글 폰트뿐입니다.
