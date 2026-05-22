/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import { useTranslation } from 'react-i18next'

export type DocsParamRow = {
  field: string
  value: React.ReactNode
  hint?: string
}

export function DocsParamTable(props: { rows: DocsParamRow[] }) {
  const { t } = useTranslation()

  return (
    <div className='border-border overflow-hidden rounded-lg border'>
      <table className='w-full text-sm'>
        <thead>
          <tr className='bg-muted/50 border-border border-b'>
            <th className='text-muted-foreground px-4 py-2.5 text-start text-xs font-semibold tracking-wide uppercase'>
              {t('docs.shell.paramField')}
            </th>
            <th className='text-muted-foreground px-4 py-2.5 text-start text-xs font-semibold tracking-wide uppercase'>
              {t('docs.shell.paramValue')}
            </th>
          </tr>
        </thead>
        <tbody>
          {props.rows.map((row) => (
            <tr
              key={row.field}
              className='border-border border-b last:border-b-0'
            >
              <td className='text-foreground align-top px-4 py-3 font-medium whitespace-nowrap'>
                {row.field}
              </td>
              <td className='text-muted-foreground align-top px-4 py-3 leading-relaxed'>
                <div className='text-foreground'>{row.value}</div>
                {row.hint ? (
                  <p className='text-muted-foreground mt-1 text-xs'>{row.hint}</p>
                ) : null}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
