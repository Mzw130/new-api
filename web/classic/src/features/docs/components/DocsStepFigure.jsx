/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React, { useState } from 'react';
import { ImagePreview } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';

export default function DocsStepFigure({ src, alt }) {
  const { t } = useTranslation();
  const [visible, setVisible] = useState(false);

  return (
    <figure className='docs-step-figure not-prose my-4 w-full'>
      <button
        type='button'
        className='docs-step-figure-btn block w-full cursor-zoom-in border-0 bg-transparent p-0 text-left'
        onClick={() => setVisible(true)}
        aria-label={t('docs.integration.clickImageToEnlarge')}
      >
        <img
          src={src}
          alt={alt}
          loading='lazy'
          decoding='async'
          className='docs-step-figure-img'
        />
      </button>
      <ImagePreview
        src={src}
        visible={visible}
        onVisibleChange={setVisible}
      />
    </figure>
  );
}
