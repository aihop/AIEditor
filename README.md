# AiEditor

A modern AI-powered and highly customized rich-text editor for Vue 3, based on [tiptap](https://tiptap.dev) and [shadcn-vue](https://www.shadcn-vue.com/).

[![MIT License](https://img.shields.io/badge/License-MIT-green.svg)](https://choosealicense.com/licenses/mit/)
[![](https://img.shields.io/npm/v/ai-editor.svg?label=version)](https://www.npmjs.com/package/ai-editor)
[![](https://img.shields.io/npm/dependency-version/ai-editor/peer/vue?color=vue)](https://www.npmjs.com/package/ai-editor)

English | [中文](./README.zh-CN.md)

![App Screenshot](./screenshot/screenshot.png)

## Highlights

- ✨ AI writing assistance (selection-based, shortcut prompts, streaming output, cancel anytime)
- 📝 Markdown preview, source code mode, find/replace
- 🔤 Rich text formatting (heading, lists, quote, link, color/highlight, etc.)
- 📊 Table / code block / multi-column / iframe
- 🖼️ Image & video (built-in upload extensions available)
- 🌍 I18n (`en`, `zhHans`) and theme system (dark mode, radius, color presets)
- 🧩 Extensible: enable/disable features by Tiptap extensions
- 🎭 TypeScript-first

## Installation

```bash
pnpm add ai-editor
# or
npm i ai-editor
# or
yarn add ai-editor
```

## Quick Start

### Method 1: Global registration (recommended)

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
      placeholder: 'Start writing...',
    },
  }),
]
</script>

<template>
  <ai-editor v-model="content" :extensions="extensions" />
</template>
```

### Method 2: Direct usage

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

## AI Integration

The AI features are provided by the `AI` extension. You only need to supply a `completions()` function (and optionally shortcut prompts).

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
      if (!resp.ok || !resp.body) throw new Error('AI request failed')

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

Notes:

- `completions()` should return an `AsyncIterable` of chunks in OpenAI streaming format: `chunk.choices[0].delta.content`.
- Keep API keys on your server. The example above calls your own backend endpoint.

## Component Props & Events

### Props

| Prop                 | Type                                        | Default        | Description                    |
| -------------------- | ------------------------------------------- | -------------- | ------------------------------ |
| modelValue           | `string \| JSONContent`                     | -              | Input value                    |
| output               | `'html' \| 'json' \| 'text'`                | `'html'`       | Output format                  |
| disabled             | `boolean`                                   | `false`        | Readonly mode                  |
| hideToolbar          | `boolean`                                   | `false`        | Hide toolbar                   |
| hideMenubar          | `boolean`                                   | `false`        | Hide menubar                   |
| hideBubble           | `boolean`                                   | `false`        | Hide bubble menu               |
| dark                 | `boolean`                                   | follows system | Force dark mode                |
| theme                | `Theme`                                     | `'zinc'`       | Theme color preset             |
| radius               | `BorderRadius`                              | `0.5`          | Border radius                  |
| maxWidth             | `string \| number`                          | -              | Content max width              |
| minHeight            | `string \| number`                          | -              | Content min height             |
| maxHeight            | `string \| number`                          | -              | Content max height             |
| removeDefaultWrapper | `boolean`                                   | `false`        | Remove `<p></p>` when empty    |
| extensions           | `AnyExtension[]`                            | -              | Tiptap extensions              |
| editorClass          | `string \| string[] \| Record<string, any>` | -              | Container classes              |
| contentClass         | `string \| string[] \| Record<string, any>` | -              | Content classes                |
| customFullscreen     | `boolean`                                   | `false`        | Use custom fullscreen behavior |

### Emits

| Event             | Payload                 | Description        |
| ----------------- | ----------------------- | ------------------ |
| update:modelValue | `string \| JSONContent` | v-model update     |
| change            | `{ editor, output }`    | Content changed    |
| enter             | -                       | Enter key pressed  |
| fullscreenChange  | `boolean`               | Fullscreen toggled |

## I18n

```ts
import { locale } from 'ai-editor'

locale.setLang('en') // 'en' | 'zhHans'
```

## Theme

- Use `theme`, `dark`, `radius` props on `<ai-editor />`
- Or use built-in components: `ThemeToggle`, `ThemePicker`

## Development

```bash
pnpm install
pnpm dev
```

Run examples (build library + start example app):

```bash
pnpm examples
```

## License

[MIT](https://choosealicense.com/licenses/mit/)
