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

```sh
yarn add @d2-craft/{typed,react-core}
```

:::
::: code-group-item npm

```sh
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

## 统一的树形 UI Schema

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
