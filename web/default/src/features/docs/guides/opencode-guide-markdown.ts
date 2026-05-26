/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE } from '@/features/docs/guides/docs-brand'

export const OPENCODE_GUIDE_ZH = `
> OpenCode 教程 — 开源终端 AI 编程智能体，兼容 75+ 供应商。通过交互式菜单或配置文件接入 **${DOCS_BRAND}**。

## 项目介绍

OpenCode 是一款开源的终端 AI 编程智能体，支持 TUI / CLI 双模式，内置 \`@ai-sdk/anthropic\` 与 \`@ai-sdk/openai-compatible\` 适配器，可接入 **${DOCS_BRAND}** 的 Anthropic 协议与 OpenAI 兼容模型。

- 官网：<https://opencode.ai>
- GitHub：<https://github.com/opencode-ai/opencode>

## 接入前准备

- 已安装 [OpenCode](https://opencode.ai)
- **Base URL** 须以 \`/v1\` 结尾：\`${DOCS_CLOUD_API_BASE}\`
- 在 [/keys](/keys) 签发 API Key
- 模型 ID 须与控制台完全一致（如 \`claude-sonnet-4-6\`、\`deepseek-v4-pro\`、\`gpt-5.5\` 等）

## 方式一：交互式配置（推荐新手）

在 OpenCode TUI 中通过菜单添加 **${DOCS_BRAND}**：

1. 启动 OpenCode TUI
2. 输入 \`/connect\`
3. 在供应商列表中选择 **Other**（自定义端点）
4. 填写：
   - **Base URL**：\`${DOCS_CLOUD_API_BASE}\`
   - **API Key**：你的 [/keys](/keys) 令牌
5. 保存后输入 \`/models\` 切换模型

## 方式二：配置文件（推荐长期使用）

适合锁定多模型、跨项目复用的场景。

### 1. 编辑 OpenCode 配置

配置文件位置：

- **全局**：\`~/.config/opencode/opencode.json\`
- **项目级**（优先级更高）：项目根目录 \`opencode.json\`

将 \`YOUR_API_KEY\` 替换为 [/keys](/keys) 中的令牌；\`models\` 中的 ID 须与控制台一致。

\`\`\`json
{
  "$schema": "https://opencode.ai/config.json",
  "provider": {
    "router-anthropic": {
      "npm": "@ai-sdk/anthropic",
      "name": "${DOCS_BRAND} (Anthropic)",
      "options": {
        "baseURL": "${DOCS_CLOUD_API_BASE}",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "claude-sonnet-4-6": {
          "name": "Claude Sonnet 4.6"
        },
        "claude-haiku-4-5": {
          "id": "claude-haiku-4-5",
          "name": "Claude Haiku 4.5 (fast)"
        }
      }
    },
    "router": {
      "npm": "@ai-sdk/openai-compatible",
      "name": "${DOCS_BRAND}",
      "options": {
        "baseURL": "${DOCS_CLOUD_API_BASE}",
        "apiKey": "YOUR_API_KEY"
      },
      "models": {
        "deepseek-v4-pro": { "name": "DeepSeek V4 Pro" },
        "deepseek-v4-flash": { "name": "DeepSeek V4 Flash" },
        "gpt-5.5": { "name": "GPT-5.5" }
      }
    }
  },
  "model": "router-anthropic/claude-sonnet-4-6",
  "autoshare": false
}
\`\`\`

> **关键说明**
>
> - \`router-anthropic\`：\`npm\` 必须为 \`@ai-sdk/anthropic\`，用于 Claude 等 Anthropic 协议模型
> - \`router\`：\`npm\` 必须为 \`@ai-sdk/openai-compatible\`，用于 DeepSeek、GPT 等 OpenAI 兼容模型
> - 两个 provider 的 \`baseURL\` 均为 \`${DOCS_CLOUD_API_BASE}\`
> - 顶层 \`model\` 格式为 \`<provider>/<model-id>\`
> - 项目级 \`opencode.json\` 优先于全局配置

### 2. 配置 API Key

示例已在 \`options.apiKey\` 中内嵌密钥。若不想写入配置文件，可删除 \`apiKey\` 字段，改为编辑 \`~/.local/share/opencode/auth.json\`：

\`\`\`json
{
  "router-anthropic": {
    "type": "api",
    "key": "YOUR_API_KEY"
  },
  "router": {
    "type": "api",
    "key": "YOUR_API_KEY"
  }
}
\`\`\`

或执行：

\`\`\`bash
opencode auth login
\`\`\`

## 第三步：验证接入

启动 OpenCode 后输入 \`/models\`，应能看到 \`router-anthropic/claude-sonnet-4-6\`、\`router/deepseek-v4-pro\` 等条目。选择模型并发送测试消息，收到正常回复即成功。

## 常见问题

| 问题 | 解决方案 |
| --- | --- |
| \`/models\` 看不到 ${DOCS_BRAND} 模型 | 检查 \`provider.*.models\` 是否非空 |
| 提示模型不存在 | 模型 ID 须与控制台完全一致 |
| API Key 无效 | 检查 \`apiKey\` 或 \`auth.json\`；可重跑 \`opencode auth login\` |
| Claude 报协议错误 | 须用 \`router-anthropic\`（\`@ai-sdk/anthropic\`），勿用 \`router\` |
| 修改配置未生效 | 重启 OpenCode；项目级配置优先 |

更多见 [OpenAI 兼容接口](/docs/openai-compatible)。
`.trim()

export const OPENCODE_GUIDE_EN = `
> Connect [OpenCode](https://opencode.ai) to **${DOCS_BRAND}** — open-source terminal agent with 75+ provider adapters.

## Overview

- Site: <https://opencode.ai>
- Source: <https://github.com/opencode-ai/opencode>

## Prerequisites

- OpenCode installed
- Base URL: \`${DOCS_CLOUD_API_BASE}\`
- API key from [/keys](/keys)
- Model IDs must match your console exactly

## Method 1: Interactive (TUI)

1. Start OpenCode TUI
2. Run \`/connect\`
3. Choose **Other**
4. Base URL \`${DOCS_CLOUD_API_BASE}\`, API key from [/keys](/keys)
5. \`/models\` to pick a model

## Method 2: Config file

Edit \`~/.config/opencode/opencode.json\` or project \`opencode.json\`.

Use providers \`router-anthropic\` (\`@ai-sdk/anthropic\`) and \`router\` (\`@ai-sdk/openai-compatible\`) with \`baseURL\` \`${DOCS_CLOUD_API_BASE}\`. See the Chinese guide for the full JSON example.

Default model example: \`router-anthropic/claude-sonnet-4-6\`.

## Verify

\`/models\` should list \`router-anthropic/...\` and \`router/...\`. Send a test prompt.

## FAQ

| Issue | Fix |
| --- | --- |
| No models in \`/models\` | Fill \`provider.*.models\` |
| Unknown model | Match console model IDs |
| Invalid key | Fix \`apiKey\` or \`auth.json\` |
| Claude protocol error | Use \`router-anthropic\`, not \`router\` |

See [OpenAI-compatible API](/docs/openai-compatible).
`.trim()
