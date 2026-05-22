/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/

/** @typedef {'cherry-studio'|'cursor'|'claude-code'|'codex-cli'|'openclaw'|'continue'|'lobechat'|'sdk-and-http'} IntegrationSlug */

export const INTEGRATION_SLUGS = [
  'cherry-studio',
  'cursor',
  'claude-code',
  'codex-cli',
  'openclaw',
  'continue',
  'lobechat',
  'sdk-and-http',
];

export const SLUG_APP_I18N_KEY = {
  'cherry-studio': 'cherry',
  cursor: 'cursor',
  'claude-code': 'claudeCode',
  'codex-cli': 'codex',
  openclaw: 'openclaw',
  continue: 'continue',
  lobechat: 'lobechat',
  'sdk-and-http': 'generic',
};

export function isIntegrationSlug(s) {
  return INTEGRATION_SLUGS.includes(s);
}

export function integrationSlugForAppKey(appKey) {
  const hit = Object.entries(SLUG_APP_I18N_KEY).find(([, v]) => v === appKey);
  if (!hit) throw new Error(`Unknown app key: ${appKey}`);
  return hit[0];
}
