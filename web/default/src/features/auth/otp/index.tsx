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
import { AuthLayout } from '../auth-layout'
import { OtpForm } from './components/otp-form'

export function Otp() {
  const { t } = useTranslation()
  return (
    <AuthLayout>
      <div className='flex w-full flex-col gap-8'>
        <div className='space-y-4'>
          <div className='flex flex-col gap-1.5'>
            <p className='text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase'>
              {t('Authentication')}
            </p>
            <h2 className='text-balance text-2xl font-bold tracking-tight sm:text-3xl'>
              <span className='bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-purple-400'>
                {t('Two-factor Authentication')}
              </span>
            </h2>
          </div>
          <div className='text-muted-foreground space-y-3 text-sm leading-relaxed sm:text-base'>
            <p>{t('Please enter the authentication code.')}</p>
            <p>
              {t('Session expired?')}{' '}
              <Link
                to='/sign-in'
                className='text-primary font-medium underline underline-offset-4 transition-opacity hover:opacity-90'
              >
                {t('Re-login')}
              </Link>
              .
            </p>
          </div>
        </div>

        <OtpForm />
      </div>
    </AuthLayout>
  )
}
