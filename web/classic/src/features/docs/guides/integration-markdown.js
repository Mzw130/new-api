/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later

Long-form onboarding copy for `/docs/apps/:slug` (zh + en).
Cloud base URL `https://1router.ai/v1`; self-hosters replace the host, keep `/v1`.
*/
import {
  CLAUDE_CODE_GUIDE_EN,
  CLAUDE_CODE_GUIDE_ZH,
} from './claude-code-guide-markdown'
import {
  CC_SWITCH_GUIDE_EN,
  CC_SWITCH_GUIDE_ZH,
} from './cc-switch-guide-markdown'
import {
  CODEX_CLI_GUIDE_EN,
  CODEX_CLI_GUIDE_ZH,
} from './codex-cli-guide-markdown'
import {
  OPENCODE_GUIDE_EN,
  OPENCODE_GUIDE_ZH,
} from './opencode-guide-markdown'
import { CURSOR_GUIDE_EN, CURSOR_GUIDE_ZH } from './cursor-guide-markdown'
import {
  LOBECHAT_GUIDE_EN,
  LOBECHAT_GUIDE_ZH,
} from './lobechat-guide-markdown'
import {
  OPENCLAW_GUIDE_EN,
  OPENCLAW_GUIDE_ZH,
} from './openclaw-guide-markdown'


const CLOUD_BASE = 'https://1router.ai/v1'

const CHERRY_ZH = [
  '# Cherry Studio × 1router.ai',
  '',
  '> [Cherry Studio](https://www.cherry-ai.com/) 是桌面端多模型客户端。将 **OpenAI 兼容**（或自定义提供商）填入下方三项即可。',
  '',
  '## 1. 在 1router.ai 准备的值',
  '',
  `- **Base URL**：\`${CLOUD_BASE}\`（自建请改为你的 HTTPS 来源 + \`/v1\`）。`,
  `- **API Key**：在 [/keys](/keys)（或令牌管理页）签发。`,
  '- **模型 ID**：必须与控制台 / Playground / 上游通道展示的名称一致。',
  '',
  '## 2. 客户端里怎么做',
  '',
  '1. 在 1router 控制台复制 **API Key**（[/console/token](/console/token) 或令牌管理页）。',
  '',
  '![令牌管理页复制密钥](/docs/cherry-studio-01-copy-api-key.png)',
  '',
  '2. 打开 Cherry Studio → **模型服务 / Providers**。',
  '',
  '![模型服务页面](/docs/cherry-studio-02-providers.png)',
  '',
  '3. 新增 **自定义** 或 **OpenAI Compatible** 提供商。',
  '',
  '![新增提供商](/docs/cherry-studio-03-add-provider.png)',
  '',
  '![填入 API Key 与 Host](/docs/cherry-studio-04-api-key-and-host.png)',
  '',
  '4. 填入上方复制好的 API Key；输入 API Host：`https://1router.ai`；点击 **Fetch Model List** 获取模型列表。',
  '',
  '![获取模型列表](/docs/cherry-studio-05-fetch-model-list.png)',
  '',
  '5. 选择想使用的模型并点击添加。',
  '',
  '![添加模型](/docs/cherry-studio-06-add-models.png)',
  '',
  '6. 可点击**健康检测**按钮，测试配置是否正确。',
  '',
  '![健康检测](/docs/cherry-studio-07-health-check.png)',
  '',
  '7. 在对话中点击 **@** 按钮，选择要使用的模型。',
  '',
  '![对话中选择模型](/docs/cherry-studio-08-select-model.png)',
  '',
  '## 3. 排错',
  '',
  '- `401`：缺少 `Authorization` 或密钥作废。',
  '- `404 model`：控制台未映射该模型或密钥分组无权访问。',
  '',
  '更多通用说明见 [各端指南目录](/docs/apps) 与 [OpenAI 兼容接口](/docs/openai-compatible)。',
].join('\n')

const CHERRY_EN = [
  '# Cherry Studio × 1router.ai',
  '',
  '> [Cherry Studio](https://www.cherry-ai.com/) is a desktop multi-model client. Add an **OpenAI-compatible** custom provider with the three values below.',
  '',
  '## 1. Values from 1router.ai',
  '',
  `- **Base URL**: \`${CLOUD_BASE}\` (self-hosted: your HTTPS origin + \`/v1\`).`,
  `- **API Key**: create one under [/keys](/keys).`,
  '- **Model id**: must match the catalog / channel mapping in your console.',
  '',
  '## 2. In Cherry Studio',
  '',
  '1. Copy your **API key** from the 1router console ([/console/token](/console/token) or API Keys).',
  '',
  '![Copy API key on the tokens page](/docs/cherry-studio-01-copy-api-key.png)',
  '',
  '2. Open **Providers / Model services**.',
  '',
  '![Providers screen](/docs/cherry-studio-02-providers.png)',
  '',
  '3. Add **Custom** or **OpenAI compatible** provider.',
  '',
  '![Add provider](/docs/cherry-studio-03-add-provider.png)',
  '',
  '![API Key and Host](/docs/cherry-studio-04-api-key-and-host.png)',
  '',
  '4. Paste the API key you copied from the console; enter API Host: `https://1router.ai`; click **Fetch Model List** to load models.',
  '',
  '![Fetch model list](/docs/cherry-studio-05-fetch-model-list.png)',
  '',
  '5. Select models and click **Add**.',
  '',
  '![Add models](/docs/cherry-studio-06-add-models.png)',
  '',
  '6. Run **Health check** to verify the setup.',
  '',
  '![Health check](/docs/cherry-studio-07-health-check.png)',
  '',
  '7. In chat, click **@** and choose a model.',
  '',
  '![Select model in chat](/docs/cherry-studio-08-select-model.png)',
  '',
  '## 3. Troubleshooting',
  '',
  '- `401`: missing / invalid bearer token.',
  '- `model not found`: mapping or key scope issue in the gateway.',
  '',
  'See also [all guides](/docs/apps) and [OpenAI-compatible reference](/docs/openai-compatible).',
].join('\n')

const CURSOR_ZH = CURSOR_GUIDE_ZH

const CURSOR_EN = CURSOR_GUIDE_EN

const CLAUDE_ZH = CLAUDE_CODE_GUIDE_ZH
const CLAUDE_EN = CLAUDE_CODE_GUIDE_EN

const CODEX_ZH = CODEX_CLI_GUIDE_ZH
const CODEX_EN = CODEX_CLI_GUIDE_EN
const OPENCLAW_ZH = OPENCLAW_GUIDE_ZH
const OPENCLAW_EN = OPENCLAW_GUIDE_EN
const LOBE_ZH = LOBECHAT_GUIDE_ZH
const LOBE_EN = LOBECHAT_GUIDE_EN

const CC_SWITCH_ZH = CC_SWITCH_GUIDE_ZH
const CC_SWITCH_EN = CC_SWITCH_GUIDE_EN

export const INTEGRATION_MARKDOWN = {
  'cherry-studio': { zh: CHERRY_ZH, en: CHERRY_EN },
  cursor: { zh: CURSOR_ZH, en: CURSOR_EN },
  'claude-code': { zh: CLAUDE_ZH, en: CLAUDE_EN },
  'codex-cli': { zh: CODEX_ZH, en: CODEX_EN },
  openclaw: { zh: OPENCLAW_ZH, en: OPENCLAW_EN },
  opencode: { zh: OPENCODE_GUIDE_ZH, en: OPENCODE_GUIDE_EN },
  lobechat: { zh: LOBE_ZH, en: LOBE_EN },
  'cc-switch': { zh: CC_SWITCH_ZH, en: CC_SWITCH_EN },
}

const OPENAPI_ZH = [
  '# API 文档',
  '',
  '> **1router.ai** 完整接口文档。云版 Base URL：`https://1router.ai/v1`；自建请替换域名并保留 `/v1` 前缀。',
  '',
  '## 概述',
  '',
  '**1router.ai** 提供完整的 RESTful API，主要分为 **AI 模型接口** 与 **控制台管理** 两类能力：',
  '',
  '- **AI 模型接口**：兼容 OpenAI API 格式，用于对话、图像、向量等模型调用。',
  '- **控制台管理**：在 [控制台](/console) 管理 API 密钥、渠道、额度与日志（浏览器会话鉴权，非 OpenAI Bearer）。',
  '',
  '## AI 模型接口',
  '',
  '下列接口兼容 OpenAI 客户端与 SDK，在 Header 中携带 `Authorization: Bearer <API Key>`（在 [API 密钥](/console/token) 页面创建）。',
  '',
  '### 模型列表',
  '',
  '获取当前账户可用的模型 ID。',
  '',
  '```http',
  'GET /v1/models',
  'Authorization: Bearer <your_api_key>',
  '```',
  '',
  '### 聊天',
  '',
  '对话补全（Chat Completions）。需要流式输出时，在请求体中设置 `stream: true`。',
  '',
  '```http',
  'POST /v1/chat/completions',
  'Content-Type: application/json',
  'Authorization: Bearer <your_api_key>',
  '',
  '{',
  '  "model": "gpt-4o-mini",',
  '  "messages": [{"role": "user", "content": "Hello"}],',
  '  "stream": false',
  '}',
  '```',
  '',
  '**请求体要点**',
  '',
  '- **model**：与控制台模型广场中的模型 ID 一致',
  '- **messages**：OpenAI 风格数组，每项含 `role`（如 `user` / `assistant`）与 `content`',
  '- **stream**：设为 `true` 时以 SSE 流式返回（若客户端支持）',
  '',
  '### 图像',
  '',
  '图像生成（若运营方已映射上游能力）：',
  '',
  '```http',
  'POST /v1/images/generations',
  '```',
  '',
  '### Embeddings',
  '',
  '```http',
  'POST /v1/embeddings',
  '```',
  '',
  '### 其它能力',
  '',
  '| 能力 | 方法 | 路径 |',
  '|------|------|------|',
  '| 语音转写 / TTS | POST | `/v1/audio/...` |',
  '',
  '具体路由是否可用取决于网关侧渠道配置。',
  '',
  '## 鉴权',
  '',
  '```http',
  'Authorization: Bearer <从控制台签发的 API Key>',
  '```',
  '',
  '## 相关文档',
  '',
  '- [接入 Agent 工具](/docs/apps)',
  '- [CC Switch 接入指南](/docs/apps/cc-switch)',
].join('\n')

const OPENAPI_EN = [
  '# API reference',
  '',
  '> Full **1router.ai** HTTP reference. Cloud base URL: `https://1router.ai/v1`. Self-hosters swap the host and keep `/v1`.',
  '',
  '## Overview',
  '',
  '**1router.ai** exposes RESTful APIs in two areas:',
  '',
  '- **AI model APIs** — OpenAI-compatible chat, images, embeddings, and more.',
  '- **Console administration** — manage keys, channels, quotas, and logs in the [console](/console) (session auth, not Bearer tokens).',
  '',
  '## AI model APIs',
  '',
  'Use `Authorization: Bearer <API Key>` from [/keys](/console/token). Compatible with OpenAI SDKs when `baseURL` points at your gateway.',
  '',
  '### Models',
  '',
  'List model IDs available to your account.',
  '',
  '```http',
  'GET /v1/models',
  'Authorization: Bearer <your_api_key>',
  '```',
  '',
  '### Chat',
  '',
  'Chat Completions. Set `stream: true` in the JSON body for SSE streaming when your client supports it.',
  '',
  '```http',
  'POST /v1/chat/completions',
  'Content-Type: application/json',
  'Authorization: Bearer <your_api_key>',
  '',
  '{',
  '  "model": "gpt-4o-mini",',
  '  "messages": [{"role": "user", "content": "Hello"}],',
  '  "stream": false',
  '}',
  '```',
  '',
  '**Payload notes**',
  '',
  '- **model** — use a model ID from your console catalog',
  '- **messages** — OpenAI-style `role` + `content` objects',
  '- **stream** — `true` for token streaming (SSE)',
  '',
  '### Images',
  '',
  '```http',
  'POST /v1/images/generations',
  '```',
  '',
  '### Embeddings',
  '',
  '```http',
  'POST /v1/embeddings',
  '```',
  '',
  '### Other routes',
  '',
  '| Capability | Method | Path |',
  '|------------|--------|------|',
  '| Audio | POST | `/v1/audio/...` |',
  '',
  'Availability depends on upstream channel mapping.',
  '',
  '## Authentication',
  '',
  '```http',
  'Authorization: Bearer <API key from console>',
  '```',
  '',
  '## Related',
  '',
  '- [Connect agent tools](/docs/apps)',
  '- [CC Switch guide](/docs/apps/cc-switch)',
].join('\n')

export const OPENAI_COMPATIBLE_MARKDOWN = {
  zh: OPENAPI_ZH,
  en: OPENAPI_EN,
}

export function pickLang(language) {
  if (language?.toLowerCase().startsWith('zh')) return 'zh'
  return 'en'
}

export function getIntegrationMarkdown(slug, language) {
  const lang = pickLang(language)
  return INTEGRATION_MARKDOWN[slug][lang]
}

export function getOpenAiCompatibleMarkdown(language) {
  return OPENAI_COMPATIBLE_MARKDOWN[pickLang(language)]
}
