/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
/**
 * Application-wide constants
 */

// System Configuration Defaults
export const DEFAULT_SYSTEM_NAME = '1router API'
export const DEFAULT_LOGO = '/logo.svg'

/** Bundled default: transparent `public/logo.svg`; migrate legacy `/logo.png` installs. */
export function normalizeSystemLogo(logo: string | undefined | null): string {
  const v = typeof logo === 'string' ? logo.trim() : ''
  if (!v || v === 'null' || v === 'undefined') return DEFAULT_LOGO
  if (v === '/logo.png') return DEFAULT_LOGO
  return v
}

/** Bust browser cache for the bundled default logo (prefer server start_time, then version). */
export function logoSrcWithCacheBust(
  logo: string | undefined | null,
  cacheKey?: string
): string {
  const path = normalizeSystemLogo(logo)
  if (path === DEFAULT_LOGO && cacheKey) {
    return `${path}?v=${encodeURIComponent(cacheKey)}`
  }
  return path
}

/** Prefer `start_time` (changes each process start), then `version`. */
export function defaultLogoCacheKeyFromStatus(
  status: Record<string, unknown> | undefined | null
): string | undefined {
  if (!status) return undefined
  const start = status.start_time
  if (typeof start === 'string' && start) return start
  const ver = status.version
  if (typeof ver === 'string' && ver) return ver
  return undefined
}

/** Final `<img src>` / favicon URL: normalize legacy paths + cache-bust bundled default asset. */
export function resolvePublicLogoSrc(
  logo: string | undefined | null,
  status: Record<string, unknown> | undefined | null
): string {
  return logoSrcWithCacheBust(logo, defaultLogoCacheKeyFromStatus(status))
}

// LocalStorage Keys
export const STORAGE_KEYS = {
  SYSTEM_NAME: 'system_name',
  LOGO: 'logo',
  FOOTER_HTML: 'footer_html',
} as const
