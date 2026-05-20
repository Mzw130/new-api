/**
 * Runtime API origin for split / CDN deployments (optional).
 * Priority in app: this file → build-time VITE_REACT_APP_SERVER_URL → same-origin.
 *
 * Replace on the server without rebuilding the SPA, e.g.:
 *   window.__RUNTIME__.API_BASE_URL = 'https://api.example.com';
 *
 * Leave empty when the SPA is served behind the same host as the gateway (nginx unified gateway).
 */
window.__RUNTIME__ = window.__RUNTIME__ || {}
window.__RUNTIME__.API_BASE_URL = window.__RUNTIME__.API_BASE_URL || ''
