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
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Skeleton } from '@/components/ui/skeleton'

type AuthLayoutProps = {
  children: React.ReactNode
}

export function AuthLayout({ children }: AuthLayoutProps) {
  const { t } = useTranslation()
  const { systemName, logo, loading } = useSystemConfig()

  return (
    <div className='relative grid h-svh max-w-none overflow-hidden'>
      <div
        aria-hidden
        className='pointer-events-none absolute inset-0 -z-10 opacity-[0.38] dark:opacity-[0.2]'
        style={{
          background: [
            'radial-gradient(ellipse 75% 55% at 50% -15%, oklch(0.72 0.2 265 / 85%) 0%, transparent 58%)',
            'radial-gradient(ellipse 55% 45% at 15% 55%, oklch(0.66 0.14 230 / 45%) 0%, transparent 58%)',
            'radial-gradient(ellipse 50% 40% at 85% 35%, oklch(0.7 0.17 295 / 50%) 0%, transparent 58%)',
          ].join(', '),
        }}
      />
      <div
        aria-hidden
        className='absolute inset-0 -z-10 bg-[linear-gradient(to_right,var(--border)_1px,transparent_1px),linear-gradient(to_bottom,var(--border)_1px,transparent_1px)] bg-[size:3rem_3rem] opacity-[0.06] [mask-image:radial-gradient(ellipse_65%_55%_at_50%_40%,black_25%,transparent_100%)]'
      />
      <Link
        to='/'
        className='absolute top-4 left-4 z-10 flex items-center gap-2 rounded-xl px-2 py-1 transition-opacity hover:opacity-80 sm:top-8 sm:left-8'
      >
        <div className='relative h-9 w-9'>
          {loading ? (
            <Skeleton className='absolute inset-0 rounded-xl' />
          ) : (
            <img
              src={logo}
              alt={t('Logo')}
              className='h-9 w-9 rounded-xl object-contain shadow-md ring-2 ring-background'
            />
          )}
        </div>
        {loading ? (
          <Skeleton className='h-6 w-24' />
        ) : (
          <span className='text-lg font-semibold tracking-tight'>
            {systemName}
          </span>
        )}
      </Link>
      <div className='container flex items-center pt-16 sm:pt-0'>
        <div className='mx-auto flex w-full max-w-lg flex-col justify-center px-4 py-8 sm:p-8'>
          <div className='w-full overflow-hidden rounded-2xl border border-border/60 bg-background/75 p-8 shadow-[0_24px_80px_-24px_rgba(15,23,42,0.18)] ring-1 ring-black/[0.03] backdrop-blur-xl dark:border-white/[0.08] dark:bg-background/45 dark:shadow-black/40 dark:ring-white/[0.04] sm:p-10'>
            {children}
          </div>
        </div>
      </div>
    </div>
  )
}
