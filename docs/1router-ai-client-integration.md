# 各终端接入 1router.ai（站内文档）

所有内容已迁至**默认前端（default SPA）站内路由**，不再依赖 `docs.newapi.pro` 等外链手册。

## 路由

| 页面 | 路径 |
|------|------|
| 接入总览（三件客 + curl） | `/docs/` |
| 分端指南目录 | `/docs/apps/` |
| 单端长文（Cherry / Cursor / …） | `/docs/apps/<slug>`，如 `/docs/apps/cherry-studio`、`/docs/apps/sdk-and-http` |
| OpenAI 兼容 HTTP 参考 | `/docs/openai-compatible` |

`slug` 取值：`cherry-studio`、`cursor`、`claude-code`、`codex-cli`、`openclaw`、`opencode`、`lobechat`、`sdk-and-http`。

## 源码位置

- 概览页：`web/default/src/features/docs/client-integration-page.tsx`
- 指南目录：`web/default/src/features/docs/integration-apps-index-page.tsx`
- 单篇正文（中/英 Markdown 字符串）：`web/default/src/features/docs/guides/integration-markdown.ts`
- OpenAI 参考正文：同文件 `OPENAI_COMPATIBLE_MARKDOWN`
- 路由：`web/default/src/routes/docs/**`

顶部「文档」未配置外链时指向 `/docs`；页脚「文档」列已改为站内链 + GitHub 自建。
