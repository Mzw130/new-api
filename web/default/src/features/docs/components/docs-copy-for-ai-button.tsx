/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Copy } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { toast } from 'sonner'
import { Button } from '@/components/ui/button'

type DocsCopyForAiButtonProps = {
  content: string
  className?: string
}

export function DocsCopyForAiButton(props: DocsCopyForAiButtonProps) {
  const { t } = useTranslation()

  async function handleCopy() {
    if (!props.content?.trim()) return
    try {
      await navigator.clipboard.writeText(props.content.trim())
      toast.success(t('docs.shell.copyForAiSuccess'))
    } catch {
      toast.error(t('docs.shell.copyForAiFailed'))
    }
  }

  return (
    <Button
      type='button'
      variant='outline'
      size='sm'
      className={props.className}
      onClick={handleCopy}
    >
      <Copy className='size-3.5' aria-hidden />
      {t('docs.shell.copyForAi')}
    </Button>
  )
}
