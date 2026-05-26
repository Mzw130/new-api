/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_ORIGIN } from './docs-brand'

const IMG = '/docs/claude-code'

export const CLAUDE_CODE_GUIDE_ZH = `
> Claude Code 教程 — 将 Anthropic 的终端编程助手对接 **${DOCS_BRAND}**。支持代码理解、多文件编辑，集成 VS Code 与 JetBrains IDE。

## 项目介绍

直接在你的终端中释放 Claude 的强大能力。瞬间搜索百万行代码库。将耗时数小时的工作流程化为一条命令。

- 官方主页：<https://www.anthropic.com/claude-code>

## 特性

| 功能分类 | 特性 |
| --- | --- |
| 代码理解 | 深度代码库分析，利用智能代理搜索理解项目结构和依赖 |
| 代码编辑 | 支持多文件协同编辑，提供符合项目模式的代码建议 |
| 集成能力 | 终端直接运行；与 VS Code、JetBrains IDE 无缝集成 |
| 代码生成和优化 | 自动生成代码、创建测试、修复错误 |
| 安全与灵活性 | 改动需用户授权；适应你的代码规范 |
| 跨平台 | 支持 Windows、macOS、Linux |

## AI 模型配置方法

<div class="docs-platform-card">

### Windows 端图文指引

<div class="docs-platform-body">

#### 1. 安装 Node.js 环境

Claude Code 需要 Node.js 环境才能运行。

- 打开浏览器访问 <https://nodejs.org/>
- 下载并安装 **LTS** 版本（推荐长期支持版）
- 安装时保持默认设置即可

**Windows 注意事项**

- 建议使用 **PowerShell** 而不是 CMD
- 如遇权限问题，尝试以管理员身份运行

<div class="docs-figure-grid">

![Node.js 下载页面](${IMG}/windows-img-01.webp)

![Node.js 安装向导](${IMG}/windows-img-02.png)

![Node.js 安装完成](${IMG}/windows-img-03.webp)

![Node.js 验证](${IMG}/windows-img-05.png)

</div>

安装完成后，在 PowerShell 或 CMD 中执行：

\`\`\`powershell
node --version
npm --version
\`\`\`

若显示版本号，说明安装成功。

#### 2. 安装 Git Bash

Windows 下需通过 Git Bash 安装 Claude Code；**环境变量配置与日常使用仍在 PowerShell 或 CMD 中进行**。

- 访问 <https://git-scm.com/downloads/win> 下载并安装
- 安装过程保持默认设置，一路 **Next** 即可

![Git for Windows 安装](${IMG}/windows-img-08.png)

在 Git Bash 中验证：

\`\`\`bash
git --version
\`\`\`

#### 3. 安装 Claude Code

在 **PowerShell** 中执行：

\`\`\`powershell
npm install -g @anthropic-ai/claude-code
\`\`\`

若安装程序提示将 \`~/.local/bin\` 加入 PATH，可执行：

\`\`\`powershell
[Environment]::SetEnvironmentVariable('Path', ([Environment]::GetEnvironmentVariable('Path','User') + ";$HOME\\.local\\bin"), 'User')
\`\`\`

![安装 Claude Code](${IMG}/windows-img-09.webp)

验证安装：

\`\`\`powershell
claude --version
\`\`\`

#### 4. 设置环境变量

在 **1router** 控制台 [/keys](/keys) 签发 API Key 后，将 Claude Code 指向 **${DOCS_CLOUD_ORIGIN}**：

\`\`\`powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', '${DOCS_CLOUD_ORIGIN}', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'YOUR_API_KEY', 'User')
\`\`\`

将 \`YOUR_API_KEY\` 替换为你的令牌。修改后请**重新打开** PowerShell。

#### 5. 开始使用 Claude Code

\`\`\`powershell
claude
\`\`\`

在项目中使用：

\`\`\`powershell
cd C:\\path\\to\\your\\project
claude
\`\`\`

<div class="docs-figure-grid">

![启动 Claude Code](${IMG}/windows-img-11.png)

![Claude Code 对话界面](${IMG}/windows-img-12.webp)

![项目内使用](${IMG}/windows-img-13.webp)

![继续对话](${IMG}/windows-img-14.png)

</div>

选择模型（可选）：

\`\`\`
/model
\`\`\`

![选择模型](${IMG}/windows-img-16.png)

![模型列表](${IMG}/windows-img-17.png)

> **注意**：设置 \`ANTHROPIC_BASE_URL\` 后，所有模型请求将走 **${DOCS_BRAND}** 接入点，不再消耗 Anthropic 官方账号额度。

</div>
</div>

<div class="docs-platform-card">

### macOS 端图文指引

<div class="docs-platform-body">

#### 1. 安装 Claude Code CLI

在「终端.app」中执行：

\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

若提示将 \`~/.local/bin\` 加入 PATH：

\`\`\`bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
\`\`\`

![macOS 安装 Claude Code](${IMG}/macos-img-02.png)

#### 2. 设置环境变量

在 [/keys](/keys) 获取 API Key 后写入 shell 配置：

\`\`\`bash
export ANTHROPIC_BASE_URL="${DOCS_CLOUD_ORIGIN}"
export ANTHROPIC_API_KEY="YOUR_API_KEY"
\`\`\`

建议追加到 \`~/.zshrc\` 或 \`~/.bashrc\`，然后执行 \`source ~/.zshrc\`。

验证：

\`\`\`bash
claude --version
\`\`\`

#### 3. 开始使用 Claude Code

\`\`\`bash
claude
\`\`\`

\`\`\`bash
cd /path/to/your/project
claude
\`\`\`

<div class="docs-figure-grid">

![macOS 启动 Claude Code](${IMG}/macos-img-04.png)

![macOS 对话界面](${IMG}/macos-img-05.png)

![macOS 项目使用](${IMG}/macos-img-08.png)

</div>

\`/model\` 可选，用于切换模型。

> **注意**：修改 \`ANTHROPIC_BASE_URL\` 后，请求均经 **${DOCS_BRAND}** 转发。

#### 4. macOS 常见问题

若系统阻止运行：打开「系统设置 → 隐私与安全性」，点击「仍要打开」或「允许」。

</div>
</div>

<div class="docs-platform-card">

### Linux 端图文指引

<div class="docs-platform-body">

#### 1. 安装 Claude Code

\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

如遇权限问题：

\`\`\`bash
sudo curl -fsSL https://claude.ai/install.sh | bash
\`\`\`

![Linux 安装 Claude Code](${IMG}/linux-img-01.png)

\`\`\`bash
claude --version
\`\`\`

#### 2. 设置环境变量

\`\`\`bash
export ANTHROPIC_BASE_URL="${DOCS_CLOUD_ORIGIN}"
export ANTHROPIC_API_KEY="YOUR_API_KEY"
\`\`\`

写入 \`~/.bashrc\` 或 \`~/.zshrc\` 后 \`source\` 生效。

#### 3. 开始使用 Claude Code

\`\`\`bash
claude
cd /path/to/your/project && claude
\`\`\`

![Linux 使用 Claude Code](${IMG}/linux-img-04.png)

\`/model\` 可选。

> **注意**：设置 \`ANTHROPIC_BASE_URL\` 后走 **${DOCS_BRAND}** 接入点。

#### 4. Linux 常见问题

缺少依赖时：

\`\`\`bash
# Ubuntu/Debian
sudo apt install build-essential
# CentOS/RHEL
sudo dnf groupinstall "Development Tools"
\`\`\`

环境变量不生效时：确认修改了正确的 rc 文件，重启终端或 \`source ~/.bashrc\`，并用 \`echo $ANTHROPIC_BASE_URL\` 验证。

</div>
</div>

## 排错

- \`401\`：\`ANTHROPIC_API_KEY\` 未设置或已失效，请在 [/keys](/keys) 重新签发。
- 模型不可用：确认控制台已映射对应 Claude 模型且密钥有权限。

更多说明见 [各端指南](/docs/apps) 与 [OpenAI 兼容接口](/docs/openai-compatible)。
`.trim()

export const CLAUDE_CODE_GUIDE_EN = `
> Connect Anthropic's terminal coding assistant to **${DOCS_BRAND}** — code understanding, multi-file edits, and IDE integrations.

## Overview

Run Claude in your terminal, search large codebases, and automate multi-step workflows.

- Official site: <https://www.anthropic.com/claude-code>

## Features

| Area | Highlights |
| --- | --- |
| Code understanding | Deep repo analysis and dependency-aware search |
| Editing | Multi-file edits aligned with your project patterns |
| Integration | Terminal-first; VS Code and JetBrains support |
| Generation | Tests, fixes, and end-to-end flows |
| Safety | Explicit approval for file/command changes |
| Platforms | Windows, macOS, Linux |

## Setup

<div class="docs-platform-card">

### Windows

<div class="docs-platform-body">

#### 1. Install Node.js

Claude Code requires Node.js.

- Visit <https://nodejs.org/> and install the **LTS** build
- Keep default installer options

**Tips:** Prefer **PowerShell** over CMD; run as administrator if you hit permission errors.

<div class="docs-figure-grid">

![Node.js download](${IMG}/windows-img-01.webp)

![Node.js installer](${IMG}/windows-img-02.png)

![Node.js setup](${IMG}/windows-img-03.webp)

![Verify Node.js](${IMG}/windows-img-05.png)

</div>

Verify:

\`\`\`powershell
node --version
npm --version
\`\`\`

#### 2. Install Git Bash

Use Git Bash for the Claude Code install; configure env vars and daily use in PowerShell/CMD.

- <https://git-scm.com/downloads/win> — install with defaults

![Git for Windows](${IMG}/windows-img-08.png)

\`\`\`bash
git --version
\`\`\`

#### 3. Install Claude Code

\`\`\`powershell
npm install -g @anthropic-ai/claude-code
\`\`\`

Optional PATH fix:

\`\`\`powershell
[Environment]::SetEnvironmentVariable('Path', ([Environment]::GetEnvironmentVariable('Path','User') + ";$HOME\\.local\\bin"), 'User')
\`\`\`

![Install Claude Code](${IMG}/windows-img-09.webp)

\`\`\`powershell
claude --version
\`\`\`

#### 4. Environment variables

Create an API key under [/keys](/keys), then point Claude Code at **${DOCS_CLOUD_ORIGIN}**:

\`\`\`powershell
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_BASE_URL', '${DOCS_CLOUD_ORIGIN}', 'User')
[System.Environment]::SetEnvironmentVariable('ANTHROPIC_API_KEY', 'YOUR_API_KEY', 'User')
\`\`\`

Restart PowerShell after changing user env vars.

#### 5. Run Claude Code

\`\`\`powershell
claude
cd C:\\path\\to\\your\\project
claude
\`\`\`

<div class="docs-figure-grid">

![Launch on Windows](${IMG}/windows-img-11.png)

![Chat UI](${IMG}/windows-img-12.webp)

![Project session](${IMG}/windows-img-13.webp)

![Continue](${IMG}/windows-img-14.png)

</div>

Optional: \`/model\` to pick a model.

![Model picker](${IMG}/windows-img-16.png)

![Model list](${IMG}/windows-img-17.png)

> After setting \`ANTHROPIC_BASE_URL\`, requests go through **${DOCS_BRAND}**, not Anthropic account quota.

</div>
</div>

<div class="docs-platform-card">

### macOS

<div class="docs-platform-body">

#### 1. Install CLI

\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
echo 'export PATH="$HOME/.local/bin:$PATH"' >> ~/.zshrc && source ~/.zshrc
\`\`\`

![macOS install](${IMG}/macos-img-02.png)

#### 2. Environment variables

\`\`\`bash
export ANTHROPIC_BASE_URL="${DOCS_CLOUD_ORIGIN}"
export ANTHROPIC_API_KEY="YOUR_API_KEY"
\`\`\`

Persist in \`~/.zshrc\` or \`~/.bashrc\`, then \`claude --version\`.

#### 3. Usage

\`\`\`bash
claude
cd /path/to/your/project && claude
\`\`\`

<div class="docs-figure-grid">

![macOS launch](${IMG}/macos-img-04.png)

![macOS chat](${IMG}/macos-img-05.png)

![macOS project](${IMG}/macos-img-08.png)

</div>

> All models route via **${DOCS_BRAND}** once \`ANTHROPIC_BASE_URL\` is set.

#### 4. macOS troubleshooting

If Gatekeeper blocks the binary: System Settings → Privacy & Security → Allow.

</div>
</div>

<div class="docs-platform-card">

### Linux

<div class="docs-platform-body">

#### 1. Install

\`\`\`bash
curl -fsSL https://claude.ai/install.sh | bash
claude --version
\`\`\`

![Linux install](${IMG}/linux-img-01.png)

#### 2. Environment variables

\`\`\`bash
export ANTHROPIC_BASE_URL="${DOCS_CLOUD_ORIGIN}"
export ANTHROPIC_API_KEY="YOUR_API_KEY"
\`\`\`

#### 3. Usage

\`\`\`bash
claude
cd /path/to/your/project && claude
\`\`\`

![Linux session](${IMG}/linux-img-04.png)

#### 4. Linux troubleshooting

Install build tools if needed (\`build-essential\` / \`Development Tools\`). If env vars do not apply, \`source\` the correct rc file and run \`echo $ANTHROPIC_BASE_URL\`.

</div>
</div>

## Troubleshooting

- \`401\`: missing or invalid \`ANTHROPIC_API_KEY\` — reissue under [/keys](/keys).
- Model errors: check channel mapping and key scope in the console.

See [all guides](/docs/apps) and [OpenAI-compatible API](/docs/openai-compatible).
`.trim()

export function getClaudeCodeGuideMarkdown(lang) {
  return lang.startsWith('zh') ? CLAUDE_CODE_GUIDE_ZH : CLAUDE_CODE_GUIDE_EN
}
