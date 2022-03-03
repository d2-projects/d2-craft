import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';
import { navbar, sidebar } from './configs';

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: 'en-US',
  title: 'D2 Craft',
  description: 'Your frontend craft world: Meta-data Driven UI.',

  // access analyze
  head: [
    [
      'script',
      {
        type: 'text/javascript',
        src: 'https://hm.baidu.com/hm.js?0af4f55a2966d4253bb8b663fe67617c',
      },
    ],
  ],

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/craft-pre-logo.svg',
    repo: 'https://github.com/d2-projects/d2-craft',
    docsDir: 'docs',

    // i18n translate
    locales: {
      /**
       * English locale config
       *
       * As the default locale of @vuepress/theme-default is English,
       * we don't need to set all of the locale fields
       */
      '/': {
        // navbar
        navbar: navbar.en,

        // sidebar
        sidebar: sidebar.en,

        // page meta
        editLinkText: 'Edit this page on GitHub',
      },

      /**
       * Chinese locale config
       */
      '/_zh/': {
        // navbar
        navbar: navbar.zh,
        selectLanguageName: '简体中文 🇨🇳',
        selectLanguageText: '选择语言',
        selectLanguageAriaLabel: '选择语言',

        // sidebar
        sidebar: sidebar.zh,

        // page meta
        editLinkText: '在 GitHub 上编辑此页',
        lastUpdatedText: '上次更新',
        contributorsText: '贡献者',

        // custom containers
        tip: '提示',
        warning: '注意',
        danger: '警告',

        // 404 page
        notFound: [
          '这里什么都没有',
          '我们怎么到这来了？',
          '这是一个 404 页面',
          '看起来我们进入了错误的链接',
        ],
        backToHome: '返回首页',

        // a11y
        openInNewWindow: '在新窗口打开',
        toggleDarkMode: '切换夜间模式',
        toggleSidebar: '切换侧边栏',
      },
    },
  },

  // i18n support
  locales: {
    '/': {
      lang: 'en-US',
      title: 'D2 Craft',
      description: 'Your frontend craft world: Meta-data Driven UI.',
    },
    '/_zh/': {
      lang: 'zh-CN',
      title: 'D2 Craft',
      description: '你的前端自由世界：元数据驱动交互',
    },
  },

  plugins: [
    [
      '@vuepress/plugin-search',
      {
        locales: {
          '/': {
            placeholder: 'Search',
          },
          '/_zh/': {
            placeholder: '搜索',
          },
        },
      },
    ],
  ],
});
