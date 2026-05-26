/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License version 3.
*/
export type IntegrationSlug =
  | 'cherry-studio'
  | 'cursor'
  | 'claude-code'
  | 'codex-cli'
  | 'openclaw'
  | 'opencode'
  | 'lobechat'
  | 'cc-switch'

/** Route order matches hub cards */
export const INTEGRATION_SLUGS: IntegrationSlug[] = [
  'cherry-studio',
  'cursor',
  'claude-code',
  'codex-cli',
  'openclaw',
  'opencode',
  'lobechat',
  'cc-switch',
]

/** Keys under `docs.integration.apps.<key>.*` in locale JSON */
export const SLUG_APP_I18N_KEY: Record<
  IntegrationSlug,
  | 'cherry'
  | 'cursor'
  | 'claudeCode'
  | 'codex'
  | 'openclaw'
  | 'opencode'
  | 'lobechat'
  | 'ccSwitch'
> = {
  'cherry-studio': 'cherry',
  cursor: 'cursor',
  'claude-code': 'claudeCode',
  'codex-cli': 'codex',
  openclaw: 'openclaw',
  opencode: 'opencode',
  lobechat: 'lobechat',
  'cc-switch': 'ccSwitch',
}

export function isIntegrationSlug(s: string): s is IntegrationSlug {
  return (INTEGRATION_SLUGS as readonly string[]).includes(s)
}

export function integrationSlugForAppKey(
  appKey: (typeof SLUG_APP_I18N_KEY)[IntegrationSlug]
): IntegrationSlug {
  const hit = (
    Object.entries(SLUG_APP_I18N_KEY) as [IntegrationSlug, string][]
  ).find(([, v]) => v === appKey)
  if (!hit) throw new Error(`Unknown app key: ${appKey}`)
  return hit[0]
}
