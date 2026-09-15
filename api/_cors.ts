import type {VercelRequest, VercelResponse} from '@vercel/node';

// The bundle is embedded on other hosts (Imweb), so the API is called
// cross-origin. ALLOWED_ORIGINS is an optional comma-separated allowlist;
// when unset any origin may call these read-only endpoints.
function allowedOrigin(req: VercelRequest): string {
  const configured = (process.env.ALLOWED_ORIGINS || '')
    .split(',')
    .map((o) => o.trim())
    .filter(Boolean);
  if (configured.length === 0) return '*';

  const origin = req.headers.origin;
  return typeof origin === 'string' && configured.includes(origin) ? origin : configured[0];
}

/** Applies CORS headers. Returns true when the request was a handled preflight. */
export function applyCors(req: VercelRequest, res: VercelResponse): boolean {
  res.setHeader('Access-Control-Allow-Origin', allowedOrigin(req));
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST,OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Origin');

  if (req.method === 'OPTIONS') {
    res.status(204).end();
    return true;
  }
  return false;
}
