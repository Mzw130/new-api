/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE } from './docs-brand'

const IMG = '/docs/cursor'

export const CURSOR_GUIDE_ZH = `
> **注意**：仅 **Cursor Pro** 及以上订阅用户可配置自定义模型和自定义 Base URL，免费版会报错。

## 安装 Cursor

前往 [Cursor 官网](https://cursor.com/download) 下载并安装。Cursor 是目前流行的 AI 原生代码编辑器。

## 配置 ${DOCS_BRAND}

<div class="docs-platform-card">

### 配置步骤

<div class="docs-platform-body">

#### 1. 打开设置

在 Cursor 中点击右上角 **齿轮图标** → **Cursor Settings** → **Models** 页面。

#### 2. 配置 API Key 和 Base URL

1. 启用 **OpenAI API Key**，填入在 [/keys](/keys) 签发的 **${DOCS_BRAND}** 令牌（API Key）。
2. 启用 **Override OpenAI Base URL**，填写：

\`\`\`text
${DOCS_CLOUD_API_BASE}
\`\`\`

若界面会自动拼接 \`/v1\`，请勿重复填写路径段。

#### 3. 添加模型

在 **Add or search model** 输入框中输入要使用的模型名称（例如 \`gpt-4o\`、\`claude-sonnet-4\` 等），点击 **Add Custom Model**。

#### 4. 开始使用

在聊天面板（Composer / Chat）中选择刚添加的模型即可通过 **${DOCS_BRAND}** 转发请求。

</div>
</div>

### 配置效果图

以下是配置完成后的参考截图（点击可放大）：

![Cursor 配置效果图](${IMG}/cursor-setup.png)

## 常见问题

**报错** \`The model xxx does not work with your current plan or api key.\`

通常表示当前为 **Cursor 免费版**，免费版不支持自定义模型与 Base URL。请升级至 **Cursor Pro** 或以上订阅。

## 更多

- 先在 Playground 或 [OpenAI 兼容接口](/docs/openai-compatible) 用 curl 验证密钥与模型映射，再配置 Cursor。
- 团队环境建议每人使用独立子密钥。
`.trim()

export const CURSOR_GUIDE_EN = `
> **Note:** Custom models and **Override OpenAI Base URL** require **Cursor Pro** (or higher). The free plan will error if you enable them.

## Install Cursor

Download from the [Cursor website](https://cursor.com/download) and install the editor.

## Connect ${DOCS_BRAND}

<div class="docs-platform-card">

### Setup steps

<div class="docs-platform-body">

#### 1. Open settings

Click the **gear icon** (top-right) → **Cursor Settings** → **Models**.

#### 2. API Key and Base URL

1. Enable **OpenAI API Key** and paste your **${DOCS_BRAND}** token from [/keys](/keys).
2. Enable **Override OpenAI Base URL** and set:

\`\`\`text
${DOCS_CLOUD_API_BASE}
\`\`\`

Do not duplicate \`/v1\` if the form appends it automatically.

#### 3. Add a model

In **Add or search model**, type the model id you mapped in the console (e.g. \`gpt-4o\`, \`claude-sonnet-4\`), then **Add Custom Model**.

#### 4. Start chatting

Pick that model in Composer / Chat — traffic routes through **${DOCS_BRAND}**.

</div>
</div>

### Reference screenshot

![Cursor settings reference](${IMG}/cursor-setup.png)

## FAQ

**Error:** \`The model xxx does not work with your current plan or api key.\`

You are likely on the **free** Cursor plan, which blocks custom models. Upgrade to **Cursor Pro** or above.

## More

- Verify your key and model mapping via Playground or [OpenAI-compatible API](/docs/openai-compatible) before Cursor.
- Use per-user API keys in team setups.
`.trim()

export function getCursorGuideMarkdown(lang) {
  return lang.startsWith('zh') ? CURSOR_GUIDE_ZH : CURSOR_GUIDE_EN
}
