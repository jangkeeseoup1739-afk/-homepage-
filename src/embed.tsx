// Embed entry point: renders the app into a host page that we do not control
// (Imweb and similar site builders). Unlike main.tsx it does not assume a
// dedicated #root element, injects its own webfonts, and refuses to mount
// twice if the host renders the snippet more than once.
import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App';
import './embed.css';

const CONTAINER_ID = 'myeonggyeol-app';
const MOUNTED_ATTR = 'data-myeonggyeol-mounted';

// Captured while the IIFE is still executing synchronously, so it is the
// <script> tag that loaded this bundle.
const currentScript = document.currentScript as HTMLScriptElement | null;

const FONTS: Array<{id: string; href: string; crossOrigin?: string}> = [
  {
    id: 'myeonggyeol-font-noto-serif-kr',
    href: 'https://fonts.googleapis.com/css2?family=Noto+Serif+KR:wght@400;600;700;900&display=swap',
  },
  {
    id: 'myeonggyeol-font-pretendard',
    href: 'https://cdn.jsdelivr.net/gh/orioncactus/pretendard@v1.3.9/dist/web/static/pretendard.min.css',
    crossOrigin: 'anonymous',
  },
];

function injectFonts() {
  for (const font of FONTS) {
    if (document.getElementById(font.id)) continue;
    const link = document.createElement('link');
    link.id = font.id;
    link.rel = 'stylesheet';
    link.href = font.href;
    if (font.crossOrigin) link.crossOrigin = font.crossOrigin;
    document.head.appendChild(link);
  }
}

function resolveContainer(): HTMLElement | null {
  const existing = document.getElementById(CONTAINER_ID);
  if (existing) return existing;

  // No placeholder div in the host page: render in place of the script tag,
  // so pasting the <script> alone into an Imweb HTML widget is enough.
  const parent = currentScript?.parentNode;
  if (!parent) return null;

  const container = document.createElement('div');
  container.id = CONTAINER_ID;
  parent.insertBefore(container, currentScript);
  return container;
}

function mount() {
  const container = resolveContainer();
  if (!container) {
    console.error('[명결] 위젯을 넣을 위치를 찾지 못했습니다. <div id="myeonggyeol-app"></div>를 추가해 주세요.');
    return;
  }
  if (container.hasAttribute(MOUNTED_ATTR)) return;
  container.setAttribute(MOUNTED_ATTR, 'true');

  injectFonts();

  createRoot(container).render(
    <StrictMode>
      <App />
    </StrictMode>,
  );
}

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', mount, {once: true});
} else {
  mount();
}
