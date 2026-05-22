/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { Link } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useSystemConfig } from '@/hooks/use-system-config'
import { Separator } from '@/components/ui/separator'

const NAV_ITEMS = [
  { labelKey: 'docs.footer.nav.home', to: '/' },
  { labelKey: 'docs.footer.nav.console', to: '/console' },
  { labelKey: 'docs.footer.nav.faq', to: '/about' },
  { labelKey: 'docs.footer.nav.pricing', to: '/pricing' },
  { labelKey: 'docs.footer.nav.docs', to: '/docs' },
] as const

export function DocsSiteFooter() {
  const { t } = useTranslation()
  const { logo: systemLogo } = useSystemConfig()
  const brand = t('docs.home.brand')
  const displayLogo = systemLogo || '/logo.png'
  const currentYear = new Date().getFullYear()

  return (
    <footer className='w-full border-t border-border/60 bg-muted/30'>
      <div className='mx-auto max-w-6xl px-4 py-12 md:px-6 md:py-14'>
        <div className='flex flex-col gap-10 md:flex-row md:items-start md:justify-between md:gap-16'>
          <div className='max-w-md shrink-0'>
            <Link
              to='/'
              className='inline-flex items-center gap-2.5 font-semibold tracking-tight hover:opacity-90'
            >
              <img
                src={displayLogo}
                alt={brand}
                className='size-9 rounded-lg object-contain'
              />
              <span>{brand}</span>
            </Link>
            <p className='text-muted-foreground mt-3 max-w-sm text-sm leading-relaxed'>
              {t('docs.footer.tagline')}
            </p>
          </div>

          <div className='md:min-w-[140px]'>
            <p className='text-foreground mb-4 text-sm font-semibold'>
              {t('docs.footer.navTitle')}
            </p>
            <nav
              className='flex flex-col gap-3'
              aria-label={t('docs.footer.navTitle')}
            >
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.to}
                  to={item.to}
                  className='text-muted-foreground hover:text-primary text-sm transition-colors'
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
          </div>
        </div>

        <Separator className='my-8' />

        <p className='text-muted-foreground text-center text-xs md:text-left'>
          © {currentYear} {brand}. {t('footer.defaultCopyright')}
        </p>
      </div>
    </footer>
  )
}
