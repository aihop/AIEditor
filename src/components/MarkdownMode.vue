<script setup lang="ts">
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { Icon } from '@/components/icons'
import { useTiptapStore } from '@/hooks'
import { useLocale } from '@/locales'
import { computed, nextTick, onBeforeUnmount, ref, watch, withDefaults, defineProps } from 'vue'
import type { Editor } from '@tiptap/core'
import { createEditor, type PrismEditor } from 'prism-code-editor'
import { defaultCommands, editHistory } from 'prism-code-editor/commands'
import { cursorPosition } from 'prism-code-editor/cursor'
import { indentGuides } from 'prism-code-editor/guides'
import { highlightBracketPairs } from 'prism-code-editor/highlight-brackets'
import { matchBrackets } from 'prism-code-editor/match-brackets'
import { searchWidget } from 'prism-code-editor/search'
import 'prism-code-editor/search.css'
import 'prism-code-editor/guides.css'
import 'prism-code-editor/code-folding.css'
import 'prism-code-editor/layout.css'
import '@/extensions/CodeBlock/components/theme.css'
import 'prism-code-editor/prism/languages/markdown'
import { useTheme } from '@/hooks/useTheme'
import TurndownService from 'turndown'
import { marked } from 'marked'

interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

const { isDark } = useTheme()
const containerRef = ref<HTMLElement | null>(null)
const { t } = useLocale()
const store = useTiptapStore()
const markdownCode = ref('')
const codeEditor = ref<PrismEditor | null>(null)
const turndownService = new TurndownService({
  codeBlockStyle: 'fenced',
  headingStyle: 'atx',
})

const currentHtmlContent = computed(() => props.editor.getHTML())

function handleClose() {
  store.state.markdownMode = false
}

async function saveEdit() {
  try {
    const html = await marked.parse(markdownCode.value, { async: false })
    props.editor.commands.setContent(html, true)
    store.state.markdownMode = false
  } catch (error) {
    console.error('保存 Markdown 代码时出错:', error)
  }
}

function copyCode() {
  if (!markdownCode.value) return

  navigator.clipboard
    .writeText(markdownCode.value)
    .catch(err => {
      console.error('复制失败:', err)
    })
}

function destroyEditor() {
  codeEditor.value?.remove()
  codeEditor.value = null
}

function init() {
  destroyEditor()
  markdownCode.value = turndownService.turndown(currentHtmlContent.value)
  codeEditor.value = createEditor(containerRef.value, {
    language: 'markdown',
    tabSize: 2,
    lineNumbers: true,
    wordWrap: true,
    value: markdownCode.value,
    onUpdate(value) {
      markdownCode.value = value
    },
  })
  codeEditor.value.addExtensions(
    matchBrackets(),
    indentGuides(),
    highlightBracketPairs(),
    cursorPosition(),
    defaultCommands(),
    editHistory(),
    searchWidget(),
  )
}

watch(
  () => store.state.markdownMode,
  isOpen => {
    if (!isOpen) {
      destroyEditor()
      return
    }

    nextTick(() => {
      init()
      codeEditor.value?.textarea.focus()
    })
  }
)

onBeforeUnmount(() => {
  destroyEditor()
})
</script>

<template>
  <Dialog
    :open="store.state.markdownMode"
    @update:open="open => (store.state.markdownMode = open)"
  >
    <DialogContent
      @close-auto-focus="e => e.preventDefault()"
      class="sm:max-w-[600px] md:max-w-[800px] lg:max-w-[1000px] grid-rows-[auto_minmax(0,1fr)_auto] p-0 max-h-[90dvh] h-full"
    >
      <DialogHeader class="p-6 pb-0">
        <DialogTitle>{{ t('editor.markdownMode.title') }}</DialogTitle>
      </DialogHeader>

      <div
        ref="containerRef"
        class="flex border mx-1"
        :class="`${isDark ? 'atom-one-dark' : 'vs-code-light'}`"
      />
      <DialogFooter class="p-6 flex-shrink-0 pt-0 sm:justify-between">
        <div class="flex items-center gap-3">
          <Button
            variant="outline"
            size="sm"
            @click="copyCode"
          >
            <Icon
              name="Copy"
              class="w-4 h-4 mr-1"
            />
            {{ t('editor.copy') }}
          </Button>
        </div>
        <div class="flex items-center gap-3">
          <Button
            size="sm"
            @click="handleClose"
            variant="outline"
          >
            {{ t('editor.close') }}
          </Button>
          <Button
            size="sm"
            @click="saveEdit"
          >
            <Icon
              name="Check"
              class="w-4 h-4 mr-1"
            />
            {{ t('editor.save') }}
          </Button>
        </div>
      </DialogFooter>
    </DialogContent>
  </Dialog>
</template>
