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
import { Link, useSearch } from '@tanstack/react-router'
import { useTranslation } from 'react-i18next'
import { useStatus } from '@/hooks/use-status'
import { AuthLayout } from '../auth-layout'
import { TermsFooter } from '../components/terms-footer'
import { UserAuthForm } from './components/user-auth-form'

export function SignIn() {
  const { t } = useTranslation()
  const { redirect } = useSearch({ from: '/(auth)/sign-in' })
  const { status } = useStatus()

  return (
    <AuthLayout>
      <div className='w-full space-y-8'>
        <div className='space-y-3'>
          <div className='flex flex-col gap-1 text-center sm:text-left'>
            <p className='text-muted-foreground text-xs font-medium tracking-[0.2em] uppercase'>
              {t('Authentication')}
            </p>
            <h2 className='text-3xl font-bold tracking-tight'>
              <span className='bg-gradient-to-r from-blue-600 via-violet-600 to-purple-600 bg-clip-text text-transparent dark:from-blue-400 dark:via-violet-400 dark:to-purple-400'>
                {t('Sign in')}
              </span>
            </h2>
          </div>
          {!status?.self_use_mode_enabled && (
            <p className='text-muted-foreground text-center text-sm sm:text-left'>
              {t("Don't have an account?")}{' '}
              <Link
                to='/sign-up'
                className='text-primary font-semibold underline underline-offset-4 hover:opacity-90'
              >
                {t('Sign up')}
              </Link>
              .
            </p>
          )}
        </div>

        <UserAuthForm redirectTo={redirect} />

        <TermsFooter
          variant='sign-in'
          status={status}
          className='text-center'
        />
      </div>
    </AuthLayout>
  )
}
