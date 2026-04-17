<template>
  <div class="min-h-screen bg-background ft-editor">
    <main class="my-0 mx-auto max-w-[1024px] p-6">
      <div class="mb-2">
        <button
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="locale.setLang('zhHans')"
        >
          中文
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="locale.setLang('en')"
        >
          English
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="disabled = !disabled"
        >
          {{ disabled ? 'Editable' : 'Readonly' }}
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="hideMenubar = !hideMenubar"
        >
          {{ !hideMenubar ? 'Hide Menubar' : 'Show Menubar' }}
        </button>
        <button
          class="inline-flex items-center justify-center rounded-md px-3 py-2 text-sm transition-colors hover:bg-accent hover:text-accent-foreground"
          @click="toggleMinimal"
        >
          {{ minimal ? 'Full' : 'Minimal' }}
        </button>
      </div>
      <FtEditor
        ref="editor"
        key="minimal"
        :hideMenubar="true"
        :extensions="minimalExtensions"
        v-model="contentMini"
        :maxHeight="200"
        output="html"
        :custom-fullscreen="true"
        @fullscreenChange="handleFullscreenChange"
        :showFocusClass="false"
        :style="{ '--ft-outline-color': outlineColor, '--ft-primary-color': outlineColor, 'border-radius': '0.1rem' }"
      />
      <div class="rounded-lg border bg-card text-card-foreground shadow-sm">
        <FtEditor
          ref="editor"
          :key="minimal ? 'minimal' : 'full'"
          :hideMenubar="hideMenubar || minimal"
          :extensions="extensions"
          :disabled="disabled"
          v-model="content"
          :maxHeight="512"
          output="html"
          :custom-fullscreen="true"
          @fullscreenChange="handleFullscreenChange"
          :showFocusClass="false"
          :style="{ '--ft-outline-color': outlineColor, '--ft-primary-color': outlineColor, 'border-radius': '0.1rem' }"
        />
      </div>
    </main>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, markRaw, onMounted, h } from 'vue'
import {
  Bold,
  BulletList,
  Italic,
  BaseKit,
  locale,
  Underline,
  Strike,
  LineHeight,
  Image,
  History,
  Heading,
  CodeBlock,
  FontSize,
  Highlight,
  Table,
  Clear,
  Blockquote,
  Link,
  Color,
  Video,
  OrderedList,
  HorizontalRule,
  Fullscreen,
  TaskList,
  MoreMark,
  FormatPainter,
  SlashCommand,
  Indent,
  Columns,
  TextAlign,
  ImageUpload,
  VideoUpload,
  FontFamily,
  FindAndReplace,
  SourceCode,
  Code,
  AI,
  Preview,
  SpecialCharacter,
  Emoji,
  FtEditor,
  Printer,
  Iframe,
  Extension,
} from '../index'

import { useTiptapStore } from '../hooks/index'

function closeAIMenuShortcut() {
  const store = useTiptapStore()
  store.state.AIMenuShortcut = false
}

const outlineColor = ref('#3b82f6') // Tailwind blue-500

function setEditorOutlineColor(color: string) {
  outlineColor.value = color
}

const MyToolbarButton = Extension.create({
  name: 'myToolbarButton',
  addOptions() {
    return {
      sort: 999, // 控制按钮排序，越小越靠前
      toolbar: true, // 必须为 true
      button: ({ editor, extension, t }) => ({
        component: Upload,
        componentProps: {
          icon: 'plus',
          tooltip: '自定义按钮',
          action: () => {
            // 你的自定义逻辑
            editor.chain().focus().run()
          },
        },
      }),
    }
  },
})

import ThemeToggle from '@/components/ThemeToggle.vue'
import { JSONContent } from '../index'
import { DEMO_CONTENT } from './content'
import Upload from './Upload.vue'
import Select from './Select.vue'

const content = ref<string | JSONContent>(DEMO_CONTENT)
const contentMini = ref<string | JSONContent>('<p>这是一个简约版的编辑器，只包含基本功能。</p>')
const disabled = ref<boolean>(false)
const minimal = ref(false)
const hideMenubar = ref<boolean>(true)
const editor = ref()

const AIParams = ref({})

const minimalExtensions = [
  BaseKit.configure({
    characterCount: {
      limit: 50000,
    },
  }),
  Heading,
  Bold.configure({ spacer: true }),
  Italic,
  Underline,
  HorizontalRule,
  TextAlign.configure({ types: ['heading', 'paragraph', 'image'], spacer: true }),
  Image,
  Blockquote.configure({ spacer: true }),
  Code,
  Link.configure({
    componentSlot: ({ editor, extension }) =>
      h(Select, {
        editor,
        icon: 'upload',
        tooltip: '上传',
        action: () => {
          // editor.chain().focus().run()
          console.log('clicked')
        },
        link: '外部传入的link',
        text: '外部传入的text',
      }),
  }),
  Color,
  TaskList.configure({ spacer: true }),
  OrderedList,
  BulletList,
  Emoji,
  FindAndReplace.configure({ spacer: true }),
]

const extensions = computed(() => (minimal.value ? minimalExtensions : fullExtensions))

const fullExtensions = [
  BaseKit.configure({
    characterCount: {
      limit: 50000,
    },
  }),
  History,
  Columns,
  FormatPainter,
  Clear,
  Heading.configure({ spacer: true }),
  FontSize,
  FontFamily,
  Bold,
  Italic,
  Underline,
  Strike,
  MoreMark,
  Color.configure({ spacer: true }),
  Highlight,
  BulletList,
  OrderedList,
  TextAlign.configure({ types: ['heading', 'paragraph', 'image'], spacer: true }),
  Indent,
  LineHeight,
  TaskList.configure({
    spacer: true,
    taskItem: {
      nested: true,
    },
  }),
  Link,
  Image,
  ImageUpload.configure({
    upload: (files: File) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 3000)
      })
    },
    componentSlot: ({ editor, extension }) =>
      h(Upload, {
        editor,
        icon: 'upload',
        tooltip: '上传',
        action: () => {
          // editor.chain().focus().run()
          console.log('clicked')
        },
        link: '外部传入的link',
        text: '外部传入的text',
      }),
  }),
  Video,
  VideoUpload.configure({
    upload: (files: File) => {
      return new Promise(resolve => {
        setTimeout(() => {
          resolve(URL.createObjectURL(files))
        }, 3000)
      })
    },
  }),
  Blockquote,
  SlashCommand,
  HorizontalRule,
  CodeBlock,
  Table.configure({ spacer: true }),
  Code,
  AI.configure({
    completions: AICompletions,
    hideShortcutDefault: false, // 隐藏默认的快捷选项
    onShortcutChange: false, // 在编辑器内容变化时更新快捷选项
    shortcuts: [
      // 这里可以传入额外的自定义shortcuts
      {
        label: '优化内容',
        children: [
          {
            label: '选择',
            type: 'component',
            component: markRaw(Select),
            componentProps: {
              icon: 'magic-wand',
              tooltip: '优化所选内容',
              onClose: () => {
                closeAIMenuShortcut()
              },
              action: (res: any) => {
                AIParams.value = res
              },
            },
          },
        ],
      },
    ],
  }),
  SpecialCharacter,
  Emoji,
  Fullscreen.configure({ spacer: true }),
  SourceCode,
  Preview,
  FindAndReplace.configure({ spacer: true }),
  Printer,
  Iframe,
  MyToolbarButton,
]

function toggleMinimal() {
  minimal.value = !minimal.value
}

function handleFullscreenChange(isFullscreen: boolean) {
  if (isFullscreen) {
    console.log('isScreen')
  }
}

/**
 * AI Completions handler function
 * WARNING: This is just a demo implementation. In production:
 * - DO NOT expose API keys in the frontend
 * - DO implement this through your backend API
 * - DO add proper error handling and rate limiting
 *
 * @param history - Chat history array containing messages with role and content
 * @param signal - AbortSignal for cancelling requests
 * @returns OpenAI chat completion stream
 */
async function AICompletions(history: Array<{ role: string; content: string }> = [], signal?: AbortSignal) {
  // For demo purposes, we simulate the OpenAI stream response
  return mockOpenAIStream(history, signal)
}

/**
 * 模拟 OpenAI stream 返回的数据
 * @param history - 聊天历史
 * @param signal - 可选，终止信号
 * @returns 一个模拟的 async iterable（可用 for await...of 读取）
 */
function mockOpenAIStream(history = [], signal?: AbortSignal) {
  // 要模拟输出的内容
  const content = [
    "You are a professional writing assistant. Please respond based on the user's context:",
    '',
    '1. Maintain a professional, accurate, and objective tone',
    '2. Ensure responses are clear, coherent, and well-structured',
    '3. Responses must be in HTML format, preserving all HTML tags, links, and styles',
    '4. Support the following writing enhancements:',
    '   - Grammar and spelling corrections',
    '   - Improved sentence structure and expression',
    '   - Optimized article formatting and layout',
    '   - Maintain the core meaning of the original text',
    '5. If context includes code, maintain code formatting and provide optimization suggestions',
    '6. Add appropriate HTML elements like headings, lists, quotes etc. to enhance readability as needed',
    '',
    'Please respond only based on the provided context, do not add irrelevant information.',
  ]

  // 返回一个 async iterable
  return {
    async *[Symbol.asyncIterator]() {
      for (const line of content) {
        if (signal?.aborted) break
        await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟延迟
        yield {
          choices: [
            {
              delta: { content: line + '\n' },
            },
          ],
        }
      }
    },
  }
}
</script>
