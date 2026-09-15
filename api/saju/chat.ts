import type {VercelRequest, VercelResponse} from '@vercel/node';
import {chatFallbackReply, chatWithSaju} from '../../server/saju';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({error: 'Method not allowed'});
  }

  const {message, saju, history} = req.body || {};

  try {
    res.json({reply: await chatWithSaju(message, saju, history)});
  } catch (err) {
    console.error('Chat error:', err);
    res.json({reply: chatFallbackReply(saju)});
  }
}
