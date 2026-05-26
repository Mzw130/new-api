/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { DOCS_CLOUD_ORIGIN } from '@/features/docs/guides/docs-brand'
import type { IntegrationSlug } from './integration-types'

export type GuideLang = 'zh' | 'en'

export type GuideCopy = { zh: string; en: string }

export type IntegrationGuideContent = {
  subtitle: GuideCopy
  officialUrl?: string
  officialLabel?: GuideCopy
  sections: {
    id: string
    title: GuideCopy
    params?: { field: GuideCopy; value: GuideCopy; hint?: GuideCopy }[]
    steps?: GuideCopy[]
    /** Screenshot or figure shown below the step at `afterStepIndex` (0-based). */
    stepFigures?: { afterStepIndex: number; src: string; alt: GuideCopy }[]
    bullets?: GuideCopy[]
  }[]
}

const CLOUD_BASE = 'https://1router.ai/v1'

function g(zh: string, en: string): GuideCopy {
  return { zh, en }
}

const CHERRY: IntegrationGuideContent = {
  subtitle: g(
    '桌面端多模型客户端。在提供商设置中填入网关地址、API 密钥与模型标识即可。',
    'Desktop multi-model client. Add an OpenAI-compatible provider with your gateway URL, API key, and model id.'
  ),
  officialUrl: 'https://www.cherry-ai.com/',
  officialLabel: g('Cherry Studio 官网', 'Cherry Studio website'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        {
          field: g('提供商类型', 'Provider type'),
          value: g('OpenAI 兼容 / 自定义', 'OpenAI compatible / Custom'),
        },
        {
          field: g('API 地址', 'API address'),
          value: g(CLOUD_BASE, CLOUD_BASE),
          hint: g('自建部署请改为你的 HTTPS 域名并保留 /v1', 'Self-hosted: your HTTPS origin + /v1'),
        },
        {
          field: g('API Key', 'API Key'),
          value: g('控制台「令牌 / API 密钥」页签发', 'Issue under API Keys in the console'),
        },
        {
          field: g('模型', 'Model'),
          value: g('与控制台 / Playground 展示的名称一致', 'Must match catalog / channel mapping'),
        },
      ],
    },
    {
      id: 'setup',
      title: g('配置步骤', 'Setup steps'),
      stepFigures: [
        {
          afterStepIndex: 0,
          src: '/docs/cherry-studio-01-copy-api-key.png',
          alt: g(
            '令牌管理页：在密钥列点击复制图标',
            'API Keys page: click the copy icon in the Key column'
          ),
        },
        {
          afterStepIndex: 1,
          src: '/docs/cherry-studio-02-providers.png',
          alt: g('Cherry Studio 模型服务 / Providers 页面', 'Cherry Studio Providers / Model services screen'),
        },
        {
          afterStepIndex: 2,
          src: '/docs/cherry-studio-03-add-provider.png',
          alt: g('新增自定义或 OpenAI Compatible 提供商', 'Add Custom or OpenAI Compatible provider'),
        },
        {
          afterStepIndex: 2,
          src: '/docs/cherry-studio-04-api-key-and-host.png',
          alt: g('填入 API Key 与 API Host', 'Enter API Key and API Host'),
        },
        {
          afterStepIndex: 3,
          src: '/docs/cherry-studio-05-fetch-model-list.png',
          alt: g('点击 Fetch Model List 获取模型列表', 'Click Fetch Model List to load models'),
        },
        {
          afterStepIndex: 4,
          src: '/docs/cherry-studio-06-add-models.png',
          alt: g('选择模型并点击添加', 'Select models and click Add'),
        },
        {
          afterStepIndex: 5,
          src: '/docs/cherry-studio-07-health-check.png',
          alt: g('健康检测按钮', 'Health check button'),
        },
        {
          afterStepIndex: 6,
          src: '/docs/cherry-studio-08-select-model.png',
          alt: g('对话中通过 @ 选择模型', 'Pick a model with @ in chat'),
        },
      ],
      steps: [
        g(
          '在 1router 控制台复制 API Key（令牌 / API 密钥页）。',
          'Copy your API key from the 1router console (API Keys / Tokens page).'
        ),
        g('打开 Cherry Studio → 模型服务 / Providers。', 'Open Cherry Studio → Providers / Model services.'),
        g('新增「自定义」或「OpenAI Compatible」提供商。', 'Add a Custom or OpenAI-compatible provider.'),
        g(
          '填入上方复制好的 API Key。\n输入 API Host：`https://1router.ai`\n点击 Fetch Model List 获取模型列表。',
          'Paste the API key you copied from the console.\nEnter API Host: `https://1router.ai`\nClick Fetch Model List to load the model list.'
        ),
        g('选择想使用的模型并点击添加。', 'Select the models you want and click Add.'),
        g('可点击健康检测按钮，测试配置是否正确。', 'Use Health check to verify the provider is configured correctly.'),
        g('在对话中点击 @ 按钮，选择要使用的模型。', 'In chat, click @ and choose a model to use.'),
      ],
    },
    {
      id: 'troubleshooting',
      title: g('排错', 'Troubleshooting'),
      bullets: [
        g('HTTP 401：缺少 Authorization 或密钥已作废。', 'HTTP 401: missing Authorization or revoked key.'),
        g('404 model：控制台未映射该模型，或密钥分组无权访问。', '404 model: mapping missing or key scope denied.'),
      ],
    },
  ],
}

/** Hub card summary; full guide at /docs/apps/cursor */
const CURSOR: IntegrationGuideContent = {
  subtitle: g(
    '在 Cursor 中覆盖 OpenAI Base URL，对接 1router.ai（需 Pro 订阅）。',
    'Override OpenAI Base URL in Cursor to use 1router.ai (Pro plan required).'
  ),
  officialUrl: 'https://cursor.com/download',
  officialLabel: g('下载 Cursor', 'Download Cursor'),
  sections: [
    {
      id: 'overview',
      title: g('说明', 'Overview'),
      bullets: [
        g(
          '完整图文步骤见本页；需 Cursor Pro 及以上方可启用自定义模型与 Base URL。',
          'See the illustrated guide on this page; custom models require Cursor Pro or higher.'
        ),
        g(
          `Base URL：${CLOUD_BASE}；API Key 在控制台签发。`,
          `Base URL: ${CLOUD_BASE}; issue API keys in the console.`
        ),
      ],
    },
  ],
}

/** Fallback summary for hub cards; full guide is markdown at /docs/apps/claude-code */
const CLAUDE: IntegrationGuideContent = {
  subtitle: g(
    '终端编程助手对接 1router.ai：Windows / macOS / Linux 图文安装与环境变量配置。',
    'Connect Claude Code to 1router.ai with illustrated Windows, macOS, and Linux setup guides.'
  ),
  officialUrl: 'https://www.anthropic.com/claude-code',
  officialLabel: g('Claude Code 官网', 'Claude Code website'),
  sections: [
    {
      id: 'overview',
      title: g('说明', 'Overview'),
      bullets: [
        g(
          '完整图文步骤（含截图）见本页正文；需设置 ANTHROPIC_BASE_URL 与 ANTHROPIC_API_KEY。',
          'See the full illustrated guide on this page; set ANTHROPIC_BASE_URL and ANTHROPIC_API_KEY.'
        ),
        g(
          `网关地址：${DOCS_CLOUD_ORIGIN}；API Key 在控制台签发。`,
          `Gateway: ${DOCS_CLOUD_ORIGIN}; issue API keys in the console.`
        ),
      ],
    },
  ],
}

const CODEX: IntegrationGuideContent = {
  subtitle: g(
    '通过环境变量 OPENAI_API_KEY 与 OPENAI_BASE_URL 指向 1router 网关。',
    'Point OPENAI_API_KEY and OPENAI_BASE_URL at your 1router gateway.'
  ),
  officialUrl: 'https://developers.openai.com/codex/',
  officialLabel: g('Codex CLI 文档', 'Codex CLI docs'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        { field: g('OPENAI_API_KEY', 'OPENAI_API_KEY'), value: g('控制台令牌', 'Console token') },
        { field: g('OPENAI_BASE_URL', 'OPENAI_BASE_URL'), value: g(CLOUD_BASE, CLOUD_BASE) },
      ],
    },
    {
      id: 'setup',
      title: g('环境变量示例', 'Environment example'),
      steps: [
        g(`export OPENAI_API_KEY='sk-…'`, `export OPENAI_API_KEY='sk-…'`),
        g(`export OPENAI_BASE_URL='${CLOUD_BASE}'`, `export OPENAI_BASE_URL='${CLOUD_BASE}'`),
        g('注意 shell / direnv 等工具的变量覆盖顺序。', 'Watch env precedence in shell managers.'),
      ],
    },
    {
      id: 'troubleshooting',
      title: g('排错', 'Troubleshooting'),
      bullets: [
        g('401：检查变量是否被其他 profile 覆盖。', '401: check env override in profiles.'),
        g('若工具硬编码 api.openai.com，需换用支持自定义 host 的版本。', 'Hard-coded OpenAI host requires a build that supports custom base URL.'),
      ],
    },
  ],
}

const OPENCLAW: IntegrationGuideContent = {
  subtitle: g(
    '将 1router 作为 OpenAI 兼容出口，统一计费和模型治理。',
    'Use 1router as an OpenAI-compatible upstream for bots and relays.'
  ),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        { field: g('HTTPS 根路径', 'HTTPS base'), value: g(CLOUD_BASE, CLOUD_BASE) },
        { field: g('鉴权', 'Auth'), value: g('Authorization: Bearer <token>', 'Authorization: Bearer <token>') },
        { field: g('模型 ID', 'Model id'), value: g('与控制台映射一致', 'Match console mapping') },
      ],
    },
    {
      id: 'setup',
      title: g('部署建议', 'Deployment'),
      bullets: [
        g('公网机器人勿将 Token 写入仓库；定期轮换密钥。', 'Never commit tokens; rotate keys on shared hosts.'),
        g('多租户建议按业务拆分多把子密钥便于审计。', 'Split API keys per tenant for auditing.'),
      ],
    },
  ],
}

const OPENCODE: IntegrationGuideContent = {
  subtitle: g(
    '通过交互式菜单或 opencode.json 接入 1router.ai。',
    'Connect via /connect or opencode.json to 1router.ai.'
  ),
  officialUrl: 'https://opencode.ai/docs',
  officialLabel: g('OpenCode 文档', 'OpenCode docs'),
  sections: [
    {
      id: 'overview',
      title: g('说明', 'Overview'),
      bullets: [
        g(
          '完整图文步骤见本页；支持 TUI `/connect` 与配置文件两种接入方式。',
          'See the full guide on this page; use `/connect` or config file.'
        ),
      ],
    },
  ],
}

const LOBE: IntegrationGuideContent = {
  subtitle: g(
    '在「兼容 OpenAI」设置中填写网关 HTTPS 前缀与密钥。',
    'Fill OpenAI-compatible host and API key in Lobe Chat settings.'
  ),
  officialUrl: 'https://lobehub.com/docs',
  officialLabel: g('LobeHub 文档', 'LobeHub docs'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        {
          field: g('接口地址', 'Endpoint'),
          value: g(CLOUD_BASE, CLOUD_BASE),
          hint: g('若 UI 自动拼接 /v1，则只填 origin', 'If UI appends /v1, use origin only'),
        },
        { field: g('API Key', 'API Key'), value: g('控制台签发', 'From console') },
      ],
    },
    {
      id: 'setup',
      title: g('配置步骤', 'Setup steps'),
      steps: [
        g('打开设置 → 语言模型 → OpenAI 兼容。', 'Settings → Language model → OpenAI compatible.'),
        g('按表单说明决定是否包含 /v1 后缀。', 'Follow form hint for trailing /v1.'),
        g('保存后新建会话并选择模型。', 'Save, new session, pick model.'),
      ],
    },
  ],
}

const CC_SWITCH: IntegrationGuideContent = {
  subtitle: g(
    '统一管理 Claude / Codex / Gemini CLI，支持从 1router 一键导入 Provider。',
    'Manage Claude / Codex / Gemini CLIs; one-click Provider import from 1router.'
  ),
  officialUrl: 'https://github.com/farion1231/cc-switch',
  officialLabel: g('CC Switch GitHub', 'CC Switch on GitHub'),
  sections: [
    {
      id: 'overview',
      title: g('说明', 'Overview'),
      bullets: [
        g(
          '完整图文步骤见本页；在 [/keys](/keys) 令牌菜单选择 CC Switch 即可 Deep Link 导入。',
          'See the full guide on this page; use CC Switch in the [/keys](/keys) row menu to import via Deep Link.'
        ),
      ],
    },
  ],
}

export const INTEGRATION_GUIDE_CONTENT: Record<
  IntegrationSlug,
  IntegrationGuideContent
> = {
  'cherry-studio': CHERRY,
  cursor: CURSOR,
  'claude-code': CLAUDE,
  'codex-cli': CODEX,
  openclaw: OPENCLAW,
  opencode: OPENCODE,
  lobechat: LOBE,
  'cc-switch': CC_SWITCH,
}

export function pickGuideLang(language: string): GuideLang {
  if (language?.toLowerCase().startsWith('zh')) return 'zh'
  return 'en'
}

export function tGuide(copy: GuideCopy, lang: GuideLang): string {
  return copy[lang]
}
