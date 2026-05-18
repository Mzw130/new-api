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
import { Settings, Zap, BarChart3 } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { AnimateInView } from '@/components/animate-in-view'

const STEP_COLORS = [
  { bar: 'from-cyan-500 to-sky-600', glow: 'shadow-cyan-500/20' },
  { bar: 'from-violet-500 to-fuchsia-600', glow: 'shadow-violet-500/20' },
  { bar: 'from-amber-500 to-orange-600', glow: 'shadow-amber-500/20' },
]

export function HowItWorks() {
  const { t } = useTranslation()

  const steps = [
    {
      num: '1',
      title: t('Configure'),
      desc: t(
        'Add your API keys, set up channels and configure access permissions'
      ),
      icon: <Settings className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '2',
      title: t('Connect'),
      desc: t(
        'Connect through OpenAI, Claude, Gemini, and other compatible API routes'
      ),
      icon: <Zap className='size-6' strokeWidth={1.5} />,
    },
    {
      num: '3',
      title: t('Monitor'),
      desc: t('Track usage, costs and performance with real-time analytics'),
      icon: <BarChart3 className='size-6' strokeWidth={1.5} />,
    },
  ]

  return (
    <section className='relative isolate z-10 border-t border-border/25 px-6 py-24 md:py-32'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 bg-[linear-gradient(180deg,oklch(0.985_0.02_260_/_0.6),var(--background)_38%,oklch(0.97_0.03_280_/_0.35)_100%)] dark:bg-[linear-gradient(180deg,oklch(0.17_0.03_260),var(--background)_40%,oklch(0.2_0.04_285_/_0.5)_100%)]'
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 opacity-[0.45] dark:opacity-[0.35]'
        style={{
          backgroundImage: [
            'radial-gradient(ellipse 55% 40% at 20% 30%, oklch(0.7 0.15 230 / 18%), transparent)',
            'radial-gradient(ellipse 45% 45% at 78% 55%, oklch(0.72 0.14 300 / 16%), transparent)',
          ].join(','),
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] [mask-image:radial-gradient(ellipse_75%_62%_at_50%_42%,black_15%,transparent_78%)] opacity-[0.07] dark:opacity-[0.11]'
      />
      <div
        aria-hidden
        className='absolute inset-x-0 top-0 -z-10 h-px bg-gradient-to-r from-transparent via-violet-400/30 to-transparent dark:via-violet-400/20'
      />

      <div className='mx-auto max-w-6xl'>
        <AnimateInView className='mb-16 text-center md:mb-20'>
          <span className='text-muted-foreground mb-4 inline-flex rounded-full border border-violet-500/20 bg-violet-500/[0.06] px-3 py-1 text-[11px] font-semibold tracking-[0.22em] text-violet-800 uppercase dark:text-violet-200/90'>
            {t('How It Works')}
          </span>
          <h2 className='text-balance text-3xl font-bold tracking-tight md:text-4xl'>
            {t('Three steps to get started')}
          </h2>
          <p className='text-muted-foreground/85 mx-auto mt-4 max-w-2xl text-pretty text-sm md:text-base'>
            {t('Simple setup process to get your AI gateway running in minutes')}
          </p>
        </AnimateInView>

        <div className='relative grid gap-8 md:grid-cols-3 md:gap-6'>
          <div
            aria-hidden
            className='absolute top-[72px] right-[20%] left-[20%] hidden h-px bg-gradient-to-r from-cyan-500/50 via-fuchsia-500/50 to-amber-500/50 md:block'
          />
          <div className='absolute top-[64px] left-[16.67%] hidden size-2.5 rounded-full border-2 border-cyan-400/50 bg-background shadow-[0_0_12px_rgba(34,211,238,0.35)] md:block' />
          <div className='absolute top-[64px] left-1/2 hidden size-2.5 -translate-x-1/2 rounded-full border-2 border-fuchsia-400/50 bg-background shadow-[0_0_12px_rgba(217,70,239,0.35)] md:block' />
          <div className='absolute top-[64px] right-[16.67%] hidden size-2.5 rounded-full border-2 border-amber-400/50 bg-background shadow-[0_0_12px_rgba(251,191,36,0.35)] md:block' />

          {steps.map((step, i) => {
            const color = STEP_COLORS[i]
            return (
              <AnimateInView
                key={step.num}
                delay={i * 150}
                animation='scale-in'
                className={`group relative flex flex-col overflow-hidden rounded-[1.35rem] border border-border/40 bg-background/70 px-6 py-9 text-center shadow-[0_22px_55px_-38px_rgba(99,102,241,0.35)] ring-1 ring-transparent backdrop-blur-md transition-all duration-500 hover:-translate-y-2 hover:border-violet-500/20 hover:shadow-[0_28px_64px_-34px_rgba(99,102,241,0.45)] hover:ring-violet-500/10 dark:bg-background/45 dark:shadow-[0_24px_60px_-40px_rgba(0,0,0,0.65)] md:px-8 md:py-10`}
              >
                <div
                  aria-hidden
                  className={`pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${color.bar} opacity-90`}
                />
                <div className='relative z-10'>
                  <div className='relative mx-auto mb-7 flex w-fit flex-col items-center'>
                    <div
                      className={`relative flex size-[4.75rem] items-center justify-center rounded-2xl border border-border/50 bg-gradient-to-br from-muted/70 to-background/90 text-foreground shadow-lg transition-all duration-500 group-hover:scale-[1.06] group-hover:shadow-xl ${color.glow} dark:from-muted/30 dark:to-background/60`}
                    >
                      {step.icon}
                    </div>
                    <div
                      className={`absolute -top-2 -right-2 flex size-8 items-center justify-center rounded-full bg-gradient-to-br ${color.bar} text-sm font-bold text-white shadow-md ring-2 ring-background transition-transform duration-300 group-hover:scale-110`}
                    >
                      {step.num}
                    </div>
                  </div>
                  <h3 className='mb-3 text-lg font-bold tracking-tight'>
                    {step.title}
                  </h3>
                  <p className='text-muted-foreground mx-auto max-w-[280px] text-sm leading-relaxed'>
                    {step.desc}
                  </p>
                </div>
              </AnimateInView>
            )
          })}
        </div>
      </div>
    </section>
  )
}
