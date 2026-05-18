/*
Copyright (C) 2023-2026 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.

This program is distributed in the hope that it will be useful,
but WITHOUT ANY WARRANTY; without even the implied warranty of
MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the
GNU Affero General Public License for more details.

You should have received a copy of the GNU Affero General Public License
along with this program. If not, see <https://www.gnu.org/licenses/>.

For commercial licensing, please contact support@quantumnous.com
*/
import { useRef, useEffect, useCallback } from 'react'
import { useTranslation } from 'react-i18next'

interface CounterProps {
  end: number
  suffix?: string
  prefix?: string
  duration?: number
  decimals?: number
}

function Counter(props: CounterProps) {
  const { end, suffix = '', prefix = '', duration = 1600, decimals = 0 } = props
  const ref = useRef<HTMLSpanElement>(null)
  const startedRef = useRef(false)

  const formatValue = useCallback(
    (v: number) =>
      decimals > 0 ? v.toFixed(decimals) : Math.round(v).toLocaleString(),
    [decimals]
  )

  const animate = useCallback(() => {
    const el = ref.current
    if (!el) return
    const start = performance.now()
    const step = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      el.textContent = `${prefix}${formatValue(eased * end)}${suffix}`
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [end, duration, prefix, suffix, formatValue])

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const mq = window.matchMedia('(prefers-reduced-motion: reduce)')
    if (mq.matches) {
      el.textContent = `${prefix}${formatValue(end)}${suffix}`
      return
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting && !startedRef.current) {
          startedRef.current = true
          animate()
          observer.unobserve(el)
        }
      },
      { threshold: 0.5 }
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [animate, end, prefix, suffix, formatValue])

  return (
    <span ref={ref} className='tabular-nums'>
      {prefix}0{suffix}
    </span>
  )
}

interface StatsProps {
  className?: string
}

interface StatItem {
  end: number
  suffix: string
  label: string
  decimals?: number
}

const STAT_ACCENTS = [
  'from-teal-500 to-cyan-400',
  'from-sky-500 to-indigo-500',
  'from-amber-500 to-rose-500',
  'from-emerald-500 to-lime-400',
] as const

export function Stats(_props: StatsProps) {
  const { t } = useTranslation()

  const stats: StatItem[] = [
    { end: 50, suffix: '+', label: t('upstream services integrated') },
    { end: 100, suffix: '+', label: t('model billing support') },
    { end: 50, suffix: '+', label: t('compatible API routes') },
    { end: 10, suffix: '+', label: t('scheduling controls') },
  ]

  return (
    <div className='relative isolate z-10 overflow-hidden px-4 py-14 md:px-6 md:py-20'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-20 bg-[linear-gradient(165deg,oklch(0.96_0.04_195_/_0.35)_0%,transparent_42%),linear-gradient(200deg,oklch(0.94_0.06_75_/_0.2)_0%,transparent_48%)] dark:bg-[linear-gradient(165deg,oklch(0.22_0.06_195_/_0.4)_0%,transparent_45%),linear-gradient(200deg,oklch(0.24_0.05_75_/_0.25)_0%,transparent_50%)]'
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:2.75rem_2.75rem] [mask-image:linear-gradient(to_bottom,black_52%,transparent_100%)] opacity-[0.09] dark:opacity-[0.14]'
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[radial-gradient(circle_at_1px_1px,var(--border)_1px,transparent_0)] bg-[length:18px_18px] opacity-[0.4] dark:opacity-[0.25]'
      />
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-teal-500/35 to-transparent dark:via-teal-400/25'
      />

      <div className='relative mx-auto max-w-6xl rounded-[2rem] border border-border/50 bg-background/70 p-6 shadow-[0_24px_80px_-48px_rgba(15,118,110,0.35)] ring-1 ring-teal-500/[0.07] backdrop-blur-xl dark:bg-background/[0.55] dark:shadow-[0_28px_90px_-40px_rgba(0,0,0,0.85)] dark:ring-teal-400/10 md:p-10'>
        <div className='grid grid-cols-2 gap-4 md:grid-cols-4 md:gap-5'>
          {stats.map((s, i) => (
            <div
              key={s.label}
              className='group relative flex flex-col items-start rounded-2xl border border-border/40 bg-gradient-to-br from-background/90 to-muted/25 px-4 py-6 transition-all duration-300 hover:border-teal-500/35 hover:shadow-[0_16px_40px_-24px_rgba(20,184,166,0.45)] dark:from-background/40 dark:to-muted/15 dark:hover:border-teal-400/30 md:px-5 md:py-8'
            >
              <div
                aria-hidden
                className={`absolute top-0 left-0 h-full w-1 rounded-l-2xl bg-gradient-to-b ${STAT_ACCENTS[i]} opacity-70 transition-all duration-300 group-hover:opacity-100`}
              />
              <div className='relative z-10 w-full pl-3 text-left'>
                <span
                  className={`bg-gradient-to-br ${STAT_ACCENTS[i]} bg-clip-text font-black tracking-tight text-transparent max-md:text-3xl md:text-5xl`}
                >
                  <Counter end={s.end} suffix={s.suffix} decimals={s.decimals} />
                </span>
                <span className='mt-2 block text-xs font-medium text-muted-foreground transition-colors duration-300 group-hover:text-foreground/85 md:text-sm'>
                  {s.label}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}
