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
import { Link, useLocation } from 'react-router-dom';
import SkeletonWrapper from '../components/SkeletonWrapper';

function navLinkIsActive(pathname, link) {
  if (link.isExternal) {
    return false;
  }
  switch (link.itemKey) {
    case 'home':
      return pathname === '/';
    case 'console':
      return pathname.startsWith('/console');
    case 'pricing':
      return pathname.startsWith('/pricing');
    case 'about':
      return pathname.startsWith('/about');
    case 'docs':
      return pathname.startsWith('/docs');
    default:
      return false;
  }
}

const Navigation = ({
  mainNavLinks,
  isMobile,
  isLoading,
  userState,
  pricingRequireAuth,
}) => {
  const location = useLocation();
  const pathname = location.pathname;

  const renderNavLinks = () => {
    const shell =
      'flex flex-shrink-0 items-center gap-1 rounded-lg font-semibold transition-all duration-200 ease-out';
    const spacing = isMobile ? 'px-2 py-1.5' : 'px-3 py-2';
    const inactive = `${shell} ${spacing} text-semi-color-text-1 hover:bg-indigo-500/[0.08] hover:text-indigo-600 dark:hover:bg-white/[0.06] dark:hover:text-indigo-300`;
    const active = `${shell} ${spacing} bg-gradient-to-r from-indigo-500/18 via-violet-500/12 to-teal-600/10 text-indigo-700 shadow-sm ring-1 ring-indigo-400/30 dark:text-indigo-200 dark:ring-indigo-400/25`;

    return mainNavLinks.map((link) => {
      const linkContent = (
        <span className='whitespace-nowrap text-sm md:text-[0.9375rem]'>
          {link.text}
        </span>
      );

      if (link.isExternal) {
        return (
          <a
            key={link.itemKey}
            href={link.externalLink}
            target='_blank'
            rel='noopener noreferrer'
            className={inactive}
          >
            {linkContent}
          </a>
        );
      }

      let targetPath = link.to;
      if (link.itemKey === 'console' && !userState.user) {
        targetPath = '/login';
      }
      if (link.itemKey === 'pricing' && pricingRequireAuth && !userState.user) {
        targetPath = '/login';
      }

      const routeActive = navLinkIsActive(pathname, link);
      const mergedClasses = routeActive ? active : inactive;

      return (
        <Link key={link.itemKey} to={targetPath} className={mergedClasses}>
          {linkContent}
        </Link>
      );
    });
  };

  return (
    <nav className='header-main-nav mx-1 flex min-w-0 flex-1 items-center justify-center gap-0.5 overflow-x-auto whitespace-nowrap px-0.5 scrollbar-hide md:mx-3 md:gap-1 lg:mx-6 lg:gap-1.5'>
      <SkeletonWrapper
        loading={isLoading}
        type='navigation'
        count={4}
        width={60}
        height={16}
        isMobile={isMobile}
      >
        {renderNavLinks()}
      </SkeletonWrapper>
    </nav>
  );
};

export default Navigation;
