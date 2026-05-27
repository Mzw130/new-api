/*
Copyright (C) 2025 QuantumNous

DeepSeek API list prices in CNY per 1M tokens (cache-miss input / standard output).
Source: https://api-docs.deepseek.com/zh-cn/quick_start/pricing
*/

const DEEPSEEK_V4_FLASH = {
  currency: 'CNY',
  input_per_m: 1,
  output_per_m: 2,
  cache_read_per_m: 0.02,
  provider: 'deepseek',
};

const DEEPSEEK_V4_PRO = {
  currency: 'CNY',
  input_per_m: 3,
  output_per_m: 6,
  cache_read_per_m: 0.025,
  provider: 'deepseek',
};

export const DEEPSEEK_OFFICIAL_CNY_BY_MODEL = {
  'deepseek-v4-flash': DEEPSEEK_V4_FLASH,
  'deepseek-v4-flash-none': DEEPSEEK_V4_FLASH,
  'deepseek-v4-flash-max': DEEPSEEK_V4_FLASH,
  'deepseek-chat': DEEPSEEK_V4_FLASH,
  'deepseek-reasoner': DEEPSEEK_V4_FLASH,
  'deepseek-v4-pro': DEEPSEEK_V4_PRO,
  'deepseek-v4-pro-none': DEEPSEEK_V4_PRO,
  'deepseek-v4-pro-max': DEEPSEEK_V4_PRO,
};

export function applyDeepSeekOfficialCnyOverrides(prices) {
  for (const [modelName, entry] of Object.entries(DEEPSEEK_OFFICIAL_CNY_BY_MODEL)) {
    prices.set(modelName, { ...entry });
  }
}
