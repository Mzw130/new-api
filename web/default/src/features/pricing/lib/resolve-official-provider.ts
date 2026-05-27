/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

/**
 * Map a model id to the models.dev provider slug for that vendor's list price.
 */
export function resolveOfficialProvider(modelName: string): string | null {
  if (!modelName) return null
  const n = modelName.toLowerCase()

  if (
    /^(gpt-|chatgpt|o[1349]|text-embedding|davinci|babbage|gpt-image|gpt-audio|gpt-realtime|omni-moderation)/.test(
      n
    ) ||
    n.startsWith('gpt')
  ) {
    return 'openai'
  }

  if (n.includes('claude')) return 'anthropic'

  if (n.includes('deepseek')) return 'deepseek'

  if (
    n.startsWith('gemini') ||
    n.includes('gemini-') ||
    n.startsWith('google/') ||
    n.includes('/gemini')
  ) {
    return 'google'
  }

  if (n.includes('grok')) return 'xai'

  if (
    n.includes('mistral') ||
    n.startsWith('ministral') ||
    n.startsWith('codestral') ||
    n.startsWith('pixtral')
  ) {
    return 'mistral'
  }

  if (/^(llama|meta-llama)/.test(n) || n.includes('llama-')) return 'llama'

  if (n.includes('command-') || n.startsWith('cohere/')) return 'cohere'

  if (n.includes('qwen') || n.startsWith('qwq')) return 'alibaba-cn'

  if (n.includes('glm') || n.startsWith('glm')) return 'zhipuai'

  if (n.includes('moonshot') || n.startsWith('kimi')) return 'moonshotai-cn'

  if (n.includes('minimax') || n.startsWith('abab')) return 'minimax-cn'

  return null
}
