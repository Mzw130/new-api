/*
Copyright (C) 2025 QuantumNous

This program is free software: you can redistribute it and/or modify
it under the terms of the GNU Affero General Public License as
published by the Free Software Foundation, either version 3 of the
License, or (at your option) any later version.
*/

/** 首页营销文案（中英），避免向 classic 全量 locale 灌入 default 专用 key */
export function getHomeCopy(isChinese) {
  if (isChinese) {
    return {
      badge: 'OpenAI 兼容 AI 网关',
      stats: [
        { end: 50, suffix: '+', label: '上游服务接入' },
        { end: 100, suffix: '+', label: '模型计费支持' },
        { end: 50, suffix: '+', label: '兼容 API 路由' },
        { end: 10, suffix: '+', label: '调度控制能力' },
      ],
      featuresBadge: '核心能力',
      featuresTitle: '为开发者打造，',
      featuresTitleAccent: '为规模而生',
      featuresSubtitle: '几分钟内完成网关部署，统一管理模型、密钥与用量',
      features: [
        {
          num: '01',
          title: '极速响应',
          desc: '优化网络架构，毫秒级转发，稳定承载高并发请求',
        },
        {
          num: '02',
          title: '安全可靠',
          desc: '企业级权限与密钥管理，渠道隔离与配额控制',
        },
        {
          num: '03',
          title: '全球覆盖',
          desc: '多区域部署与负载均衡，保障访问稳定性',
        },
        {
          num: '04',
          title: '开发友好',
          desc: 'OpenAI 兼容接口，主流 Agent 与 IDE 即插即用',
        },
      ],
      featuresExtra: [
        { title: '高性能', desc: '自动负载均衡，支持高并发' },
        { title: '透明计费', desc: '按量计费，实时用量监控' },
        { title: '团队协作', desc: '多用户与灵活权限分配' },
        { title: '开源可部署', desc: '社区驱动，可私有化部署' },
      ],
      howBadge: '使用流程',
      howTitle: '三步即可上手',
      howSubtitle: '配置渠道、替换 Base URL、开始调用',
      steps: [
        {
          num: '1',
          title: '配置',
          desc: '添加 API Key，配置渠道与访问权限',
        },
        {
          num: '2',
          title: '接入',
          desc: '将客户端 Base URL 替换为网关地址即可调用',
        },
        {
          num: '3',
          title: '监控',
          desc: '实时查看用量、费用与渠道表现',
        },
      ],
      ctaTitle: '准备好简化',
      ctaTitleAccent: '你的 AI 接入了吗？',
      ctaDesc: '部署专属网关，在一个控制台管理上游、模型与密钥',
      ctaPrimary: '立即开始',
      ctaSecondary: '查看定价',
      viewDocs: '接入文档',
    };
  }

  return {
    badge: 'OpenAI-Compatible AI Gateway',
    stats: [
      { end: 50, suffix: '+', label: 'Upstream services integrated' },
      { end: 100, suffix: '+', label: 'Model billing support' },
      { end: 50, suffix: '+', label: 'Compatible API routes' },
      { end: 10, suffix: '+', label: 'Scheduling controls' },
    ],
    featuresBadge: 'Core Features',
    featuresTitle: 'Built for developers,',
    featuresTitleAccent: 'designed for scale',
    featuresSubtitle:
      'Deploy your gateway in minutes and manage models, keys, and usage in one place',
    features: [
      {
        num: '01',
        title: 'Lightning Fast',
        desc: 'Optimized routing for millisecond response and stable throughput',
      },
      {
        num: '02',
        title: 'Secure & Reliable',
        desc: 'Enterprise-grade keys, channels, quotas, and access control',
      },
      {
        num: '03',
        title: 'Global Coverage',
        desc: 'Multi-region deployment with load balancing for stable access',
      },
      {
        num: '04',
        title: 'Developer Friendly',
        desc: 'OpenAI-compatible APIs for agents, IDEs, and custom apps',
      },
    ],
    featuresExtra: [
      { title: 'High Performance', desc: 'Auto load balancing for high concurrency' },
      { title: 'Transparent Billing', desc: 'Pay-as-you-go with real-time usage' },
      { title: 'Team Collaboration', desc: 'Multi-user roles and permissions' },
      { title: 'Open Source', desc: 'Community-driven, self-hosted, extensible' },
    ],
    howBadge: 'How It Works',
    howTitle: 'Three steps to get started',
    howSubtitle: 'Configure channels, point clients to your Base URL, and go',
    steps: [
      {
        num: '1',
        title: 'Configure',
        desc: 'Add API keys, channels, and access permissions',
      },
      {
        num: '2',
        title: 'Connect',
        desc: 'Replace the client Base URL with your gateway endpoint',
      },
      {
        num: '3',
        title: 'Monitor',
        desc: 'Track usage, cost, and channel performance in real time',
      },
    ],
    ctaTitle: 'Ready to simplify',
    ctaTitleAccent: 'your AI integration?',
    ctaDesc:
      'Deploy your gateway and route requests through configured upstream services',
    ctaPrimary: 'Get Started',
    ctaSecondary: 'View Pricing',
    viewDocs: 'Integration Docs',
  };
}
