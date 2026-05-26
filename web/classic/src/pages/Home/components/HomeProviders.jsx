/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React from 'react';
import { Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const { Text } = Typography;

const PROVIDER_ICONS = [
  { Icon: Moonshot },
  { Icon: OpenAI },
  { Icon: XAI },
  { Icon: Zhipu.Color },
  { Icon: Volcengine.Color },
  { Icon: Cohere.Color },
  { Icon: Claude.Color },
  { Icon: Gemini.Color },
  { Icon: Suno },
  { Icon: Minimax.Color },
  { Icon: Wenxin.Color },
  { Icon: Spark.Color },
  { Icon: Qingyan.Color },
  { Icon: DeepSeek.Color },
  { Icon: Qwen.Color },
  { Icon: Midjourney },
  { Icon: Grok },
  { Icon: AzureAI.Color },
  { Icon: Hunyuan.Color },
  { Icon: Xinference.Color },
];

function ProviderTile({ children }) {
  return (
    <div className='home-provider-tile flex h-11 w-11 shrink-0 items-center justify-center rounded-xl sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
      {children}
    </div>
  );
}

export default function HomeProviders() {
  const { t } = useTranslation();

  return (
    <section className='home-landing-section relative border-b border-semi-color-border bg-[var(--semi-color-bg-0)] py-14 md:py-16 lg:py-20'>
      <div className='mx-auto max-w-6xl px-4 sm:px-6 xl:px-8 2xl:max-w-7xl'>
        <div className='mb-8 flex flex-col items-center gap-3 md:mb-10'>
          <Text
            type='tertiary'
            className='!text-lg font-normal md:!text-xl lg:!text-2xl'
          >
            {t('支持众多的大模型供应商')}
          </Text>
          <div className='h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 opacity-80' />
        </div>
        <div className='flex flex-wrap items-center justify-center gap-3 sm:gap-4 md:gap-5 lg:gap-6'>
          {PROVIDER_ICONS.map(({ Icon }, idx) => (
            <ProviderTile key={idx}>
              <Icon size={40} />
            </ProviderTile>
          ))}
          <ProviderTile>
            <Text className='!text-lg font-bold sm:!text-xl md:!text-2xl'>30+</Text>
          </ProviderTile>
        </div>
      </div>
    </section>
  );
}
