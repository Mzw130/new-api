/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React, { useCallback } from 'react';
import { IconCopy } from '@douyinfe/semi-icons';
import { Button, Toast } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

export default function DocsCopyForAiButton({ content, className = '' }) {
  const { t } = useTranslation();

  const handleCopy = useCallback(async () => {
    if (!content?.trim()) return;
    try {
      await navigator.clipboard.writeText(content.trim());
      Toast.success({ content: t('docs.shell.copyForAiSuccess'), duration: 2 });
    } catch {
      Toast.error({ content: t('docs.shell.copyForAiFailed'), duration: 2 });
    }
  }, [content, t]);

  return (
    <Button
      theme='light'
      type='tertiary'
      icon={<IconCopy />}
      onClick={handleCopy}
      className={`!rounded-full !ring-1 !ring-indigo-400/25 hover:!bg-indigo-500/[0.08] hover:!text-indigo-700 dark:hover:!text-indigo-300 ${className}`}
    >
      {t('docs.shell.copyForAi')}
    </Button>
  );
}
