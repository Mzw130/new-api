/*
Copyright (C) 2025 QuantumNous

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

import React from 'react';
import { Modal, Button, Typography } from '@douyinfe/semi-ui';
import { IconAlertTriangle } from '@douyinfe/semi-icons';

const { Text } = Typography;

function formatUsd(value, displayPrice) {
  if (typeof displayPrice === 'function') {
    return displayPrice(value);
  }
  return `$${Number(value).toFixed(4)}`;
}

function ChangeRow({ change, t, displayPrice }) {
  const up = change.new_value > change.old_value;
  const fieldLabel =
    change.field === 'output' ? t('Output price') : t('Input price');

  return (
    <li
      className='rounded-lg border px-3 py-2.5 text-sm mb-2'
      style={{ borderColor: 'var(--semi-color-border)' }}
    >
      <div className='flex flex-wrap items-start justify-between gap-2'>
        <div className='min-w-0'>
          <Text strong>{change.canonical_key}</Text>
          <div>
            <Text type='tertiary' size='small'>
              {fieldLabel}
            </Text>
          </div>
        </div>
        <Text
          size='small'
          style={{
            color: up
              ? 'var(--semi-color-warning)'
              : 'var(--semi-color-success)',
            fontVariantNumeric: 'tabular-nums',
          }}
        >
          {change.change_pct > 0 ? '+' : ''}
          {change.change_pct.toFixed(1)}%
        </Text>
      </div>
      <div className='mt-2 flex flex-wrap gap-x-4 gap-y-1'>
        <Text type='tertiary' size='small'>
          {t('Previous')}: {formatUsd(change.old_value, displayPrice)}
        </Text>
        <Text type='tertiary' size='small'>
          {t('Current')}: {formatUsd(change.new_value, displayPrice)}
        </Text>
      </div>
    </li>
  );
}

const OfficialPriceAlertModal = ({
  visible,
  onClose,
  changes,
  onAcknowledge,
  onDismiss,
  isAcking,
  displayPrice,
  t,
}) => {
  const handleDismiss = () => {
    onDismiss?.();
    onClose?.();
  };

  const handleAck = async () => {
    await onAcknowledge?.();
    onClose?.();
  };

  return (
    <Modal
      title={
        <span className='flex items-center gap-2'>
          <IconAlertTriangle style={{ color: 'var(--semi-color-warning)' }} />
          {t('Official price change alert')}
        </span>
      }
      visible={visible}
      onCancel={handleDismiss}
      footer={
        <div className='flex justify-end gap-2'>
          <Button onClick={handleDismiss}>{t('Dismiss for now')}</Button>
          <Button
            theme='solid'
            type='primary'
            loading={isAcking}
            onClick={handleAck}
          >
            {t('Acknowledge and update baseline')}
          </Button>
        </div>
      }
      width={560}
      style={{ maxWidth: '95vw' }}
    >
      <Text type='tertiary' className='block mb-3'>
        {t(
          'Vendor list prices on models.dev changed since your last acknowledged baseline. Review before updating ratios.',
        )}
      </Text>
      <ul
        className='max-h-[50vh] overflow-y-auto pr-1 m-0 p-0 list-none'
        style={{ listStyle: 'none' }}
      >
        {changes.map((change) => (
          <ChangeRow
            key={`${change.canonical_key}-${change.field}`}
            change={change}
            t={t}
            displayPrice={displayPrice}
          />
        ))}
      </ul>
    </Modal>
  );
};

export default OfficialPriceAlertModal;
