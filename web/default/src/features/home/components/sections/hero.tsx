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
import { Link } from '@tanstack/react-router'
import { ArrowRight, Sparkles } from 'lucide-react'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Button } from '@/components/ui/button'
import { HeroTerminalDemo } from '../hero-terminal-demo'

interface HeroProps {
  className?: string
  isAuthenticated?: boolean
}

export function Hero(props: HeroProps) {
  const { t } = useTranslation()
  const { systemName } = useSystemConfig()

  return (
    <section className='relative isolate z-10 flex flex-col items-center overflow-hidden px-6 pt-28 pb-20 md:pt-40 md:pb-32'>
      {/* Ambient color wash */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-[0.42] dark:opacity-[0.22]'
        style={{
          background: [
            'radial-gradient(ellipse 90% 65% at 50% -28%, oklch(0.76 0.2 265 / 88%) 0%, transparent 62%)',
            'radial-gradient(ellipse 72% 48% at 12% 42%, oklch(0.66 0.16 230 / 48%) 0%, transparent 62%)',
            'radial-gradient(ellipse 68% 50% at 88% 22%, oklch(0.7 0.18 295 / 52%) 0%, transparent 62%)',
            'radial-gradient(ellipse 55% 38% at 55% 88%, oklch(0.68 0.12 220 / 28%) 0%, transparent 62%)',
          ].join(', '),
        }}
      />
      {/* Soft aurora orb */}
      <div
        aria-hidden
        className='pointer-events-none absolute top-12 left-1/2 -z-10 h-[min(72vw,640px)] w-[min(120vw,1100px)] -translate-x-1/2 rounded-full opacity-[0.22] blur-[120px] motion-safe:animate-pulse dark:opacity-[0.14]'
        style={{
          background:
            'conic-gradient(from 200deg, oklch(0.7 0.22 265), oklch(0.65 0.18 305), oklch(0.68 0.16 235), oklch(0.7 0.22 265))',
        }}
      />
      {/* Primary grid — larger cells, softer vignette */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_78%_62%_at_50%_34%,black_18%,transparent_70%)] opacity-[0.07] dark:opacity-[0.11]'
      />
      {/* Secondary grid — finer mesh for depth */}
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[length:1.375rem_1.375rem] [mask-image:radial-gradient(ellipse_82%_68%_at_50%_36%,black_12%,transparent_75%)] opacity-[0.035] dark:opacity-[0.06]'
      />
      {/* Horizon sheen */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-[-20%] top-[28%] -z-10 h-px bg-gradient-to-r from-transparent via-blue-400/25 to-transparent dark:via-blue-400/15'
      />
      {/* Decorative particles — softer, slower */}
      <div aria-hidden className='pointer-events-none absolute inset-0 -z-10 overflow-hidden'>
        <div className='absolute top-[12%] left-[8%] size-2.5 motion-safe:animate-bounce rounded-full bg-blue-400/35 [animation-delay:0s] [animation-duration:3.8s] shadow-md shadow-blue-500/15' />
        <div className='absolute top-[24%] right-[11%] size-2 motion-safe:animate-bounce rounded-full bg-violet-400/35 [animation-delay:1.1s] [animation-duration:4.5s] shadow-md shadow-violet-500/15' />
        <div className='absolute top-[62%] left-[14%] size-1.5 motion-safe:animate-bounce rounded-full bg-purple-400/28 [animation-delay:2.2s] [animation-duration:4s] shadow-md shadow-purple-500/12' />
        <div className='absolute top-[38%] right-[7%] size-2 motion-safe:animate-bounce rounded-full bg-indigo-400/28 [animation-delay:0.7s] [animation-duration:5s] shadow-md shadow-indigo-500/12' />
        <div className='absolute top-[72%] left-[72%] size-1 motion-safe:animate-bounce rounded-full bg-cyan-400/22 [animation-delay:1.6s] [animation-duration:4.2s] shadow-md shadow-cyan-500/10' />
      </div>
      {/* Bottom fade into next section */}
      <div
        aria-hidden
        className='pointer-events-none absolute inset-x-0 bottom-0 -z-10 h-40 bg-gradient-to-t from-background via-background/40 to-transparent md:h-52'
      />

      <div className='flex max-w-3xl flex-col items-center text-center'>
        {/* Badge */}
        <div
          className='landing-animate-fade-up mb-7 flex items-center gap-2 rounded-full border border-blue-200/60 bg-blue-50/55 px-4 py-1.5 shadow-sm shadow-blue-500/5 ring-1 ring-blue-500/10 backdrop-blur-sm dark:border-blue-500/25 dark:bg-blue-500/[0.12] dark:shadow-blue-500/5 dark:ring-blue-400/15'
          style={{ animationDelay: '0ms' }}
        >
          <Sparkles className='size-3.5 shrink-0 text-blue-600 dark:text-blue-400' />
          <span className='text-xs font-medium tracking-wide text-blue-800 dark:text-blue-200'>
            {t('Open Source AI Gateway')}
          </span>
        </div>

        <h1
          className='landing-animate-fade-up text-balance bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-[clamp(2.2rem,6vw,4rem)] leading-[1.08] font-bold tracking-tight text-transparent drop-shadow-[0_1px_40px_rgba(99,102,241,0.15)] dark:from-blue-400 dark:via-violet-400 dark:to-purple-400 dark:drop-shadow-[0_1px_32px_rgba(139,92,246,0.12)]'
          style={{ animationDelay: '60ms' }}
        >
          {t('Unified API Gateway for')}
          <br />
          {t('All Your AI Models')}
        </h1>
        <p
          className='landing-animate-fade-up text-muted-foreground/85 mt-7 max-w-2xl text-pretty text-base leading-relaxed opacity-0 md:text-lg md:leading-relaxed'
          style={{ animationDelay: '120ms' }}
        >
          {systemName}{' '}
          {t(
            'is an open-source AI API gateway for self-hosted deployments. Connect multiple upstream services, manage models, keys, quotas, logs, and routing policies in one place.'
          )}
        </p>
        <div
          className='landing-animate-fade-up mt-14 flex flex-col items-center gap-5 opacity-0 sm:flex-row sm:gap-4'
          style={{ animationDelay: '200ms' }}
        >
          {props.isAuthenticated ? (
            <Button
              className='group rounded-lg'
              render={<Link to='/dashboard' />}
            >
              {t('Go to Dashboard')}
              <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
            </Button>
          ) : (
            <>
              <Button
                className='group rounded-lg'
                render={<Link to='/sign-up' />}
              >
                {t('Get Started')}
                <ArrowRight className='ml-1 size-3.5 transition-transform duration-200 group-hover:translate-x-0.5' />
              </Button>
              <Button
                variant='outline'
                className='border-border/50 hover:border-border hover:bg-muted/50 rounded-lg'
                render={<Link to='/pricing' />}
              >
                {t('View Pricing')}
              </Button>
            </>
          )}
        </div>
      </div>

      <div
        className='landing-animate-fade-up relative mt-16 w-full max-w-3xl px-1 opacity-0 sm:px-0 md:mt-24'
        style={{ animationDelay: '350ms' }}
      >
        <div
          aria-hidden
          className='pointer-events-none absolute -inset-3 -z-10 rounded-none bg-gradient-to-b from-blue-500/[0.12] via-violet-500/[0.06] to-transparent opacity-80 blur-2xl dark:from-blue-500/10 dark:via-violet-500/5'
        />
        <div
          aria-hidden
          className='pointer-events-none absolute -inset-px -z-10 rounded-none bg-gradient-to-br from-white/40 via-transparent to-transparent opacity-30 dark:from-white/[0.06]'
        />
        <HeroTerminalDemo />
      </div>
    </section>
  )
}
