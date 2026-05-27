/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

import React, { useEffect, useState } from 'react';
import { useTranslation } from 'react-i18next';
import { API_ENDPOINTS } from '../../../constants/common.constant';

const TERMINAL_LINES = [
  { type: 'cmd', text: 'curl -X POST "$BASE/v1/chat/completions"' },
  { type: 'flag', text: '  -H "Authorization: Bearer sk-***"' },
  { type: 'flag', text: '  -H "Content-Type: application/json"' },
  { type: 'data', text: '  -d \'{"model":"gpt-4o","messages":[...]}\'' },
  { type: 'ok', text: '→ 200 OK  ·  routed via gateway' },
];

export default function HomeApiPanel({ serverAddress, isChinese }) {
  const { t } = useTranslation();
  const [lineIndex, setLineIndex] = useState(0);
  const [endpointIdx, setEndpointIdx] = useState(0);

  useEffect(() => {
    const id = setInterval(() => {
      setLineIndex((i) => (i + 1) % TERMINAL_LINES.length);
      setEndpointIdx((i) => (i + 1) % API_ENDPOINTS.length);
    }, 2800);
    return () => clearInterval(id);
  }, []);

  const path = API_ENDPOINTS[endpointIdx] ?? '/v1/chat/completions';
  const base = serverAddress.replace(/\/$/, '');

  return (
    <div className='mx-auto w-full max-w-md shrink-0 lg:mx-0 lg:block lg:w-[min(100%,440px)] 2xl:w-[min(100%,480px)]'>
      <div className='home-terminal-card rounded-2xl border border-indigo-200/55 bg-white/70 p-5 shadow-[0_24px_60px_-24px_rgba(99,102,241,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/50 dark:shadow-black/50 2xl:p-6'>
        <div className='mb-4 flex items-center gap-2 border-b border-indigo-100/70 pb-3 dark:border-white/10'>
          <span className='flex gap-1.5' aria-hidden>
            <span className='size-2.5 rounded-full bg-red-400/90' />
            <span className='size-2.5 rounded-full bg-amber-400/90' />
            <span className='size-2.5 rounded-full bg-emerald-400/90' />
          </span>
          <span className='ml-2 text-sm font-semibold text-semi-color-text-0'>
            OpenAI-compatible
          </span>
        </div>

        <pre className='home-terminal-body mb-5 max-h-[220px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-xl bg-slate-950/[0.05] p-4 text-left font-mono text-[11px] leading-relaxed dark:bg-black/35 2xl:text-xs'>
          {TERMINAL_LINES.map((line, i) => {
            const visible = i <= lineIndex;
            const text = line.text.replace('$BASE', base);
            return (
              <div
                key={line.text}
                className={`transition-opacity duration-500 ${visible ? 'opacity-100' : 'opacity-25'}`}
              >
                <span
                  className={
                    line.type === 'cmd'
                      ? 'text-indigo-700 dark:text-indigo-300'
                      : line.type === 'ok'
                        ? 'text-teal-600 dark:text-teal-400'
                        : 'text-semi-color-text-2'
                  }
                >
                  {text}
                </span>
              </div>
            );
          })}
          <div className='mt-2 text-indigo-600/80 dark:text-indigo-300/80'>
            POST {base}
            {path}
          </div>
        </pre>

        <div className='grid grid-cols-3 gap-2 text-center'>
          <div className='rounded-xl border border-indigo-100/60 bg-indigo-50/50 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
            <div className='text-lg font-bold text-indigo-600 dark:text-indigo-300'>
              REST
            </div>
            <div className='text-[10px] font-medium text-semi-color-text-2'>HTTP</div>
          </div>
          <div className='rounded-xl border border-violet-100/60 bg-violet-50/40 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
            <div className='text-lg font-bold text-violet-600 dark:text-violet-300'>
              API
            </div>
            <div className='text-[10px] font-medium text-semi-color-text-2'>
              {t('渠道')}
            </div>
          </div>
          <div className='rounded-xl border border-teal-100/60 bg-teal-50/40 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
            <div className='text-lg font-bold text-teal-600 dark:text-teal-300'>1</div>
            <div className='text-[10px] font-medium text-semi-color-text-2'>
              {isChinese ? '统一入口' : 'Base URL'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
