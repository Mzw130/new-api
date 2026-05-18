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
import { Link } from 'react-router-dom';
import { Typography, Tag } from '@douyinfe/semi-ui';
import SkeletonWrapper from '../components/SkeletonWrapper';

const HeaderLogo = ({
  isMobile,
  isConsoleRoute,
  logo,
  logoLoaded,
  isLoading,
  systemName,
  isSelfUseMode,
  isDemoSiteMode,
  t,
}) => {
  if (isMobile && isConsoleRoute) {
    return null;
  }

  return (
    <Link
      to='/'
      className='group ml-0.5 flex items-center gap-2 rounded-xl py-1 pl-0.5 pr-1.5 transition-colors hover:bg-indigo-500/[0.07] dark:hover:bg-white/[0.05] md:gap-2.5 md:pr-2'
    >
      <div className='relative h-8 w-8 overflow-hidden rounded-xl ring-2 ring-indigo-200/55 ring-inset transition-all duration-200 group-hover:ring-indigo-400/70 dark:ring-indigo-500/40 md:h-8 md:w-8'>
        <SkeletonWrapper loading={isLoading || !logoLoaded} type='image' />
        <img
          src={logo}
          alt='logo'
          className={`absolute inset-0 box-border h-full w-full object-contain object-center transition-all duration-200 group-hover:scale-[1.04] ${!isLoading && logoLoaded ? 'opacity-100' : 'opacity-0'}`}
        />
      </div>
      <div className='hidden items-center gap-2 md:flex'>
        <div className='flex items-center gap-2'>
          <SkeletonWrapper
            loading={isLoading}
            type='title'
            width={120}
            height={24}
          >
            <Typography.Title
              heading={4}
              className='!mb-0 bg-gradient-to-r from-[var(--semi-color-text-0)] via-indigo-700 to-violet-700 !bg-clip-text !text-lg !font-semibold !text-transparent dark:from-zinc-100 dark:via-indigo-300 dark:to-violet-300'
            >
              {systemName}
            </Typography.Title>
          </SkeletonWrapper>
          {(isSelfUseMode || isDemoSiteMode) && !isLoading && (
            <Tag
              color={isSelfUseMode ? 'purple' : 'blue'}
              className='!rounded-md !border !border-indigo-200/60 !bg-indigo-50/90 !px-2 !py-0.5 !font-semibold !text-indigo-800 shadow-sm dark:!border-indigo-400/35 dark:!bg-indigo-950/60 dark:!text-indigo-100'
              size='small'
              shape='circle'
            >
              {isSelfUseMode ? t('自用模式') : t('演示站点')}
            </Tag>
          )}
        </div>
      </div>
    </Link>
  );
};

export default HeaderLogo;
