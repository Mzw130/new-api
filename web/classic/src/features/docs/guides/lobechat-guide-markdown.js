/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE, DOCS_CLOUD_ORIGIN } from './docs-brand'

export const LOBECHAT_GUIDE_ZH = `
> [LobeHub / Lobe Chat](https://lobehub.com/) 是开源 Web 对话工作台。在「OpenAI 兼容」设置中填入 **${DOCS_BRAND}** 的接入点与密钥即可。

## 准备工作

1. 部署 [Lobe Chat](https://github.com/lobehub/lobe-chat) 或使用官方托管版。
2. 在 [/keys](/keys) 签发 API Key。

## 配置 ${DOCS_BRAND}

<div class="docs-platform-card">

### OpenAI 兼容提供商

<div class="docs-platform-body">

#### 1. 打开设置

进入 **设置 → 语言模型 → OpenAI**（或「自定义 OpenAI 兼容」）。

#### 2. 填写接入点

不同版本文案略有差异，按界面说明二选一：

| 表单说明 | 填写内容 |
| --- | --- |
| 要求完整 Base URL（含 \`/v1\`） | \`${DOCS_CLOUD_API_BASE}\` |
| 仅填域名、客户端自动拼接 \`/v1\` | \`${DOCS_CLOUD_ORIGIN}\` |

避免重复路径导致 \`404\` 或 \`double /v1\`。

#### 3. API Key

粘贴 [/keys](/keys) 中的令牌。

#### 4. 选择模型

在模型列表中选择控制台已映射的 ID（如 \`gpt-4o\`、\`claude-sonnet-4\`）。

</div>
</div>

## 环境变量部署（可选）

自托管时可在 \`.env\` 中配置（变量名以 Lobe Chat 当前版本文档为准）：

\`\`\`bash
OPENAI_API_KEY=YOUR_API_KEY
OPENAI_PROXY_URL=${DOCS_CLOUD_API_BASE}
\`\`\`

勿将密钥提交到公开仓库；生产环境使用 Secret / 环境变量注入。

## 排错

- **401**：检查密钥与是否启用了「自定义 API」。
- **模型列表为空**：确认 Base URL 正确，并用 [OpenAI 兼容接口](/docs/openai-compatible) 验证 \`/v1/models\`。
- **PWA / 多端**：同一密钥可在多设备共用，建议按团队拆分子密钥便于审计。

更多见 [各端指南](/docs/apps)。
`.trim()

export const LOBECHAT_GUIDE_EN = `
> [Lobe Chat](https://lobehub.com/) is an open web chat UI. Add **${DOCS_BRAND}** as an OpenAI-compatible provider.

## Prerequisites

1. Self-host [lobe-chat](https://github.com/lobehub/lobe-chat) or use a hosted instance.
2. API key from [/keys](/keys).

## Provider settings

<div class="docs-platform-card">

<div class="docs-platform-body">

Open **Settings → Language model → OpenAI** (or custom compatible provider).

| UI hint | Value |
| --- | --- |
| Full base URL with \`/v1\` | \`${DOCS_CLOUD_API_BASE}\` |
| Origin only (client adds \`/v1\`) | \`${DOCS_CLOUD_ORIGIN}\` |

Paste the API key, then pick a model id exposed by your gateway.

</div>
</div>

## Self-host env (optional)

\`\`\`bash
OPENAI_API_KEY=YOUR_API_KEY
OPENAI_PROXY_URL=${DOCS_CLOUD_API_BASE}
\`\`\`

Never commit secrets to git.

## Troubleshooting

- **401**: wrong or missing key.
- **Empty models**: fix base URL; test [/docs/openai-compatible](/docs/openai-compatible).
- **Teams**: issue separate sub-keys per environment.

See [all guides](/docs/apps).
`.trim()
