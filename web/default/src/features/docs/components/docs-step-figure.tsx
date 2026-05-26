/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'
import Zoom from 'react-medium-image-zoom'
import 'react-medium-image-zoom/dist/styles.css'
import { cn } from '@/lib/utils'

type DocsStepFigureProps = {
  src: string
  alt: string
}

/**
 * Inline doc screenshot (Fumadocs-style): readable width in the article,
 * click to open Medium-like fullscreen zoom (pan / scroll / ESC to close).
 */
export function DocsStepFigure({ src, alt }: DocsStepFigureProps) {
  const { t } = useTranslation()

  return (
    <figure className='not-prose my-4 w-full'>
      <Zoom
        zoomMargin={16}
        wrapElement='span'
        classDialog='docs-image-zoom-dialog'
        a11yNameButtonZoom={t('docs.integration.clickImageToEnlarge')}
        a11yNameButtonUnzoom={t('docs.integration.clickImageToClose')}
      >
        <img
          src={src}
          alt={alt}
          loading='lazy'
          decoding='async'
          className={cn(
            'border-border bg-background h-auto w-full max-w-[min(100%,56rem)] cursor-zoom-in rounded-lg border shadow-sm',
            'transition-shadow hover:shadow-md'
          )}
          sizes='(max-width: 768px) 100vw, (max-width: 1200px) 70vw, 900px'
        />
      </Zoom>
    </figure>
  )
}
