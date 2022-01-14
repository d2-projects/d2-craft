---
home: true
title: Home
heroImage: /images/logo.png
actions:
  - text: Get Started
    link: /guide/getting-started.html
    type: primary
  - text: Introduction
    link: /guide/
    type: secondary
features:
  - title: Simple Schema
    details: Only one root and nested nodes structure. Easy to compose and extend.
  - title: Type Safe
    details: All library write by TypeScript. Expose useful interfaces, types and some helper functions.
  - title: Multiple Framework
    details: Support for multiple front-end frameworks is implemented with the corresponding library (Cross frameworks are not considered).
footer: MIT Licensed
---

::: warning
This document is WIP. Come soon 🍷.
:::

## Used in different frameworks

### React

Install base library:

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
Library base Vue is WIP.
:::

<!--
Install base library:

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

## Simple UI Tree Schema

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