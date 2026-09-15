// Resolves where the AI endpoints live.
//
// On the standalone Vercel deployment the page and the API share an origin,
// so the resolved base is ''. When the bundle is embedded on another host
// (Imweb, a blog, anywhere), same-origin '/api/...' would hit that host and
// 404, so the base is derived from the <script src> the bundle was loaded
// from — i.e. the deployment that also serves the API. It can be overridden
// by setting window.MYEONGGYEOL_API_BASE before the script tag.

declare global {
  interface Window {
    MYEONGGYEOL_API_BASE?: string;
  }
}

function detectScriptOrigin(): string {
  if (typeof document === 'undefined') return '';
  try {
    // An IIFE bundle executes synchronously on load, so currentScript is
    // still the tag that loaded us at module-evaluation time.
    const current = document.currentScript as HTMLScriptElement | null;
    const src = current?.src;
    if (src) return new URL(src, document.baseURI).origin;
  } catch {
    // Cross-origin or malformed src: fall through to same-origin.
  }
  return '';
}

const SCRIPT_ORIGIN = detectScriptOrigin();

/** Absolute URL for an API path such as '/api/saju/chat'. */
export function apiUrl(path: string): string {
  const configured = typeof window !== 'undefined' ? window.MYEONGGYEOL_API_BASE : undefined;
  const base = (configured || SCRIPT_ORIGIN || '').replace(/\/+$/, '');
  return base + path;
}

/** POST JSON to an API path, rejecting on non-2xx so callers can fall back. */
export async function postJson<T>(path: string, body: unknown, timeoutMs = 20000): Promise<T> {
  const controller = new AbortController();
  const timer = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(apiUrl(path), {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(body),
      signal: controller.signal,
    });
    if (!response.ok) {
      throw new Error(`Request to ${path} failed with ${response.status}`);
    }
    return (await response.json()) as T;
  } finally {
    clearTimeout(timer);
  }
}
