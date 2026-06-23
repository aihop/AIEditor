# AiEditor

一个面向 Vue 3 的现代化 AI 富文本编辑器，基于 [tiptap](https://tiptap.dev) 与 [shadcn-vue](https://www.shadcn-vue.com/) 构建，强调“高可定制 + 组件化 + 扩展驱动”。

[![MIT 许可证](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![](https://img.shields.io/npm/v/ai-editor.svg?label=version)](https://www.npmjs.com/package/ai-editor)
[![](https://img.shields.io/npm/dependency-version/ai-editor/peer/vue?color=vue)](https://www.npmjs.com/package/ai-editor)

[English](./README.md) | 中文

![应用截图](./screenshot/screenshot.png)

## 亮点

- ✨ AI 写作辅助（基于选区、快捷指令、流式输出、随时停止）
- 📝 Markdown 预览、源码模式、查找替换
- 🔤 常用富文本能力（标题、列表、引用、链接、颜色/高亮等）
- 📊 表格 / 代码块 / 多栏布局 / Iframe
- 🖼️ 图片与视频（提供上传扩展可选用）
- 🌍 国际化（`en`、`zhHans`）+ 主题系统（暗黑模式、圆角、主题色）
- 🧩 扩展式架构：通过 Tiptap Extensions 组合出你需要的编辑器
- 🎭 TypeScript 友好

## 安装

```bash
pnpm add ai-editor
# 或
npm i ai-editor
# 或
yarn add ai-editor
```

## 快速开始

### 方式一：全局注册（推荐）

```ts
// main.ts
import { createApp } from 'vue'
import App from './App.vue'
import AiEditor from 'ai-editor'
import 'ai-editor/style.css'

createApp(App).use(AiEditor).mount('#app')
```

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { BaseKit } from 'ai-editor'

const content = ref('')
const extensions = [
  BaseKit.configure({
    placeholder: {
      placeholder: '开始写作...',
    },
  }),
]
</script>

<template>
  <ai-editor v-model="content" :extensions="extensions" />
</template>
```

### 方式二：直接使用

```vue
<script setup lang="ts">
import { ref } from 'vue'
import { AiEditor, BaseKit } from 'ai-editor'
import 'ai-editor/style.css'

const content = ref('')
const extensions = [BaseKit.configure()]
</script>

<template>
  <AiEditor v-model="content" :extensions="extensions" />
</template>
```

## AI 接入

AI 能力由 `AI` 扩展提供。你只需要提供一个 `completions()` 方法（可选：自定义快捷指令）。

```ts
import { BaseKit, AI } from 'ai-editor'

const extensions = [
  BaseKit.configure(),
  AI.configure({
    toolbar: true,
    shortcuts: [],
    completions: async (history, signal) => {
      const resp = await fetch('/api/ai/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
        signal,
      })
      if (!resp.ok || !resp.body) throw new Error('AI 请求失败')

      const reader = resp.body.getReader()
      const decoder = new TextDecoder()

      async function* iterator() {
        let buf = ''
        while (true) {
          const { value, done } = await reader.read()
          if (done) return
          buf += decoder.decode(value, { stream: true })
          const lines = buf.split('\n')
          buf = lines.pop() ?? ''
          for (const line of lines) {
            const trimmed = line.trim()
            if (!trimmed.startsWith('data:')) continue
            const json = trimmed.slice('data:'.length).trim()
            if (!json || json === '[DONE]') continue
            yield JSON.parse(json)
          }
        }
      }

      return iterator()
    },
  }),
]
```

说明：

- `completions()` 需要返回一个 `AsyncIterable` 流式迭代器，chunk 结构遵循 OpenAI streaming：`chunk.choices[0].delta.content`。
- 强烈建议把 Key 放在后端：前端只调用你自己的 `/api/ai/chat`。

## 组件 Props 与事件

### Props

| 参数                 | 类型                                        | 默认值   | 说明                      |
| -------------------- | ------------------------------------------- | -------- | ------------------------- |
| modelValue           | `string \| JSONContent`                     | -        | 输入内容                  |
| output               | `'html' \| 'json' \| 'text'`                | `'html'` | 输出格式                  |
| disabled             | `boolean`                                   | `false`  | 只读                      |
| hideToolbar          | `boolean`                                   | `false`  | 隐藏 Toolbar              |
| hideMenubar          | `boolean`                                   | `false`  | 隐藏 Menubar              |
| hideBubble           | `boolean`                                   | `false`  | 隐藏气泡菜单              |
| dark                 | `boolean`                                   | 跟随系统 | 强制暗黑模式              |
| theme                | `Theme`                                     | `'zinc'` | 主题色预设                |
| radius               | `BorderRadius`                              | `0.5`    | 圆角                      |
| maxWidth             | `string \| number`                          | -        | 内容最大宽度              |
| minHeight            | `string \| number`                          | -        | 内容最小高度              |
| maxHeight            | `string \| number`                          | -        | 内容最大高度              |
| removeDefaultWrapper | `boolean`                                   | `false`  | 为空时移除 `<p></p>` 包裹 |
| extensions           | `AnyExtension[]`                            | -        | Tiptap 扩展列表           |
| editorClass          | `string \| string[] \| Record<string, any>` | -        | 容器 class                |
| contentClass         | `string \| string[] \| Record<string, any>` | -        | 内容 class                |
| customFullscreen     | `boolean`                                   | `false`  | 自定义全屏行为            |

### Emits

| 事件              | 参数                    | 说明         |
| ----------------- | ----------------------- | ------------ |
| update:modelValue | `string \| JSONContent` | v-model 更新 |
| change            | `{ editor, output }`    | 内容变化     |
| enter             | -                       | 按下 Enter   |
| fullscreenChange  | `boolean`               | 全屏切换     |

## 国际化

```ts
import { locale } from 'ai-editor'

locale.setLang('zhHans') // 'en' | 'zhHans'
```

## 主题

- 通过 `<ai-editor />` 的 `theme` / `dark` / `radius` 控制主题
- 或使用内置组件：`ThemeToggle`、`ThemePicker`

## 开发

```bash
pnpm install
pnpm dev
```

运行 examples（先构建 lib，再启动示例应用）：

```bash
pnpm examples
```

## 许可证

[MIT](https://choosealicense.com/licenses/mit/)
