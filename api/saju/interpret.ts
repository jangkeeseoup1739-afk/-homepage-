import type {VercelRequest, VercelResponse} from '@vercel/node';
import {applyCors} from '../../server/cors';
import {generateLocalFallbackInterpretation, interpretSaju} from '../../server/saju';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (applyCors(req, res)) return;

  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  const {saju} = req.body || {};
  if (!saju) {
    return res.status(400).json({error: 'Saju data is required'});
  }

  try {
    res.json(await interpretSaju(saju));
  } catch (error) {
    console.error('Gemini API interpretation error:', error);
    // Fallback gracefully on any API error
    res.json(generateLocalFallbackInterpretation(saju));
  }
}
