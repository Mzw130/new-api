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
import { Tag } from '@douyinfe/semi-ui';
import { formatOfficialTokenPrice } from '../../../../../helpers/official-pricing/format-official-price';

const lineStyle = { color: 'var(--semi-color-text-1)' };

const CardOfficialPrice = ({ official, tokenUnit, displayPrice, t }) => {
  if (!official) return null;

  const unitLabel = tokenUnit === 'K' ? '1K' : '1M';
  const inputLabel = formatOfficialTokenPrice(
    official.officialInputPerM,
    tokenUnit,
    displayPrice,
    official.officialCurrency,
  );
  const outputLabel = formatOfficialTokenPrice(
    official.officialOutputPerM,
    tokenUnit,
    displayPrice,
    official.officialCurrency,
  );

  if (!inputLabel && !outputLabel) {
    return null;
  }

  const discount = official.discountPercent;
  const canShowSavings =
    discount != null && !Number.isNaN(discount);
  const savePercent = canShowSavings ? Math.max(0, discount) : null;

  return (
    <div
      className='flex flex-wrap items-center gap-x-2 gap-y-0.5 mt-1 pt-1 border-t'
      style={{ borderColor: 'var(--semi-color-border)' }}
      onClick={(e) => e.stopPropagation()}
    >
      <span
        className='text-xs font-medium shrink-0'
        style={{ color: 'var(--semi-color-text-2)' }}
      >
        {t('官方')}
      </span>
      {inputLabel ? (
        <span className='text-xs whitespace-nowrap' style={lineStyle}>
          {t('输入')} {inputLabel}/{unitLabel}
        </span>
      ) : null}
      {outputLabel ? (
        <span className='text-xs whitespace-nowrap' style={lineStyle}>
          {t('输出')} {outputLabel}/{unitLabel}
        </span>
      ) : null}
      {savePercent != null ? (
        <Tag size='small' color={savePercent > 0 ? 'green' : 'grey'}>
          {t('Save {{percent}}%', { percent: savePercent.toFixed(0) })}
        </Tag>
      ) : null}
    </div>
  );
};

export default CardOfficialPrice;
