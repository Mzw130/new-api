/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Table, Typography } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import DocsContentCard from './DocsContentCard';

const { Text } = Typography;

export default function DocsParamTable({ rows }) {
  const { t } = useTranslation();

  const columns = [
    {
      title: t('docs.shell.paramField'),
      dataIndex: 'field',
      width: '28%',
    },
    {
      title: t('docs.shell.paramValue'),
      dataIndex: 'value',
      render: (val) => val,
    },
  ];

  const dataSource = rows.map((row, i) => ({
    key: String(i),
    field: row.field,
    value: (
      <div>
        {row.value}
        {row.hint ? (
          <Text type='tertiary' size='small' className='mt-1 block'>
            {row.hint}
          </Text>
        ) : null}
      </div>
    ),
  }));

  return (
    <DocsContentCard noPadding className='overflow-hidden'>
      <Table
        columns={columns}
        dataSource={dataSource}
        pagination={false}
        size='small'
        className='docs-param-table'
      />
    </DocsContentCard>
  );
}
