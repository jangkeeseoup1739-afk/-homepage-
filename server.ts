// Local development server only.
// On Vercel the API lives in ./api/* as serverless functions and the SPA is
// served as static output, so this file is not part of the production build.
import dotenv from 'dotenv';
import express from 'express';
import {createServer as createViteServer} from 'vite';
import {
  chatFallbackReply,
  chatWithSaju,
  generateLocalFallbackInterpretation,
  interpretSaju,
} from './server/saju';

dotenv.config({path: '.env.local'});
dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// 1. Health check
app.get('/api/health', (req, res) => {
  res.json({status: 'ok', service: 'myeonggyeol-saju-api'});
});

// 2. Saju Full Interpretation API
app.post('/api/saju/interpret', async (req, res) => {
  const {saju} = req.body || {};
  if (!saju) {
    return res.status(400).json({error: 'Saju data is required'});
  }

  try {
    res.json(await interpretSaju(saju));
  } catch (error) {
    console.error('Gemini API interpretation error:', error);
    res.json(generateLocalFallbackInterpretation(saju));
  }
});

// 3. Interactive Saju AI Consultation Chat
app.post('/api/saju/chat', async (req, res) => {
  const {message, saju, history} = req.body || {};

  try {
    res.json({reply: await chatWithSaju(message, saju, history)});
  } catch (err) {
    console.error('Chat error:', err);
    res.json({reply: chatFallbackReply(saju)});
  }
});

async function startServer() {
  const vite = await createViteServer({
    server: {middlewareMode: true},
    appType: 'spa',
  });
  app.use(vite.middlewares);

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`명결(命結) Saju Server running on http://0.0.0.0:${PORT}`);
  });
}

startServer();
