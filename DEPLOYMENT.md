# AI Resume Analyzer Deployment Guide

This setup deploys:
- Backend on Render
- Frontend on Vercel

## 1) Backend (Render)

1. Create a new Web Service from the Backend folder.
2. Build command:

```bash
npm install
```

3. Start command:

```bash
npm start
```

4. Add environment variables:

```env
NODE_ENV=production
PORT=10000
MONGO_URI=<your-mongodb-uri>
JWT_SECRET=<your-random-secret>
GOOGLE_GENAI_API_KEY=<your-gemini-api-key>
FRONTEND_URL=<your-vercel-frontend-url>
COOKIE_SECURE=true
COOKIE_SAME_SITE=none
```

5. Deploy and confirm health check:

```text
https://<your-render-domain>/api/health
```

Expected response:

```json
{"status":"ok"}
```

## 2) Frontend (Vercel)

1. Create a new Vercel project from the Frontend folder.
2. Build command:

```bash
npm run build
```

3. Output directory:

```text
dist
```

4. Add environment variable:

```env
VITE_API_BASE_URL=https://<your-render-domain>
```

5. Deploy.

## 3) Important order

1. Deploy backend first.
2. Copy backend URL into frontend VITE_API_BASE_URL.
3. Copy frontend URL into backend FRONTEND_URL.
4. Redeploy backend once after setting FRONTEND_URL.

## 4) Local run with env files

Backend:

```bash
cd Backend
cp .env.example .env
npm run dev
```

Frontend:

```bash
cd Frontend
cp .env.example .env
npm run dev
```

## 5) Troubleshooting

- If login works but session is missing in production: ensure COOKIE_SECURE=true and COOKIE_SAME_SITE=none on backend, and withCredentials is enabled in frontend (already configured).
- If CORS error appears: ensure backend FRONTEND_URL exactly matches deployed frontend domain (including https).
- If backend crashes on start: check required env vars MONGO_URI, JWT_SECRET, GOOGLE_GENAI_API_KEY.
