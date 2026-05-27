/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useMemo } from 'react';
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
  { Icon: Moonshot, label: 'Moonshot' },
  { Icon: OpenAI, label: 'OpenAI' },
  { Icon: XAI, label: 'xAI' },
  { Icon: Zhipu.Color, label: 'Zhipu' },
  { Icon: Volcengine.Color, label: 'Volcengine' },
  { Icon: Cohere.Color, label: 'Cohere' },
  { Icon: Claude.Color, label: 'Claude' },
  { Icon: Gemini.Color, label: 'Gemini' },
  { Icon: Suno, label: 'Suno' },
  { Icon: Minimax.Color, label: 'Minimax' },
  { Icon: Wenxin.Color, label: 'Wenxin' },
  { Icon: Spark.Color, label: 'Spark' },
  { Icon: Qingyan.Color, label: 'Qingyan' },
  { Icon: DeepSeek.Color, label: 'DeepSeek' },
  { Icon: Qwen.Color, label: 'Qwen' },
  { Icon: Midjourney, label: 'Midjourney' },
  { Icon: Grok, label: 'Grok' },
  { Icon: AzureAI.Color, label: 'Azure' },
  { Icon: Hunyuan.Color, label: 'Hunyuan' },
  { Icon: Xinference.Color, label: 'Xinference' },
];

const ICON_SIZE = 36;
/** 单段至少铺满宽屏，避免滚动时出现空白带 */
const MIN_TILES_PER_SEGMENT = 36;

function buildMarqueeSegment(items) {
  if (!items.length) return [];
  const segment = [];
  while (segment.length < MIN_TILES_PER_SEGMENT) {
    for (let i = 0; i < items.length; i += 1) {
      segment.push({ ...items[i], key: `${items[i].label}-${segment.length}` });
      if (segment.length >= MIN_TILES_PER_SEGMENT) break;
    }
  }
  return segment;
}

function ProviderTile({ label, children }) {
  return (
    <div
      className='home-provider-tile flex h-12 w-12 shrink-0 items-center justify-center rounded-xl sm:h-14 sm:w-14 md:h-[3.25rem] md:w-[3.25rem]'
      title={label}
      aria-label={label}
    >
      {children}
    </div>
  );
}

function ProviderMarqueeSegment({ tiles, ariaHidden = false }) {
  return (
    <div
      className='home-provider-marquee-segment'
      aria-hidden={ariaHidden ? true : undefined}
    >
      {tiles.map(({ Icon, label, key }) => (
        <ProviderTile key={key} label={label}>
          <Icon size={ICON_SIZE} />
        </ProviderTile>
      ))}
    </div>
  );
}

function ProviderMarqueeRow({ items, reverse = false }) {
  const tiles = useMemo(() => buildMarqueeSegment(items), [items]);
  const trackClass = reverse
    ? 'home-provider-marquee-track home-provider-marquee-track--reverse'
    : 'home-provider-marquee-track';

  return (
    <div className='home-provider-marquee'>
      <div className={trackClass}>
        <ProviderMarqueeSegment tiles={tiles} />
        <ProviderMarqueeSegment tiles={tiles} ariaHidden />
      </div>
    </div>
  );
}

export default function HomeProviders() {
  const { t } = useTranslation();

  const { rowA, rowB } = useMemo(() => {
    const mid = Math.ceil(PROVIDER_ICONS.length / 2);
    return {
      rowA: PROVIDER_ICONS.slice(0, mid),
      rowB: PROVIDER_ICONS.slice(mid),
    };
  }, []);

  return (
    <section className='home-providers-section home-landing-section home-section-blend relative overflow-hidden py-14 md:py-16 lg:py-20'>
      <div
        className='home-providers-wash pointer-events-none absolute inset-0'
        aria-hidden
      />
      <div className='relative mx-auto max-w-6xl px-4 sm:px-6 xl:px-8 2xl:max-w-7xl'>
        <div className='mb-8 flex flex-col items-center gap-3 text-center md:mb-10'>
          <span className='home-section-badge home-section-badge-violet inline-flex'>
            {t('Providers')}
          </span>
          <Text
            type='tertiary'
            className='!text-lg font-medium !text-semi-color-text-1 md:!text-xl lg:!text-2xl'
          >
            {t('支持众多的大模型供应商')}
          </Text>
          <p className='max-w-xl text-pretty text-sm text-semi-color-text-2 md:text-base'>
            {t(
              '通过 OpenAI 兼容接口，对接您已配置的渠道与模型（以控制台实际可用为准）',
            )}
          </p>
          <div className='h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 opacity-80' />
        </div>
      </div>

      <div className='home-provider-marquee-shell relative left-1/2 w-screen max-w-[100vw] -translate-x-1/2'>
        <div className='home-provider-marquee-rows space-y-4 md:space-y-5'>
          <ProviderMarqueeRow items={rowA} />
          <ProviderMarqueeRow items={rowB} reverse />
        </div>
      </div>
    </section>
  );
}
