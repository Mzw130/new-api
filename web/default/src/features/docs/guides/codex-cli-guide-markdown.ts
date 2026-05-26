/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_BRAND, DOCS_CLOUD_API_BASE } from '@/features/docs/guides/docs-brand'

const IMG = '/docs/codex-cli'

export const CODEX_CLI_GUIDE_ZH = `
> Codex CLI 教程 — 将 OpenAI 终端编码助手对接 **${DOCS_BRAND}**。在仓库内通过补丁、Shell 与计划工具协作开发。

## 项目介绍

Codex CLI 是基于终端的交互式编码助理，用于在命令行中编辑代码、生成补丁并运行命令。

- 官方：<https://chatgpt.com/codex>
- 源码：<https://github.com/openai/codex>

## 效果演示

![Codex CLI 效果演示](${IMG}/introduce-01.png)

## 特性

| 功能分类 | 特性 |
| --- | --- |
| 终端式编码助手 | 在命令行中理解代码、生成补丁、运行命令 |
| 工具驱动架构 | \`apply_patch\`、\`shell\`、\`update_plan\`、\`multi_tool_use\` 等 |
| 原子补丁编辑 | 通过 \`apply_patch\` 原子地增删改文件，便于审计与回滚 |
| 沙箱与审批 | \`workspace-write\`、\`read-only\` 与 \`on-request\` 等策略 |
| 计划追踪 | \`update_plan\` 维护任务步骤，长流程可恢复 |

在 [/keys](/keys) 签发 API Key 后，按下方平台步骤配置。

## AI 模型配置方法

<div class="docs-platform-card">

### Windows 端图文指引

<div class="docs-platform-body">

> Windows 上 Codex CLI 需在 **WSL2** 中运行。以下在 PowerShell 准备环境，在 WSL 内安装与配置。

#### 1. 打开终端（Windows PowerShell）

以管理员或普通用户打开 **Windows PowerShell**（建议不要用 CMD）。

#### 2. 安装 WSL

在 PowerShell 中执行：

\`\`\`powershell
wsl --install
\`\`\`

按提示安装默认 Linux 发行版，**重启计算机** 后再继续。

![安装 WSL](${IMG}/windows-img-03.png)

#### 3. 安装 Codex CLI（WSL 内）

新开 PowerShell，进入 WSL：

\`\`\`powershell
wsl
\`\`\`

在 WSL 中安装 **Node.js 22**（示例使用 nvm）并全局安装 Codex：

\`\`\`bash
# 若未安装 nvm，可先按 https://github.com/nvm-sh/nvm 安装
nvm install 22
nvm use 22
npm install -g @openai/codex
codex --version
\`\`\`

![安装 Codex CLI](${IMG}/windows-img-06.png)

#### 4. 修改配置文件

在 WSL 中编辑 \`~/.codex/config.toml\`，将上游指向 **${DOCS_BRAND}**（在 [/keys](/keys) 获取 API Key）：

\`\`\`toml
model = "gpt-4o"
model_provider = "openai"

[model_providers.openai]
name = "OpenAI"
base_url = "${DOCS_CLOUD_API_BASE}"
api_key = "YOUR_API_KEY"
\`\`\`

将 \`YOUR_API_KEY\` 替换为你的令牌；\`model\` 填写控制台已映射的模型 ID。

保存后可在 WSL 中验证：

\`\`\`bash
cat ~/.codex/config.toml
\`\`\`

#### 5. 开始使用 Codex CLI

在 PowerShell 中启动 WSL，进入项目目录后运行：

\`\`\`powershell
wsl
\`\`\`

\`\`\`bash
cd /path/to/your/project
codex
\`\`\`

按 Enter 进入交互；首次运行按提示选择沙箱与文件修改授权（例如允许直接改文件或每次手动确认）。

<div class="docs-figure-grid">

![启动 WSL](${IMG}/windows-img-10.webp)

![Codex 对话](${IMG}/windows-img-11.webp)

![继续会话](${IMG}/windows-img-12.webp)

![终端界面](${IMG}/windows-img-13.webp)

![项目内使用](${IMG}/windows-img-14.webp)

</div>

> **注意**：配置 \`base_url\` 为 **${DOCS_CLOUD_API_BASE}** 后，请求经 **${DOCS_BRAND}** 转发，不再消耗 OpenAI 官方账号直连额度。

</div>
</div>

<div class="docs-platform-card">

### macOS 端图文指引

<div class="docs-platform-body">

#### 1. 安装 Homebrew（已安装可跳过）

\`\`\`bash
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"
\`\`\`

![Homebrew 安装](${IMG}/macos-img-02.webp)

#### 2. 安装 Node.js 环境

\`\`\`bash
brew install node
node --version
npm --version
\`\`\`

<div class="docs-figure-grid">

![Node.js 环境](${IMG}/macos-img-03.png)

</div>

#### 3. 安装 Codex CLI

\`\`\`bash
npm install -g @openai/codex
codex --version
\`\`\`

![安装 Codex CLI](${IMG}/macos-img-05.png)

#### 4. 修改配置文件

编辑 \`~/.codex/config.toml\`（字段同 Windows 一节），\`base_url\` 设为 \`${DOCS_CLOUD_API_BASE}\`，\`api_key\` 来自 [/keys](/keys)。

![配置文件](${IMG}/macos-img-06.png)

#### 5. 开始使用 Codex CLI

\`\`\`bash
cd /path/to/your/project
codex
\`\`\`

<div class="docs-figure-grid">

![macOS 启动](${IMG}/macos-img-07.png)

![macOS 对话](${IMG}/macos-img-09.png)

![macOS 终端](${IMG}/macos-img-10.png)

![macOS 会话](${IMG}/macos-img-11.png)

![macOS 继续](${IMG}/macos-img-12.png)

![macOS 项目](${IMG}/macos-img-13.png)

![macOS 使用](${IMG}/macos-img-14.png)

</div>

#### 6. macOS 常见问题

若系统阻止运行未签名二进制：打开「系统设置 → 隐私与安全性」，对 Codex 相关项选择「仍要打开」或「允许」。

权限不足时可尝试：\`sudo npm install -g @openai/codex\`（不推荐日常使用 sudo 安装全局包）。

</div>
</div>

<div class="docs-platform-card">

### Linux 端图文指引

<div class="docs-platform-body">

#### 1. 安装 Node.js 环境

\`\`\`bash
# Ubuntu / Debian 示例
curl -fsSL https://deb.nodesource.com/setup_22.x | sudo -E bash -
sudo apt-get install -y nodejs
node --version
npm --version
\`\`\`

<div class="docs-figure-grid">

![Linux Node.js](${IMG}/linux-img-01.webp)

![Linux 环境](${IMG}/linux-img-02.png)

</div>

#### 2. 安装 Codex CLI

\`\`\`bash
npm install -g @openai/codex
# 若权限不足：sudo npm install -g @openai/codex
codex --version
\`\`\`

![Linux 安装 Codex](${IMG}/linux-img-03.webp)

#### 3. 修改配置文件

编辑 \`~/.codex/config.toml\`，\`base_url\` 为 \`${DOCS_CLOUD_API_BASE}\`，\`api_key\` 来自 [/keys](/keys)（配置示例见 Windows 一节）。

![Linux 配置](${IMG}/linux-img-05.webp)

#### 4. 开始使用 Codex CLI

\`\`\`bash
cd /path/to/your/project
codex
\`\`\`

<div class="docs-figure-grid">

![Linux 启动](${IMG}/linux-img-06.webp)

![Linux 对话](${IMG}/linux-img-07.webp)

![Linux 终端](${IMG}/linux-img-08.webp)

![Linux 会话](${IMG}/linux-img-09.webp)

![Linux 使用](${IMG}/linux-img-10.webp)

</div>

#### 5. Linux 常见问题

缺少编译依赖时：

\`\`\`bash
# Ubuntu / Debian
sudo apt install build-essential
# CentOS / RHEL
sudo dnf groupinstall "Development Tools"
\`\`\`

环境变量或配置不生效时，确认编辑的是当前用户下的 \`~/.codex/config.toml\`，并重新打开终端。

</div>
</div>

## 排错

- **401**：\`api_key\` 无效或未保存；在 [/keys](/keys) 重新签发。
- **仍访问 api.openai.com**：确认 \`base_url\` 为 \`${DOCS_CLOUD_API_BASE}\`。
- **模型不可用**：\`model\` 须与控制台映射一致。

建议先用 [OpenAI 兼容接口](/docs/openai-compatible) 做 curl 验证，再启动 Codex CLI。
`.trim()

export const CODEX_CLI_GUIDE_EN = `
> Connect OpenAI Codex CLI to **${DOCS_BRAND}** — terminal coding with patches, shell tools, and plans.

## Overview

Codex CLI is an interactive terminal agent for editing code, generating patches, and running commands in your repo.

- Product: <https://chatgpt.com/codex>
- Source: <https://github.com/openai/codex>

## Demo

![Codex CLI demo](${IMG}/introduce-01.png)

## Features

| Area | Highlights |
| --- | --- |
| Terminal agent | Understand code, apply patches, run commands |
| Tools | \`apply_patch\`, \`shell\`, \`update_plan\`, and more |
| Sandboxing | \`workspace-write\`, \`read-only\`, approval modes |
| Planning | \`update_plan\` for multi-step workflows |

Create an API key at [/keys](/keys), then follow the platform guide below.

## Setup

<div class="docs-platform-card">

### Windows (WSL2)

<div class="docs-platform-body">

#### 1. Open PowerShell

#### 2. Install WSL

\`\`\`powershell
wsl --install
\`\`\`

Reboot, then \`wsl\`.

![WSL setup](${IMG}/windows-img-03.png)

#### 3. Install Codex CLI in WSL

\`\`\`bash
nvm install 22 && nvm use 22
npm install -g @openai/codex
codex --version
\`\`\`

![Install Codex](${IMG}/windows-img-06.png)

#### 4. Edit config

Edit \`~/.codex/config.toml\` in WSL; set \`base_url\` to \`${DOCS_CLOUD_API_BASE}\` and \`api_key\` from [/keys](/keys) (same TOML as the Chinese guide).

#### 5. Run

\`\`\`bash
cd /path/to/your/project
codex
\`\`\`

<div class="docs-figure-grid">

![Windows Codex](${IMG}/windows-img-10.webp)

![Windows chat](${IMG}/windows-img-11.webp)

</div>

</div>
</div>

<div class="docs-platform-card">

### macOS

<div class="docs-platform-body">

\`\`\`bash
brew install node
npm install -g @openai/codex
\`\`\`

Point \`~/.codex/config.toml\` at \`${DOCS_CLOUD_API_BASE}\` with your [/keys](/keys) token.

![macOS](${IMG}/macos-img-02.webp)

![macOS session](${IMG}/macos-img-05.png)

</div>
</div>

<div class="docs-platform-card">

### Linux

<div class="docs-platform-body">

\`\`\`bash
npm install -g @openai/codex
\`\`\`

Same \`config.toml\` as above. Install \`build-essential\` if native modules fail.

![Linux](${IMG}/linux-img-01.webp)

</div>
</div>

## Troubleshooting

- **401**: invalid API key in \`config.toml\`.
- **Wrong host**: use \`${DOCS_CLOUD_API_BASE}\`.
- **Model errors**: match gateway model ids.

See [OpenAI-compatible API](/docs/openai-compatible).
`.trim()
