import type { SidebarConfig } from '@vuepress/theme-default';

export const zh: SidebarConfig = {
  '/_zh/guide/': [
    {
      text: '指南',
      children: ['/_zh/guide/README.md', '/_zh/guide/getting-started.md'],
    },
  ],
};
