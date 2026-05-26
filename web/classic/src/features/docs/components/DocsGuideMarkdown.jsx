/*
Copyright (C) 2023-2026 QuantumNous

SPDX-License-Identifier: AGPL-3.0-or-later
*/
import React from 'react';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';
import RemarkGfm from 'remark-gfm';
import RemarkBreaks from 'remark-breaks';
import RehypeHighlight from 'rehype-highlight';
import RehypeRaw from 'rehype-raw';
import { IconAlertTriangle, IconInfoCircle } from '@douyinfe/semi-icons';
import { IconCopy } from '@douyinfe/semi-icons';
import { Button, Toast } from '@douyinfe/semi-ui';
import { useTranslation } from 'react-i18next';
import { copy } from '../../../helpers';
import DocsStepFigure from './DocsStepFigure';

function DocsPreBlock({ children }) {
  const { t } = useTranslation();
  const handleCopy = React.useCallback(() => {
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

function isCalloutQuote(text) {
  return (
    text.includes('注意') ||
    text.includes('Note:') ||
    text.includes('关键说明') ||
    text.includes('Key') ||
    text.includes('Warning')
  );
}

function isIntroQuote(text) {
  return text.includes('教程') || text.includes('Connect') || text.includes('OpenCode');
}

function stepMeta(text) {
  const m = /^(\d+)\.\s*(.+)$/.exec(String(text).trim());
  if (!m) return null;
  return { index: m[1], title: m[2] };
}

function DocsGuideCallout({ children, variant = 'note' }) {
  const isWarning = variant === 'warning';
  return (
    <div
      className={`docs-guide-callout not-prose my-5 flex gap-3 rounded-lg border px-4 py-3 text-sm leading-relaxed ${
        isWarning
          ? 'border-amber-500/35 bg-amber-500/10'
          : 'border-indigo-200/60 bg-indigo-50/50 dark:border-indigo-500/25 dark:bg-indigo-950/30'
      }`}
    >
      {isWarning ? (
        <IconAlertTriangle className='mt-0.5 shrink-0 text-amber-600' aria-hidden />
      ) : (
        <IconInfoCircle className='mt-0.5 shrink-0 text-indigo-600 dark:text-indigo-300' aria-hidden />
      )}
      <div className='min-w-0 [&_p]:m-0'>{children}</div>
    </div>
  );
}

function DocsGuideHero({ children }) {
  return (
    <div className='docs-guide-hero not-prose relative mb-8 overflow-hidden rounded-xl border border-indigo-200/70 bg-gradient-to-br from-indigo-50/90 via-white to-teal-50/40 p-5 dark:border-indigo-500/25 dark:from-indigo-950/50 dark:via-slate-900 dark:to-slate-900/80 md:p-6'>
      <div className='text-sm leading-relaxed md:text-[15px]'>{children}</div>
    </div>
  );
}

const guideComponents = {
  pre: ({ children }) => <DocsPreBlock>{children}</DocsPreBlock>,
  code: ({ className, children, ...props }) => {
    const isFenced =
      Boolean(className && /language-/.test(className)) ||
      (typeof children === 'string' && children.includes('\n'));
    if (!isFenced) {
      return (
        <code className='docs-inline-code' {...props}>
          {children}
        </code>
      );
    }
    return (
      <code className={className} {...props}>
        {children}
      </code>
    );
  },
  blockquote: ({ children }) => {
    const text = headingChildrenToText(children);
    if (isIntroQuote(text)) return <DocsGuideHero>{children}</DocsGuideHero>;
    if (isCalloutQuote(text)) {
      return <DocsGuideCallout variant='warning'>{children}</DocsGuideCallout>;
    }
    return <DocsGuideCallout>{children}</DocsGuideCallout>;
  },
  h2: ({ children }) => {
    const id = slugifyHeading(headingChildrenToText(children));
    return (
      <h2 id={id} className='docs-guide-h2'>
        {children}
      </h2>
    );
  },
  h3: ({ children }) => {
    const id = slugifyHeading(headingChildrenToText(children));
    return (
      <h3 id={id} className='docs-guide-h3'>
        {children}
      </h3>
    );
  },
  h4: ({ children }) => {
    const text = headingChildrenToText(children);
    const step = stepMeta(text);
    const id = slugifyHeading(text);
    if (step) {
      return (
        <h4 id={id} className='docs-guide-step-h4'>
          <span className='docs-guide-step-badge'>{step.index}</span>
          <span>{step.title}</span>
        </h4>
      );
    }
    return (
      <h4 id={id} className='docs-guide-h4'>
        {children}
      </h4>
    );
  },
  p: ({ children }) => <p className='docs-md-p'>{children}</p>,
  ul: ({ children }) => <ul className='docs-md-ul'>{children}</ul>,
  ol: ({ children }) => <ol className='docs-md-ol'>{children}</ol>,
  li: ({ children }) => <li className='docs-md-li'>{children}</li>,
  strong: ({ children }) => <strong className='docs-md-strong'>{children}</strong>,
  table: ({ children }) => (
    <div className='docs-md-table-wrap'>
      <table className='docs-md-table'>{children}</table>
    </div>
  ),
  thead: ({ children }) => <thead className='docs-md-thead'>{children}</thead>,
  th: ({ children }) => <th className='docs-md-th'>{children}</th>,
  td: ({ children }) => <td className='docs-md-td'>{children}</td>,
  img: ({ src, alt }) => {
    if (!src || typeof src !== 'string') return null;
    return <DocsStepFigure src={src} alt={alt ?? ''} />;
  },
  a: ({ href, children }) => {
    if (href?.startsWith('/')) {
      return (
        <Link to={href} className='docs-md-link'>
          {children}
        </Link>
      );
    }
    return (
      <a href={href} target='_blank' rel='noopener noreferrer' className='docs-md-link'>
        {children}
      </a>
    );
  },
  div: ({ className, class: htmlClass, children, ...rest }) => {
    const cls = [className, htmlClass].filter(Boolean).join(' ');
    if (cls.includes('docs-platform-card')) {
      return (
        <section className={`docs-platform-card ${cls}`.trim()} {...rest}>
          {children}
        </section>
      );
    }
    if (cls.includes('docs-platform-body')) {
      return <div className={`docs-platform-body ${cls}`.trim()}>{children}</div>;
    }
    if (cls.includes('docs-figure-grid')) {
      return (
        <div className={`docs-figure-grid not-prose ${cls}`.trim()} {...rest}>
          {children}
        </div>
      );
    }
    return (
      <div className={cls || undefined} {...rest}>
        {children}
      </div>
    );
  },
};

export default function DocsGuideMarkdown({ content, className = '' }) {
  return (
    <div className={`docs-markdown docs-guide-prose ${className}`.trim()}>
      <ReactMarkdown
        remarkPlugins={[RemarkGfm, RemarkBreaks]}
        rehypePlugins={[
          RehypeRaw,
          [RehypeHighlight, { detect: false, ignoreMissing: true }],
        ]}
        components={guideComponents}
      >
        {content}
      </ReactMarkdown>
    </div>
  );
}
