/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
const CLOUD_BASE = 'https://1router.ai/v1'

function g(zh, en) {
  return { zh, en }
}

const CHERRY = {
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
      steps: [
        g('打开 Cherry Studio → 模型服务 / Providers。', 'Open Cherry Studio → Providers / Model services.'),
        g('新增「自定义」或「OpenAI Compatible」提供商。', 'Add a Custom or OpenAI-compatible provider.'),
        g(`API 地址填 ${CLOUD_BASE}（若界面会自动拼接 /v1，请勿重复填写）。`, `Set API address to ${CLOUD_BASE} (do not duplicate /v1 if the UI appends it).`),
        g('将密钥粘贴到 Password / Token 字段并保存。', 'Paste the API key into the token field and save.'),
        g('在对话中选择对应模型前缀，或手动输入模型标识。', 'Pick the model prefix in chat or type the model id.'),
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

const CURSOR = {
  subtitle: g(
    '在模型设置中覆盖 OpenAI 兼容 Base URL，将请求转发至 1router.ai。',
    'Override the OpenAI-compatible base URL in model settings to route through 1router.ai.'
  ),
  officialUrl: 'https://cursor.com/docs',
  officialLabel: g('Cursor 文档', 'Cursor documentation'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        {
          field: g('Base URL', 'Base URL'),
          value: g(CLOUD_BASE, CLOUD_BASE),
        },
        {
          field: g('API Key', 'API Key'),
          value: g('1router 控制台签发的令牌', 'Token from 1router console'),
        },
        {
          field: g('模型', 'Model'),
          value: g('与后台通道映射一致的模型名', 'Model id matching upstream mapping'),
        },
      ],
    },
    {
      id: 'setup',
      title: g('配置步骤', 'Setup steps'),
      steps: [
        g('打开 Settings → Models（或 Cursor Settings → AI → OpenAI API）。', 'Open Settings → Models (or Cursor Settings → AI → OpenAI API).'),
        g(`将 Custom / Override base URL 设为 ${CLOUD_BASE}。`, `Set custom / override base URL to ${CLOUD_BASE}.`),
        g('填入控制台签发的 API Key。', 'Paste your API key from the console.'),
        g('若需二选一官方 Key，请关闭官方槽位，仅保留自定义网关。', 'If the UI forces official vs custom, disable official and keep custom only.'),
        g('在 Composer / Chat 中选择正确模型。', 'Select the correct model in Composer / Chat.'),
      ],
    },
    {
      id: 'tips',
      title: g('建议', 'Tips'),
      bullets: [
        g('先用 Playground 或 curl 验证链路，再配置 Cursor。', 'Verify with Playground or curl before Cursor.'),
        g('团队环境建议每人使用独立子密钥。', 'Use per-user API keys in team setups.'),
      ],
    },
  ],
}

const CLAUDE = {
  subtitle: g(
    '通过 OpenAI 兼容网关字段接入，同一套密钥可复用多种上游模型。',
    'Connect via OpenAI-compatible gateway fields; one key can cover multiple upstream models.'
  ),
  officialUrl: 'https://www.anthropic.com/claude-code',
  officialLabel: g('Claude Code', 'Claude Code'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        { field: g('Base URL', 'Base URL'), value: g(CLOUD_BASE, CLOUD_BASE) },
        { field: g('API Key', 'API Key'), value: g('控制台签发', 'From console API Keys') },
        { field: g('模型', 'Model'), value: g('以控制台展示为准', 'As shown in console') },
      ],
    },
    {
      id: 'setup',
      title: g('配置步骤', 'Setup steps'),
      steps: [
        g('在客户端选择 Custom provider / OpenAI-compatible 入口。', 'Choose custom provider or OpenAI-compatible entry.'),
        g(`API host / Base URL 填写 ${CLOUD_BASE}。`, `Set API host / base URL to ${CLOUD_BASE}.`),
        g('Bearer 鉴权填入控制台令牌。', 'Use Bearer auth with your console token.'),
        g('用简短提示词验证连通性。', 'Validate with a short test prompt.'),
      ],
    },
    {
      id: 'note',
      title: g('协议说明', 'Protocol note'),
      bullets: [
        g('若网关仅暴露 /v1/chat/completions 等 OpenAI 路由，请选择 OpenAI compatible 模式。', 'If only OpenAI-style /v1 routes are exposed, pick OpenAI-compatible mode.'),
      ],
    },
  ],
}

const CODEX = {
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

const OPENCLAW = {
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

const CONTINUE = {
  subtitle: g(
    '在 Continue 插件中新增 OpenAI 兼容 REST 提供商。',
    'Add an OpenAI-compatible REST provider in Continue.'
  ),
  officialUrl: 'https://docs.continue.dev/',
  officialLabel: g('Continue 文档', 'Continue docs'),
  sections: [
    {
      id: 'parameters',
      title: g('参数配置', 'Parameter configuration'),
      params: [
        { field: g('API URL', 'API URL'), value: g(CLOUD_BASE, CLOUD_BASE) },
        { field: g('Provider', 'Provider'), value: g('OpenAI / 兼容', 'OpenAI / compatible') },
        { field: g('API Key', 'API Key'), value: g('控制台签发', 'From console') },
      ],
    },
    {
      id: 'setup',
      title: g('配置步骤', 'Setup steps'),
      steps: [
        g('VS Code / JetBrains：打开 Continue → Models → Add model。', 'Open Continue → Models → Add model.'),
        g(`Base URL 填 ${CLOUD_BASE}，认证选 Bearer。`, `Base URL ${CLOUD_BASE}, Bearer auth.`),
        g('保存后在 Chat / 补全中选择对应模型。', 'Select model in chat or inline completion.'),
      ],
    },
  ],
}

const LOBE = {
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

const SDK = {
  subtitle: g(
    'OpenAI SDK、LangChain 或任意 HTTPS 客户端均可对接。',
    'OpenAI SDKs, LangChain, or any HTTPS JSON client.'
  ),
  sections: [
    {
      id: 'curl',
      title: g('cURL', 'cURL'),
      steps: [
        g(`curl -sS ${CLOUD_BASE}/chat/completions \\`, `curl -sS ${CLOUD_BASE}/chat/completions \\`),
        g(`  -H "Authorization: Bearer YOUR_API_KEY" \\`, `  -H "Authorization: Bearer YOUR_API_KEY" \\`),
        g(`  -H "Content-Type: application/json" \\`, `  -H "Content-Type: application/json" \\`),
        g(`  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}'`, `  -d '{"model":"gpt-4o-mini","messages":[{"role":"user","content":"ping"}]}'`),
      ],
    },
    {
      id: 'python',
      title: g('Python', 'Python'),
      steps: [
        g('from openai import OpenAI', 'from openai import OpenAI'),
        g(`client = OpenAI(base_url="${CLOUD_BASE}", api_key="sk-…")`, `client = OpenAI(base_url="${CLOUD_BASE}", api_key="sk-…")`),
      ],
    },
    {
      id: 'node',
      title: g('Node.js', 'Node.js'),
      steps: [
        g(`const client = new OpenAI({ baseURL: '${CLOUD_BASE}', apiKey: process.env.ONE_ROUTER_KEY });`, `const client = new OpenAI({ baseURL: '${CLOUD_BASE}', apiKey: process.env.ONE_ROUTER_KEY });`),
      ],
    },
  ],
}

export const INTEGRATION_GUIDE_CONTENT = {
  'cherry-studio': CHERRY,
  cursor: CURSOR,
  'claude-code': CLAUDE,
  'codex-cli': CODEX,
  openclaw: OPENCLAW,
  continue: CONTINUE,
  lobechat: LOBE,
  'sdk-and-http': SDK,
}

export function pickGuideLang(language) {
  if (language?.toLowerCase().startsWith('zh')) return 'zh'
  return 'en'
}

export function tGuide(copy, lang) {
  return copy[lang]
}
