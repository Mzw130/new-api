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

import React, { useContext, useEffect, useState } from 'react';
import {
  Button,
  Typography,
  Input,
  ScrollList,
  ScrollItem,
} from '@douyinfe/semi-ui';
import { API, showError, copy, showSuccess } from '../../helpers';
import { useIsMobile } from '../../hooks/common/useIsMobile';
import { API_ENDPOINTS } from '../../constants/common.constant';
import { StatusContext } from '../../context/Status';
import { useActualTheme } from '../../context/Theme';
import { marked } from 'marked';
import { useTranslation } from 'react-i18next';
import {
  IconGithubLogo,
  IconPlay,
  IconFile,
  IconCopy,
} from '@douyinfe/semi-icons';
import { Link } from 'react-router-dom';
import NoticeModal from '../../components/layout/NoticeModal';
import {
  Moonshot,
  OpenAI,
  XAI,
  Zhipu,
  Volcengine,
  Cohere,
  Claude,
  Gemini,
  Suno,
  Minimax,
  Wenxin,
  Spark,
  Qingyan,
  DeepSeek,
  Qwen,
  Midjourney,
  Grok,
  AzureAI,
  Hunyuan,
  Xinference,
} from '@lobehub/icons';

const { Text } = Typography;

const Home = () => {
  const { t, i18n } = useTranslation();
  const [statusState] = useContext(StatusContext);
  const actualTheme = useActualTheme();
  const [homePageContentLoaded, setHomePageContentLoaded] = useState(false);
  const [homePageContent, setHomePageContent] = useState('');
  const [noticeVisible, setNoticeVisible] = useState(false);
  const isMobile = useIsMobile();
  const isDemoSiteMode = statusState?.status?.demo_site_enabled || false;
  const docsLink = statusState?.status?.docs_link || '';
  const serverAddress =
    statusState?.status?.server_address || `${window.location.origin}`;
  const endpointItems = API_ENDPOINTS.map((e) => ({ value: e }));
  const [endpointIndex, setEndpointIndex] = useState(0);
  const isChinese = i18n.language.startsWith('zh');

  const displayHomePageContent = async () => {
    setHomePageContent(localStorage.getItem('home_page_content') || '');
    const res = await API.get('/api/home_page_content');
    const { success, message, data } = res.data;
    if (success) {
      let content = data;
      if (!data.startsWith('https://')) {
        content = marked.parse(data);
      }
      setHomePageContent(content);
      localStorage.setItem('home_page_content', content);

      // 如果内容是 URL，则发送主题模式
      if (data.startsWith('https://')) {
        const iframe = document.querySelector('iframe');
        if (iframe) {
          iframe.onload = () => {
            iframe.contentWindow.postMessage({ themeMode: actualTheme }, '*');
            iframe.contentWindow.postMessage({ lang: i18n.language }, '*');
          };
        }
      }
    } else {
      showError(message);
      setHomePageContent('加载首页内容失败...');
    }
    setHomePageContentLoaded(true);
  };

  const handleCopyBaseURL = async () => {
    const path = endpointItems[endpointIndex]?.value ?? '';
    const ok = await copy(`${serverAddress}${path}`);
    if (ok) {
      showSuccess(t('已复制到剪切板'));
    }
  };

  useEffect(() => {
    const checkNoticeAndShow = async () => {
      const lastCloseDate = localStorage.getItem('notice_close_date');
      const today = new Date().toDateString();
      if (lastCloseDate !== today) {
        try {
          const res = await API.get('/api/notice');
          const { success, data } = res.data;
          if (success && data && data.trim() !== '') {
            setNoticeVisible(true);
          }
        } catch (error) {
          console.error('获取公告失败:', error);
        }
      }
    };

    checkNoticeAndShow();
  }, []);

  useEffect(() => {
    displayHomePageContent().then();
  }, []);

  useEffect(() => {
    const timer = setInterval(() => {
      setEndpointIndex((prev) => (prev + 1) % endpointItems.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [endpointItems.length]);

  return (
    <div className='w-full overflow-x-hidden'>
      <NoticeModal
        visible={noticeVisible}
        onClose={() => setNoticeVisible(false)}
        isMobile={isMobile}
      />
      {homePageContentLoaded && homePageContent === '' ? (
          <div className='w-full overflow-x-hidden'>
          {/* Banner 部分 */}
          <div className='relative w-full min-h-[500px] overflow-x-hidden border-b border-semi-color-border md:min-h-[600px] lg:min-h-[720px] xl:min-h-[min(82vh,760px)] 2xl:min-h-[min(85vh,820px)] bg-gradient-to-b from-[var(--semi-color-bg-0)] via-indigo-50/[0.35] to-teal-50/[0.25] dark:via-[rgba(99,102,241,0.06)] dark:to-[rgba(15,23,42,0.6)]'>
            {/* 背景模糊晕染球 */}
            <div className='blur-ball blur-ball-indigo' />
            <div className='blur-ball blur-ball-teal' />
            <div className='blur-ball blur-ball-violet' aria-hidden />
            <div className='pointer-events-none absolute inset-0 opacity-[0.4] dark:opacity-[0.14] [background-image:linear-gradient(to_right,rgba(99,102,241,0.06)_1px,transparent_1px),linear-gradient(to_bottom,rgba(99,102,241,0.06)_1px,transparent_1px)] [background-size:52px_52px]' />
            {/* 大屏加宽：双栏 + 全宽供应商带，避免超宽屏中间一条过窄 */}
            <div className='relative mx-auto mt-8 flex h-full w-full max-w-[1800px] flex-col px-4 pb-16 pt-10 sm:px-6 md:mt-10 md:pb-20 md:pt-12 lg:pb-24 lg:pt-16 xl:px-10 xl:pb-28 2xl:max-w-[1920px] 2xl:px-14'>
              <div className='flex w-full flex-col items-stretch gap-12 xl:flex-row xl:items-center xl:gap-14 2xl:gap-20'>
                <div className='flex min-w-0 flex-1 flex-col items-center text-center xl:max-w-none xl:flex-1 xl:items-start xl:text-left'>
                  <div className='mb-6 flex w-full flex-col items-center xl:mb-8 xl:items-start'>
                    <h1
                      className={`w-full text-4xl font-bold leading-[1.08] md:text-5xl lg:text-6xl xl:text-6xl 2xl:text-7xl ${isChinese ? 'tracking-wide md:tracking-wider' : ''}`}
                    >
                      <span className='hero-home-title-lead block max-w-4xl text-balance xl:max-w-none'>
                        {t('统一的')}
                      </span>
                      <span className='hero-home-title-main mt-1 block max-w-4xl text-balance md:mt-2 xl:max-w-none'>
                        {t('大模型接口网关')}
                      </span>
                    </h1>
                    <p className='mt-4 max-w-xl text-base text-semi-color-text-1 md:mt-6 md:text-lg lg:text-xl xl:max-w-2xl 2xl:text-2xl 2xl:leading-relaxed'>
                      {t('更好的价格，更好的稳定性，只需要将模型基址替换为：')}
                    </p>
                    <div className='mx-auto mt-4 flex w-full max-w-xl flex-col items-stretch gap-3 md:mt-6 xl:mx-0 xl:max-w-2xl 2xl:max-w-3xl'>
                      <div className='rounded-2xl bg-gradient-to-r from-indigo-500/25 via-violet-500/20 to-teal-500/25 p-[2px] shadow-lg shadow-indigo-500/10 dark:shadow-black/40'>
                        <Input
                          readonly
                          value={`${serverAddress}${endpointItems[endpointIndex]?.value ?? ''}`}
                          className='!rounded-[14px] !border-0 !bg-[var(--semi-color-bg-0)] dark:!bg-[rgba(15,23,42,0.85)]'
                          size={isMobile ? 'default' : 'large'}
                          suffix={
                            <div className='flex items-center gap-2'>
                              <ScrollList
                                bodyHeight={32}
                                style={{ border: 'unset', boxShadow: 'unset' }}
                              >
                                <ScrollItem
                                  mode='wheel'
                                  cycled={true}
                                  list={endpointItems}
                                  selectedIndex={endpointIndex}
                                  onSelect={({ index }) =>
                                    setEndpointIndex(index)
                                  }
                                />
                              </ScrollList>
                              <Button
                                type='primary'
                                onClick={handleCopyBaseURL}
                                icon={<IconCopy />}
                                className='!rounded-full'
                              />
                            </div>
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className='flex flex-row flex-wrap items-center justify-center gap-4 xl:justify-start'>
                    <Link to='/console'>
                      <Button
                        theme='solid'
                        type='primary'
                        size={isMobile ? 'default' : 'large'}
                        className='!rounded-3xl border-0 bg-gradient-to-r from-indigo-600 to-violet-600 px-8 py-2 shadow-lg shadow-indigo-500/25 transition-all hover:from-indigo-500 hover:to-violet-500 2xl:px-10 2xl:!text-base'
                        icon={<IconPlay />}
                      >
                        {t('获取密钥')}
                      </Button>
                    </Link>
                    {isDemoSiteMode && statusState?.status?.version ? (
                      <Button
                        size={isMobile ? 'default' : 'large'}
                        className='flex items-center !rounded-3xl px-6 py-2'
                        icon={<IconGithubLogo />}
                        onClick={() =>
                          window.open(
                            'https://github.com/QuantumNous/new-api',
                            '_blank',
                          )
                        }
                      >
                        {statusState.status.version}
                      </Button>
                    ) : (
                      docsLink && (
                        <Button
                          size={isMobile ? 'default' : 'large'}
                          className='flex items-center !rounded-3xl px-6 py-2'
                          icon={<IconFile />}
                          onClick={() => window.open(docsLink, '_blank')}
                        >
                          {t('文档')}
                        </Button>
                      )
                    )}
                  </div>
                </div>

                {/* 大屏右侧：玻璃信息卡，填充视觉重量 */}
                <div className='mx-auto hidden w-full max-w-md shrink-0 xl:mx-0 xl:block xl:w-[min(100%,420px)] 2xl:w-[min(100%,480px)]'>
                  <div className='rounded-2xl border border-indigo-200/55 bg-white/65 p-5 shadow-[0_24px_60px_-24px_rgba(99,102,241,0.35)] backdrop-blur-md dark:border-white/10 dark:bg-slate-950/45 dark:shadow-black/50 2xl:p-6'>
                    <div className='mb-4 flex items-center gap-2 border-b border-indigo-100/70 pb-3 dark:border-white/10'>
                      <span
                        className='inline-flex h-7 w-7 items-center justify-center rounded-lg bg-gradient-to-br from-indigo-500 to-violet-600 text-xs font-bold text-white shadow-md shadow-indigo-500/25'
                        aria-hidden
                      >
                        API
                      </span>
                      <span className='text-left text-sm font-semibold text-semi-color-text-0'>
                        OpenAI-compatible
                      </span>
                    </div>
                    <p className='mb-3 text-left text-xs text-semi-color-text-2'>
                      {t('示例')}
                    </p>
                    <pre className='mb-5 max-h-[200px] overflow-x-auto overflow-y-auto whitespace-pre-wrap break-all rounded-xl bg-slate-950/[0.04] p-4 text-left font-mono text-[11px] leading-relaxed text-indigo-900/90 dark:bg-black/30 dark:text-indigo-100/95 2xl:text-xs'>
                      {`POST ${serverAddress}/v1/chat/completions\nAuthorization: Bearer YOUR_API_KEY\nContent-Type: application/json`}
                    </pre>
                    <div className='grid grid-cols-3 gap-2 text-center'>
                      <div className='rounded-xl border border-indigo-100/60 bg-indigo-50/50 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
                        <div className='text-lg font-bold text-indigo-600 dark:text-indigo-300'>
                          REST
                        </div>
                        <div className='text-[10px] font-medium text-semi-color-text-2'>
                          HTTP
                        </div>
                      </div>
                      <div className='rounded-xl border border-violet-100/60 bg-violet-50/40 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
                        <div className='text-lg font-bold text-violet-600 dark:text-violet-300'>
                          30+
                        </div>
                        <div className='text-[10px] font-medium text-semi-color-text-2'>
                          {t('渠道')}
                        </div>
                      </div>
                      <div className='rounded-xl border border-teal-100/60 bg-teal-50/40 px-2 py-2.5 dark:border-white/10 dark:bg-white/[0.04]'>
                        <div className='text-lg font-bold text-teal-600 dark:text-teal-300'>
                          1
                        </div>
                        <div className='text-[10px] font-medium text-semi-color-text-2'>
                          Base URL
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* 供应商：全宽带状区域，大屏更舒展 */}
              <div className='mt-14 w-full border-t border-indigo-100/55 pt-12 dark:border-white/[0.07] md:mt-16 md:pt-14 lg:mt-20 lg:pt-16 xl:mt-20'>
                <div className='mx-auto mb-8 flex max-w-6xl flex-col items-center gap-3 md:mb-10 2xl:max-w-7xl'>
                  <Text
                    type='tertiary'
                    className='!text-lg font-normal md:!text-xl lg:!text-2xl xl:!text-2xl 2xl:!text-3xl'
                  >
                    {t('支持众多的大模型供应商')}
                  </Text>
                  <div className='h-1 w-24 rounded-full bg-gradient-to-r from-indigo-400 via-violet-400 to-teal-400 opacity-80' />
                </div>
                <div className='mx-auto flex max-w-6xl flex-wrap items-center justify-center gap-3 px-2 sm:gap-4 md:gap-5 lg:gap-6 2xl:max-w-[100rem] 2xl:gap-8'>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Moonshot size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <OpenAI size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <XAI size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Zhipu.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Volcengine.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Cohere.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Claude.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Gemini.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Suno size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Minimax.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Wenxin.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Spark.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Qingyan.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <DeepSeek.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Qwen.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Midjourney size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Grok size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <AzureAI.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Hunyuan.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Xinference.Color size={40} />
                    </div>
                    <div className='flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-white/70 shadow-md shadow-indigo-500/5 ring-1 ring-black/[0.04] transition-transform duration-200 hover:scale-110 dark:bg-white/[0.06] dark:ring-white/10 sm:h-12 sm:w-12 md:h-14 md:w-14 2xl:h-16 2xl:w-16'>
                      <Typography.Text className='!text-lg sm:!text-xl md:!text-2xl lg:!text-3xl font-bold'>
                        30+
                      </Typography.Text>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
      ) : (
        <div className='overflow-x-hidden w-full'>
          {homePageContent.startsWith('https://') ? (
            <iframe
              src={homePageContent}
              className='w-full h-screen border-none'
            />
          ) : (
            <div
              className='mt-[60px]'
              dangerouslySetInnerHTML={{ __html: homePageContent }}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default Home;
