/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React, { useCallback } from 'react';
import ReactMarkdown from 'react-markdown';
import { Link } from 'react-router-dom';
import RemarkGfm from 'remark-gfm';
import RemarkBreaks from 'remark-breaks';
import RehypeHighlight from 'rehype-highlight';
import { IconCopy } from '@douyinfe/semi-icons';
import { Button, Toast } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { copy } from '../../../helpers';
import 'highlight.js/styles/github.css';

function slugifyHeading(text) {
  return String(text)
    .trim()
    .toLowerCase()
    .replace(/[^\w\u4e00-\u9fff]+/gu, '-')
    .replace(/^-+|-+$/g, '');
}

function headingChildrenToText(children) {
  if (typeof children === 'string') return children;
  if (Array.isArray(children)) {
    return children.map((c) => (typeof c === 'string' ? c : '')).join('');
  }
  return '';
}

function DocsPreBlock({ children }) {
  const { t } = useTranslation();

  const handleCopy = useCallback(() => {
    const flatten = (node) => {
      if (node == null) return '';
      if (typeof node === 'string' || typeof node === 'number') return String(node);
      if (Array.isArray(node)) return node.map(flatten).join('');
      if (React.isValidElement(node)) return flatten(node.props?.children);
      return '';
    };
    const text = flatten(children).trim();
    copy(text).then((ok) => {
      if (ok) Toast.success({ content: t('代码已复制到剪贴板'), duration: 2 });
      else Toast.error({ content: t('复制失败，请手动复制'), duration: 2 });
    });
  }, [children, t]);

  return (
    <div className='docs-code-block group relative my-4'>
      <Button
        theme='borderless'
        size='small'
        icon={<IconCopy />}
        aria-label={t('复制代码')}
        onClick={handleCopy}
        className='!absolute !right-2 !top-2 z-10 !rounded-md !bg-white/90 !opacity-0 !shadow-sm transition-opacity group-hover:!opacity-100 dark:!bg-slate-800/90'
      />
      <pre className='docs-code-pre'>{children}</pre>
    </div>
  );
}

function DocsInlineCode({ children, ...props }) {
  return (
    <code className='docs-inline-code' {...props}>
      {children}
    </code>
  );
}

function DocsBlockCode({ className, children, ...props }) {
  return (
    <code className={className} {...props}>
      {children}
    </code>
  );
}

export default function DocsMarkdown({ content, className = '' }) {
  return (
    <div className={`docs-markdown ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          [
            RehypeHighlight,
            {
              detect: false,
              ignoreMissing: true,
            },
          ],
        ]}
        components={{
          pre: ({ children }) => <DocsPreBlock>{children}</DocsPreBlock>,
          code: ({ className, children, ...props }) => {
            const isFenced =
              Boolean(className && /language-/.test(className)) ||
              (typeof children === 'string' && children.includes('\n'));
            if (!isFenced) {
              return (
                <DocsInlineCode className={className} {...props}>
                  {children}
                </DocsInlineCode>
              );
            }
            return (
              <DocsBlockCode className={className} {...props}>
                {children}
              </DocsBlockCode>
            );
          },
          p: ({ children }) => (
            <p className='docs-md-p'>{children}</p>
          ),
          ul: ({ children }) => <ul className='docs-md-ul'>{children}</ul>,
          ol: ({ children }) => <ol className='docs-md-ol'>{children}</ol>,
          li: ({ children }) => <li className='docs-md-li'>{children}</li>,
          strong: ({ children }) => (
            <strong className='docs-md-strong'>{children}</strong>
          ),
          a: ({ href, children }) => {
            if (href?.startsWith('/')) {
              return (
                <Link to={href} className='docs-md-link'>
                  {children}
                </Link>
              );
            }
            return (
              <a
                href={href}
                target='_blank'
                rel='noopener noreferrer'
                className='docs-md-link'
              >
                {children}
              </a>
            );
          },
          h2: ({ children }) => {
            const text = headingChildrenToText(children);
            const id = slugifyHeading(text);
            return (
              <h2 id={id} className='docs-md-h2'>
                {children}
              </h2>
            );
          },
          h3: ({ children }) => {
            const text = headingChildrenToText(children);
            const id = slugifyHeading(text);
            return (
              <h3 id={id} className='docs-md-h3'>
                {children}
              </h3>
            );
          },
          table: ({ children }) => (
            <div className='docs-md-table-wrap'>
              <table className='docs-md-table'>{children}</table>
            </div>
          ),
          thead: ({ children }) => (
            <thead className='docs-md-thead'>{children}</thead>
          ),
          th: ({ children }) => <th className='docs-md-th'>{children}</th>,
          td: ({ children }) => <td className='docs-md-td'>{children}</td>,
          blockquote: ({ children }) => (
            <blockquote className='docs-md-blockquote'>{children}</blockquote>
          ),
        }}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
