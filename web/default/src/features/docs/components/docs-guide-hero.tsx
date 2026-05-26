/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { SparklesIcon } from 'lucide-react'
import { cn } from '@/lib/utils'

export function DocsGuideHero(props: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={cn(
        'not-prose border-primary/20 from-primary/5 via-background to-background relative mb-8 overflow-hidden rounded-xl border bg-gradient-to-br p-5 md:p-6',
        props.className
      )}
    >
      <div
        className='pointer-events-none absolute -end-8 -top-8 size-32 rounded-full bg-primary/10 blur-2xl'
        aria-hidden
      />
      <div className='relative flex gap-4'>
        <div className='bg-primary/10 text-primary flex size-10 shrink-0 items-center justify-center rounded-lg'>
          <SparklesIcon className='size-5' aria-hidden />
        </div>
        <div className='text-foreground min-w-0 text-sm leading-relaxed md:text-[15px]'>
          {props.children}
        </div>
      </div>
    </div>
  )
}
