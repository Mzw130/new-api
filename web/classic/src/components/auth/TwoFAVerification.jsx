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
import { API, showError, showSuccess } from '../../helpers';
import {
  Button,
  Card,
  Divider,
  Form,
  Typography,
} from '@douyinfe/semi-ui';
import React, { useState } from 'react';

const { Title, Paragraph } = Typography;

const TIPS = [
  '验证码每30秒更新一次',
  '如果无法获取验证码，请使用备用码',
  '每个备用码只能使用一次',
];

const TwoFATipsBlock = ({ className = '' }) => (
  <div
    className={`relative overflow-visible rounded-2xl border border-indigo-200/60 bg-gradient-to-br from-indigo-50/95 via-white/70 to-teal-50/35 p-4 shadow-sm shadow-indigo-500/5 dark:border-white/[0.12] dark:from-indigo-950/35 dark:via-slate-900/40 dark:to-teal-950/20 dark:shadow-none ${className}`}
  >
    <div
      className='pointer-events-none absolute -right-10 -top-10 h-28 w-28 rounded-full bg-gradient-to-br from-violet-400/25 to-indigo-400/10 blur-2xl dark:from-violet-500/15 dark:to-indigo-500/10'
      aria-hidden
    />
    <div className='relative text-left'>
      <div className='mb-3 flex items-center gap-2'>
        <span className='inline-flex h-6 w-6 items-center justify-center rounded-md bg-indigo-500/15 text-indigo-600 dark:bg-indigo-400/20 dark:text-indigo-300'>
          <svg
            className='h-3.5 w-3.5'
            fill='none'
            viewBox='0 0 24 24'
            stroke='currentColor'
            strokeWidth={2}
            aria-hidden
          >
            <path
              strokeLinecap='round'
              strokeLinejoin='round'
              d='M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z'
            />
          </svg>
        </span>
        <span className='text-xs font-semibold uppercase tracking-wider text-indigo-700/90 dark:text-indigo-300/95'>
          提示
        </span>
      </div>
      <ul className='m-0 list-none space-y-2.5 p-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
        {TIPS.map((line) => (
          <li key={line} className='flex gap-2.5'>
            <span
              className='mt-[0.45em] h-1.5 w-1.5 shrink-0 rounded-full bg-gradient-to-br from-indigo-500 to-violet-500 dark:from-indigo-400 dark:to-violet-400'
              aria-hidden
            />
            <span className='min-w-0 flex-1 text-balance'>{line}</span>
          </li>
        ))}
      </ul>
    </div>
  </div>
);

const primarySubmitClass =
  '!rounded-full w-full border-0 bg-gradient-to-r from-indigo-600 to-violet-600 shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 hover:shadow-indigo-500/35';

const glassCardClass =
  '!rounded-2xl overflow-hidden border border-white/80 bg-white/85 shadow-[0_28px_90px_-28px_rgba(79,70,229,0.28)] backdrop-blur-xl dark:border-white/[0.08] dark:bg-[rgba(15,23,42,0.82)] dark:shadow-black/45';

const TwoFAVerification = ({ onSuccess, onBack, isModal = false }) => {
  const [loading, setLoading] = useState(false);
  const [useBackupCode, setUseBackupCode] = useState(false);
  const [verificationCode, setVerificationCode] = useState('');

  const handleSubmit = async () => {
    if (!verificationCode) {
      showError('请输入验证码');
      return;
    }
    // Validate code format
    if (useBackupCode && verificationCode.length !== 8) {
      showError('备用码必须是8位');
      return;
    } else if (!useBackupCode && !/^\d{6}$/.test(verificationCode)) {
      showError('验证码必须是6位数字');
      return;
    }

    setLoading(true);
    try {
      const res = await API.post('/api/user/login/2fa', {
        code: verificationCode,
      });

      if (res.data.success) {
        showSuccess('登录成功');
        // 保存用户信息到本地存储
        localStorage.setItem('user', JSON.stringify(res.data.data));
        if (onSuccess) {
          onSuccess(res.data.data);
        }
      } else {
        showError(res.data.message);
      }
    } catch (error) {
      showError('验证失败，请重试');
    } finally {
      setLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  const toggleBackupClass =
    '!text-indigo-600 hover:!text-indigo-500 dark:!text-indigo-400 dark:hover:!text-indigo-300';

  if (isModal) {
    return (
      <div className='space-y-5'>
        <div className='rounded-xl border border-indigo-100/70 bg-gradient-to-r from-indigo-50/90 via-white/80 to-teal-50/40 px-4 py-3 dark:border-white/[0.08] dark:from-indigo-950/25 dark:via-slate-900/50 dark:to-teal-950/15'>
          <Paragraph className='!mb-0 text-sm leading-relaxed text-gray-600 dark:text-gray-300'>
            请输入认证器应用显示的验证码完成登录
          </Paragraph>
        </div>

        <Form onSubmit={handleSubmit}>
          <Form.Input
            field='code'
            label={useBackupCode ? '备用码' : '验证码'}
            placeholder={useBackupCode ? '请输入8位备用码' : '请输入6位验证码'}
            value={verificationCode}
            onChange={setVerificationCode}
            onKeyPress={handleKeyPress}
            size='large'
            className='!rounded-xl'
            style={{ marginBottom: 16 }}
            autoFocus
          />

          <Button
            htmlType='submit'
            theme='solid'
            type='primary'
            loading={loading}
            block
            size='large'
            className={primarySubmitClass}
            style={{ marginBottom: 4 }}
          >
            验证并登录
          </Button>
        </Form>

        <div
          className='h-px bg-gradient-to-r from-transparent via-indigo-200/70 to-transparent dark:via-white/15'
          role='separator'
        />

        <div className='flex flex-wrap items-center justify-center gap-x-3 gap-y-2'>
          <Button
            theme='borderless'
            type='tertiary'
            onClick={() => {
              setUseBackupCode(!useBackupCode);
              setVerificationCode('');
            }}
            className={`${toggleBackupClass} !rounded-lg`}
          >
            {useBackupCode ? '使用认证器验证码' : '使用备用码'}
          </Button>

          {onBack && (
            <Button
              theme='borderless'
              type='tertiary'
              onClick={onBack}
              className={`${toggleBackupClass} !rounded-lg`}
            >
              返回登录
            </Button>
          )}
        </div>

        <TwoFATipsBlock />
      </div>
    );
  }

  return (
    <div className='relative flex min-h-[65vh] items-center justify-center overflow-hidden px-4 py-12'>
      <div className='pointer-events-none absolute inset-0 opacity-[0.35] dark:opacity-[0.12] [background-image:linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:48px_48px]' />
      <div className='blur-ball blur-ball-indigo !opacity-[0.22] dark:!opacity-[0.35]' />
      <div className='blur-ball blur-ball-teal !opacity-[0.18] dark:!opacity-[0.28]' />
      <Card className={`relative z-[1] w-full max-w-md ${glassCardClass}`}>
        <div className='px-2 pb-2 pt-8 md:px-4'>
          <div className='mb-8 text-center'>
            <Title heading={3} className='!font-semibold !text-gray-900 dark:!text-gray-50'>
              两步验证
            </Title>
            <Paragraph type='secondary' className='!mt-3 !mb-0'>
              请输入认证器应用显示的验证码完成登录
            </Paragraph>
          </div>

          <Form onSubmit={handleSubmit}>
            <Form.Input
              field='code'
              label={useBackupCode ? '备用码' : '验证码'}
              placeholder={
                useBackupCode ? '请输入8位备用码' : '请输入6位验证码'
              }
              value={verificationCode}
              onChange={setVerificationCode}
              onKeyPress={handleKeyPress}
              size='large'
              className='!rounded-xl'
              style={{ marginBottom: 16 }}
              autoFocus
            />

            <Button
              htmlType='submit'
              theme='solid'
              type='primary'
              loading={loading}
              block
              size='large'
              className={primarySubmitClass}
              style={{ marginBottom: 16 }}
            >
              验证并登录
            </Button>
          </Form>

          <Divider />

          <div className='text-center'>
            <Button
              theme='borderless'
              type='tertiary'
              onClick={() => {
                setUseBackupCode(!useBackupCode);
                setVerificationCode('');
              }}
              className={`${toggleBackupClass} mr-4`}
            >
              {useBackupCode ? '使用认证器验证码' : '使用备用码'}
            </Button>

            {onBack && (
              <Button
                theme='borderless'
                type='tertiary'
                onClick={onBack}
                className={toggleBackupClass}
              >
                返回登录
              </Button>
            )}
          </div>

          <TwoFATipsBlock className='mt-6' />
        </div>
      </Card>
    </div>
  );
};

export default TwoFAVerification;
