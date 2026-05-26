/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE } from './docs-brand'

export const OPENCLAW_GUIDE_ZH = `
> OpenClaw 是开源、自托管的个人 AI 助手平台，将 Telegram、Discord、WhatsApp 等消息应用连接到你自己的硬件上运行的代理。

## 项目介绍

- 官网：<https://openclaw.ai>
- 文档：<https://docs.openclaw.ai>
- 源码：<https://github.com/openclaw/openclaw>

本指南说明如何安装 OpenClaw，并将模型上游指向 **${DOCS_BRAND}**（OpenAI 兼容网关）。

## 核心特性

| 能力 | 说明 |
| --- | --- |
| 多渠道 | Telegram、Discord、Slack、WhatsApp、Signal、iMessage 等 |
| 自托管 | 数据与推理策略由你掌控 |
| 代理 | 浏览器控制、定时任务、会话隔离、多代理路由 |

## 接入前准备

建议先按 [OpenClaw Getting Started](https://docs.openclaw.ai/start/getting-started) 跑通 Gateway 与 Control UI，再配置模型提供商。

### 1. 安装 OpenClaw（macOS / Linux）

\`\`\`bash
curl -fsSL https://openclaw.ai/install.sh | bash
\`\`\`

### 2. 运行引导向导

\`\`\`bash
openclaw onboard
\`\`\`

按向导完成 Gateway、工作区与基础模型设置。

### 3. 检查 Gateway 与 Control UI

\`\`\`bash
openclaw gateway status
openclaw dashboard
\`\`\`

浏览器能打开 Control UI 即表示基础运行正常。此阶段无需先配置消息渠道。

### 4. 定位配置文件

默认路径：\`~/.openclaw/openclaw.json\`。

若使用专用服务账号，可通过 \`OPENCLAW_CONFIG_PATH\`、\`OPENCLAW_STATE_DIR\` 自定义目录，详见 [Environment Variables](https://docs.openclaw.ai/help/environment)。

## 使用 ${DOCS_BRAND} 作为模型提供商

OpenClaw 通过 \`models.providers\` 接入 OpenAI 兼容网关。推荐将 **${DOCS_BRAND}** 注册为自定义 provider，并把默认模型设为 \`router/模型ID\`（下文示例 provider 名为 \`router\`，可自定）。

### 接入思路

1. 在 [/keys](/keys) 签发 API Key。
2. 用环境变量保存密钥（勿写入 Git）。
3. 在 \`models.providers\` 下声明 provider。
4. 将 \`agents.defaults.model.primary\` 设为 \`router/模型名\`。

### 推荐：环境变量保存密钥

\`\`\`bash
export ROUTER_API_KEY="YOUR_API_KEY"
\`\`\`

在 \`openclaw.json\` 中追加或修改（示例）：

\`\`\`json
{
  "models": {
    "mode": "merge",
    "providers": {
      "router": {
        "baseUrl": "${DOCS_CLOUD_API_BASE}",
        "apiKey": "\${ROUTER_API_KEY}",
        "api": "openai-completions",
        "models": [
          { "id": "gpt-4o", "name": "GPT-4o" },
          { "id": "claude-sonnet-4", "name": "Claude Sonnet" }
        ]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": {
        "primary": "router/gpt-4o",
        "fallbacks": ["router/claude-sonnet-4"]
      },
      "models": {
        "router/gpt-4o": { "alias": "gpt4o" },
        "router/claude-sonnet-4": { "alias": "sonnet" }
      }
    }
  }
}
\`\`\`

| 配置项 | 说明 |
| --- | --- |
| \`models.mode\` | 建议 \`merge\`，保留内置 provider 并追加网关 |
| \`models.providers.*.baseUrl\` | 通常为 \`${DOCS_CLOUD_API_BASE}\` |
| \`models.providers.*.apiKey\` | 推荐 \`\${ROUTER_API_KEY}\` 形式注入 |
| \`models.providers.*.api\` | OpenAI 兼容网关使用 \`openai-completions\` |
| \`agents.defaults.model.primary\` | 格式 \`provider/model-id\` |

模型 \`id\` 必须与控制台 / [OpenAI 兼容接口](/docs/openai-compatible) 中可用的名称一致。

### 应用配置并验证

\`\`\`bash
openclaw gateway restart
openclaw models list
\`\`\`

在 Control UI 或已绑定的消息渠道中发起对话；若默认模型为 \`router/...\` 且回复正常，则接入成功。

## 排错

- **401 / 鉴权失败**：检查 \`ROUTER_API_KEY\` 与 provider 中的 \`apiKey\` 引用。
- **模型不存在**：\`primary\`、\`fallbacks\` 与 \`models.providers.router.models[].id\` 必须一致。
- **仍走官方 API**：确认 \`baseUrl\` 含 \`/v1\` 且 Gateway 已重启。

更多见 [各端指南](/docs/apps)。
`.trim()

export const OPENCLAW_GUIDE_EN = `
> OpenClaw is a self-hosted personal AI assistant that connects chat apps to agents on your own hardware.

## Overview

- Site: <https://openclaw.ai>
- Docs: <https://docs.openclaw.ai>
- Source: <https://github.com/openclaw/openclaw>

This guide wires OpenClaw to **${DOCS_BRAND}** as an OpenAI-compatible upstream.

## Highlights

| Area | Notes |
| --- | --- |
| Channels | Telegram, Discord, Slack, WhatsApp, and more |
| Self-hosted | You control data and routing |
| Agents | Browser control, cron, session isolation |

## Before you connect ${DOCS_BRAND}

Follow [Getting Started](https://docs.openclaw.ai/start/getting-started) until Gateway and Control UI work.

\`\`\`bash
curl -fsSL https://openclaw.ai/install.sh | bash
openclaw onboard
openclaw gateway status
openclaw dashboard
\`\`\`

Config file: \`~/.openclaw/openclaw.json\` (override with \`OPENCLAW_CONFIG_PATH\` if needed).

## ${DOCS_BRAND} as \`models.providers\`

1. Create an API key at [/keys](/keys).
2. Export \`ROUTER_API_KEY\` (do not commit secrets).
3. Add a custom provider pointing at \`${DOCS_CLOUD_API_BASE}\`.
4. Set \`agents.defaults.model.primary\` to \`router/<model-id>\`.

Example snippet:

\`\`\`json
{
  "models": {
    "mode": "merge",
    "providers": {
      "router": {
        "baseUrl": "${DOCS_CLOUD_API_BASE}",
        "apiKey": "\${ROUTER_API_KEY}",
        "api": "openai-completions",
        "models": [{ "id": "gpt-4o", "name": "GPT-4o" }]
      }
    }
  },
  "agents": {
    "defaults": {
      "model": { "primary": "router/gpt-4o" }
    }
  }
}
\`\`\`

Restart and verify:

\`\`\`bash
openclaw gateway restart
openclaw models list
\`\`\`

## Troubleshooting

- **401**: invalid or missing \`ROUTER_API_KEY\`.
- **Unknown model**: align \`primary\` with \`models.providers.*.models[].id\`.
- **Wrong host**: use \`${DOCS_CLOUD_API_BASE}\` and restart Gateway.

See [all guides](/docs/apps) and [OpenAI-compatible API](/docs/openai-compatible).
`.trim()
