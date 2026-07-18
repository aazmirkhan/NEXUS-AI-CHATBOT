# NexusAi Assistant

Live AI chat demo for NexusAi's portfolio (AI Projects category).

## Local development
```
npm install
npm run dev
```
Note: the `/api/chat` serverless function only runs on Vercel (or `vercel dev` locally),
not with plain `vite dev`. For local testing with the API working, use `vercel dev` after
installing the Vercel CLI: `npm i -g vercel`.

## Environment variable required
- `ANTHROPIC_API_KEY` — get one from https://console.anthropic.com
