import { defineUserConfig } from 'vuepress';
import type { DefaultThemeOptions } from 'vuepress';

export default defineUserConfig<DefaultThemeOptions>({
  // site config
  lang: 'en-US',
  title: 'D2 Craft',
  description: 'Your frontend craft world: Config Driven UI.',

  // theme and its config
  theme: '@vuepress/theme-default',
  themeConfig: {
    logo: '/images/logo.png',
  },
});
