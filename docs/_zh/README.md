---
home: true
title: 主页
heroImage: /images/logo.png
actions:
  - text: 快速上手
    link: /_zh/guide/getting-started.html
    type: primary
  - text: 项目简介
    link: /_zh/guide/
    type: secondary
features:
  - title: 简单的 Schema
    details: 只有一个根节点和多个可嵌套子节点的结构，易于组合和扩展。
  - title: 类型安全
    details: 所有库都用 TypeScript 编写。暴露有用的接口、类型和一些辅助函数。
  - title: 多框架支持
    details: 使用对应的库实现对多种前端框架的支持（暂未考虑跨框架）。
footer: MIT Licensed
---

::: warning
此文档还在编写中，敬请期待 🍷。
:::

## 在不同的框架下使用

### React

安装基础依赖：

:::: code-group
::: code-group-item yarn

```sh:no-line-numbers
yarn add @d2-craft/{typed,react-core}
```

:::
::: code-group-item npm

```sh:no-line-numbers
npm install @d2-craft/typed @d2-craft/react-core
```

:::
::::

### Vue

::: warning
基于 Vue 的基础库还在开发中，敬请期待。
:::

<!--
安装基础依赖：

:::: code-group
::: code-group-item yarn

```sh
yarn add @d2-craft/{typed,vue-core}
```

:::
::: code-group-item npm

```sh
npm install @d2-craft/typed @d2-craft/vue-core
```

:::
::::
 -->

## 简单通用的树形 UI Schema

```json
{
  "children": [
    { "component": "Text" },
    { "component": "Text", "config": { "content": "Hello" } },
    {
      "component": "FlexContainer",
      "children": [
        { "component": "Text", "config": { "content": "inside" } },
        {
          "component": "FlexContainer",
          "config": { "direction": "horizontal", "spacing": "large" }
        }
      ]
    }
  ]
}
```
