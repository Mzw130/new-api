/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE, DOCS_CLOUD_ORIGIN } from './docs-brand'

const IMG = '/docs/cc-switch'
const GITHUB = 'https://github.com/farion1231/cc-switch'
const RELEASES = 'https://github.com/farion1231/cc-switch/releases'

export const CC_SWITCH_GUIDE_ZH = `
> **CC Switch** 是开源、跨平台的 AI CLI 统一管理工具，支持 Claude Code、Codex 与 Gemini CLI 的 Provider 配置一键切换。可通过 **${DOCS_BRAND}** 令牌页 **Deep Link** 一键填入。

## 核心特性

| 能力 | 说明 |
| --- | --- |
| Provider 管理 | 在 Claude / Codex / Gemini 的 API 配置间一键切换 |
| 多端点 | 每个 Provider 可配置多个端点，支持 API Key 与延迟测速 |
| 模型粒度 | Claude 支持 Haiku / Sonnet / Opus / Custom 四级模型 |
| MCP | 统一管理三端 MCP 服务器（stdio / HTTP / SSE） |
| 多平台 | Windows、macOS、Linux 桌面版；另有 Web 与 CLI 版本 |

- GitHub：[farion1231/cc-switch](${GITHUB})
- 下载：[GitHub Releases](${RELEASES})

## ${DOCS_BRAND} 接入方法

CC Switch 支持 \`ccswitch://\` Deep Link，可从 **1router** 控制台一键导入 Provider。

<div class="docs-platform-card">

### 配置步骤

<div class="docs-platform-body">

#### 1. 打开令牌页

登录 [API 密钥 / 令牌管理](/keys)，找到要导入的令牌。

#### 2. 选择 CC Switch

点击该令牌操作菜单中的 **CC Switch**（或「导入到 CC Switch」），浏览器会打开配置弹窗。

#### 3. 填写弹窗字段

- **应用**：顶部切换 **Claude** / **Codex** / **Gemini**
- **名称**：便于识别的配置名（如 \`My Claude\`）
- **主模型**（必填）：默认主力模型
- **Haiku / Sonnet / Opus**（Claude 可选）：按需在列表中选择

![1router 导入 CC Switch 弹窗](${IMG}/cc-switch-fill-dialog.png)

#### 4. 打开 CC Switch 并确认导入

点击 **打开 CC Switch**，客户端会弹出确认窗口，选择 **导入** 完成接入。

![CC Switch 确认导入](${IMG}/cc-switch-confirm-import.png)

> 端点地址由 **1router** 自动写入：Codex 使用 \`${DOCS_CLOUD_API_BASE}\`，Claude / Gemini 使用 \`${DOCS_CLOUD_ORIGIN}\`（与控制台 Deep Link 逻辑一致）。

</div>
</div>

## 安装方式

### macOS（Homebrew）

\`\`\`bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
\`\`\`

### Windows

从 [GitHub Releases](${RELEASES}) 下载 \`.msi\` 或便携版 \`.zip\`。

### Linux

从 [Releases](${RELEASES}) 下载 \`.deb\` 或 \`.AppImage\`；Arch 用户可使用 \`paru -S cc-switch-bin\`。

### Web 版（无头 / SSH）

\`\`\`bash
wget ${RELEASES}/latest/download/cc-switch-web-linux-x64.tar.gz
tar -xzf cc-switch-web-linux-x64.tar.gz
cd cc-switch-web/
./cc-switch-web
\`\`\`

默认端口 \`17666\`，浏览器访问 \`http://localhost:17666\`。

## 相关链接

- [GitHub 仓库](${GITHUB})
- [OpenAI 兼容接口](/docs/openai-compatible)
`.trim()

export const CC_SWITCH_GUIDE_EN = `
> **CC Switch** is an open-source, cross-platform AI CLI manager for Claude Code, Codex, and Gemini CLI. Import **${DOCS_BRAND}** providers via **Deep Link** from your API keys page.

## Highlights

| Area | Details |
| --- | --- |
| Providers | Switch Claude / Codex / Gemini API configs in one click |
| Endpoints | Multiple endpoints per provider, API keys, latency tests |
| Models | Claude: Haiku / Sonnet / Opus / Custom tiers |
| MCP | Unified MCP servers across all three CLIs |
| Platforms | Desktop (Win/macOS/Linux), Web, and CLI builds |

- GitHub: [farion1231/cc-switch](${GITHUB})
- Releases: [GitHub Releases](${RELEASES})

## Connect ${DOCS_BRAND}

CC Switch supports the \`ccswitch://\` protocol for one-click imports from **1router**.

<div class="docs-platform-card">

### Setup steps

<div class="docs-platform-body">

#### 1. Open API Keys

Go to [/keys](/keys) and pick the token you want to import.

#### 2. Choose CC Switch

In the token row menu, select **CC Switch** — a configuration dialog opens in the browser.

#### 3. Fill the dialog

- **App**: Claude / Codex / Gemini
- **Name**: e.g. \`My Claude\`
- **Primary model** (required)
- Optional Haiku / Sonnet / Opus for Claude

![Import dialog on 1router](${IMG}/cc-switch-fill-dialog.png)

#### 4. Confirm in CC Switch

Click **Open CC Switch**, then **Import** in the client confirmation dialog.

![Confirm import in CC Switch](${IMG}/cc-switch-confirm-import.png)

> Endpoints are filled automatically: Codex uses \`${DOCS_CLOUD_API_BASE}\`; Claude / Gemini use \`${DOCS_CLOUD_ORIGIN}\`.

</div>
</div>

## Install

### macOS

\`\`\`bash
brew tap farion1231/ccswitch
brew install --cask cc-switch
\`\`\`

### Windows / Linux

Download from [GitHub Releases](${RELEASES}) (\`.msi\`, \`.zip\`, \`.deb\`, or \`.AppImage\`).

### Web (headless / SSH)

\`\`\`bash
wget ${RELEASES}/latest/download/cc-switch-web-linux-x64.tar.gz
tar -xzf cc-switch-web-linux-x64.tar.gz && cd cc-switch-web && ./cc-switch-web
\`\`\`

Browse \`http://localhost:17666\`.

## Links

- [GitHub](${GITHUB})
- [OpenAI-compatible API](/docs/openai-compatible)
`.trim()

export function getCcSwitchGuideMarkdown(lang) {
  return lang.startsWith('zh') ? CC_SWITCH_GUIDE_ZH : CC_SWITCH_GUIDE_EN
}
