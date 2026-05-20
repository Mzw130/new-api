# Enterprise split deployment

Two supported patterns:

## Pattern A — Single hostname via reverse proxy (recommended)

Browser sees **one origin** (e.g. `https://portal.company.com`). Nginx serves the SPA `dist/` and proxies API prefixes (`/api/`, `/v1/`, …) to the Go service.

- **Pros**: Session cookies `Strict`/`Lax` work; **no CORS** tuning for browsers.
- **Backend**: `SERVE_EMBEDDED_FRONTEND=false`, **`runtime-config.js`** keeps **empty** `API_BASE_URL` (relative URLs).

Compose reference:

```bash
cd deploy/enterprise-split
docker compose up -d --build
```

Populate **`spa-dist/`** with content from `web/default/dist/` after `bun run build` (classic theme would replace paths / nginx root accordingly).

**Database / Redis:** This compose stack only runs nginx + API. Point **`SQL_DSN`** and **`REDIS_CONN_STRING`** in **`api.env`** at your existing cluster (Tencent Postgres/Redis, self-hosted compose, etc.).

Set **`api.env`** from **`api.env.example`**. On the API container behind nginx:

```env
TRUSTED_PROXIES=10.0.0.0/8,172.16.0.0/12,192.168.0.0/16
ENABLE_SECURITY_HEADERS=true
```

## Pattern B — Separate static domain + API domain

- Static on COS/CDN (`https://static.example.com`), API (`https://api.example.com`).
- Build or **`runtime-config.js`**: `window.__RUNTIME__.API_BASE_URL = 'https://api.example.com'`.
- API env:

```env
SERVE_EMBEDDED_FRONTEND=false
FRONTEND_BASE_URL=https://static.example.com
CORS_ALLOWED_ORIGINS=https://static.example.com
SESSION_COOKIE_SAMESITE=none
SESSION_COOKIE_SECURE=true
SESSION_COOKIE_DOMAIN=.example.com
```

## Reference variables

| Env | Purpose |
|-----|---------|
| `CORS_ALLOWED_ORIGINS` | Comma-separated origins when Pattern B; empty = legacy permissive |
| `TRUSTED_PROXIES` | CIDRs or IPs for Gin `X-Forwarded-*` trust behind LB/nginx |
| `ENABLE_SECURITY_HEADERS` | `true` → baseline security headers |
| `SECURITY_FRAME_OPTIONS` | Override `X-Frame-Options` (default `SAMEORIGIN`) |
