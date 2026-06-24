<script setup lang="ts">
import { computed, watch, onUnmounted, unref, useAttrs, ref, defineEmits, withDefaults, defineProps } from 'vue'
import { Editor as CoreEditor } from '@tiptap/core'
import type { AnyExtension, JSONContent } from '@tiptap/core'

import { Editor, EditorContent } from '@tiptap/vue-3'
import type { EditorOptions } from '@tiptap/vue-3'
import { EDITOR_UPDATE_THROTTLE_WAIT_TIME } from '@/constants'
import { getCssUnitWithDefault, hasExtension, isEqual, throttle } from '@/utils/utils'
import { isLikelyMarkdown, markdownToHtml } from '@/utils'
import { useLocale } from '@/locales'
import { useTiptapStore } from '@/hooks'
import { useTheme } from '@/hooks/useTheme'
import BasicBubbleMenu from './menus/BasicBubbleMenu.vue'
import LinkBubbleMenu from './menus/LinkBubbleMenu.vue'
import TableBubbleMenu from './menus/TableBubbleMenu.vue'
import ContentMenu from './menus/ContentMenu.vue'
import ColumnsBubbleMenu from './menus/ColumnsBubbleMenu.vue'
import ImageBubbleMenu from './menus/ImageBubbleMenu.vue'
import AIMenu from './menus/AIMenu.vue'
import CommentMenu from './menus/CommentMenu.vue'
import Menubars from './Menubars.vue'
import Toolbar from './Toolbar.vue'
import Preview from './Preview.vue'
import Printer from './Printer.vue'
import MarkdownMode from './MarkdownMode.vue'
import SourceCode from './SourceCode.vue'

import FindAndReplace from './FindAndReplace.vue'
import type { AiEditorProps, AiEditorEmits } from '@/type'
import { useDark } from '@vueuse/core'
import Toaster from '@/components/ui/toast/Toaster.vue'
import { useEditorFocus } from '@/hooks/useEditorFocus'

type KeyDownHandler = NonNullable<EditorOptions['editorProps']['handleKeyDown']>
type PasteHandler = NonNullable<EditorOptions['editorProps']['handlePaste']>
type UpdateHandler = NonNullable<EditorOptions['onUpdate']>

const props = withDefaults(defineProps<AiEditorProps>(), {
  modelValue: '',
  output: 'html',
  dark: undefined,
  theme: undefined,
  radius: undefined,
  disabled: false,
  hideToolbar: false,
  hideMenubar: true,
  hideBubble: false,
  removeDefaultWrapper: false,
  maxWidth: undefined,
  minHeight: undefined,
  maxHeight: undefined,
  extensions: () => [],
  editorClass: undefined,
  contentClass: undefined,
  customFullscreen: false,
})

const emit = defineEmits<AiEditorEmits>()

const attrs = useAttrs()

const { t } = useLocale()
const isDark = useDark()
const contentRef = ref<HTMLElement | null>(null)

const { setTheme, setBorderRadius } = useTheme()

const sortExtensions = computed<AnyExtension[]>(() =>
  props.extensions.map((k, i) => k.configure({ sort: i }))
)

const editorConfig = computed<Partial<EditorOptions>>(() => ({
  content: props.modelValue,
  editorProps: {
    handleKeyDown: throttle<KeyDownHandler>((_, event) => {
      if (event.key === 'Enter' && attrs.enter && !event.shiftKey) {
        emit('enter')
        return true
      }
      return false
    }, EDITOR_UPDATE_THROTTLE_WAIT_TIME),
    handlePaste: ((view, event) => {
      if (!event.clipboardData || !editor.isEditable) {
        return false
      }

      const items = Array.from(event.clipboardData.items || [])
      if (items.some(item => item.kind === 'file') || items.some(item => item.type === 'text/html')) {
        return false
      }

      const text = event.clipboardData.getData('text/plain')
      if (!text || !isLikelyMarkdown(text)) {
        return false
      }

      event.preventDefault()
      editor.chain().focus().insertContent(markdownToHtml(text)).run()
      return true
    }) as PasteHandler,
    attributes: {
      class: 'FtContentView',
    },
  },
  onUpdate: throttle<UpdateHandler>(({ editor }) => {
    const output = getOutput(editor, props.output)
    emit('update:modelValue', output)
    emit('change', { editor, output })
  }, EDITOR_UPDATE_THROTTLE_WAIT_TIME),
  extensions: unref(sortExtensions),
  editable: !props.disabled,
}))

const editor = new Editor(unref(editorConfig))

// 每个编辑器实例独享一份状态，避免同页多实例互相串状态 / 层级冲突
const { state, isFullscreen, setDisabled } = useTiptapStore(editor)

const { isFocused } = useEditorFocus({ editor })

watch(
  () => props.dark,
  val => {
    if (val !== undefined) {
      isDark.value = val
    }
  },
  {
    immediate: true,
  }
)

watch(
  () => props.theme,
  val => {
    if (val !== undefined) {
      setTheme(val)
    }
  },
  {
    immediate: true,
  }
)
watch(
  () => props.radius,
  val => {
    if (val !== undefined) {
      setBorderRadius(val)
    }
  },
  {
    immediate: true,
  }
)

// 高度（min/max）落在焦点框那一层（.ai-editor-content-wrap），
// 这样焦点框就是被定高的盒子，内容区填充并内部滚动，二者高度永远一致，
// 不会出现“焦点框和内容区对不上 / 两个框”的问题。
const contentWrapDynamicStyles = computed(() =>
  !props.customFullscreen && unref(isFullscreen)
    ? { height: '100%' }
    : {
        minHeight: getCssUnitWithDefault(props.minHeight),
        maxHeight: getCssUnitWithDefault(props.maxHeight),
      }
)

const contentDynamicStyles = computed(() => ({
  flex: '1',
  minHeight: 0,
  overflowY: 'auto' as const,
  scrollBehavior: 'smooth' as const,
  scrollbarWidth: 'thin' as const,
  maxWidth: getCssUnitWithDefault(props.maxWidth),
  width: props.maxWidth ? '100%' : undefined,
  margin: props.maxWidth ? '8px auto' : undefined,
}))

function getOutput(editor: CoreEditor, output: AiEditorProps['output']): string | JSONContent {
  if (props.removeDefaultWrapper) {
    if (editor.isEmpty) {
      return output === 'json' ? {} : ''
    }
  }

  switch (output) {
    case 'html':
      return editor.getHTML()
    case 'json':
      return editor.getJSON()
    case 'text':
      return editor.getText()
    default:
      console.warn(`Invalid output type: ${output}`)
      return ''
  }
}

watch(
  () => props.modelValue,
  val => {
    if (!editor || isEqual(getOutput(editor, props.output), val)) return
    const { from, to } = editor.state.selection
    editor.commands.setContent(val, false)
    editor.commands.setTextSelection({ from, to })
  },
  { deep: true }
)

watch(
  () => props.disabled,
  val => {
    editor?.setEditable(!val)
    setDisabled(val)
  }
)

// Watch fullscreen state and emit to parent component
watch(isFullscreen, val => {
  emit('fullscreenChange', val)
})

onUnmounted(() => {
  editor?.destroy()
})

defineExpose({ editor })
</script>

<template>
  <div
    v-if="editor"
    class="ai-editor"
    :class="editorClass"
  >
    <Preview
      v-if="hasExtension(editor, 'preview')"
      :editor="editor"
    />
    <SpecialCharacter
      v-if="hasExtension(editor, 'specialCharacter')"
      :editor="editor"
    />
    <SourceCode
      v-if="hasExtension(editor, 'sourceCode')"
      :editor="editor"
    />
    <MarkdownMode
      v-if="hasExtension(editor, 'markdownMode')"
      :editor="editor"
    />
    <Printer
      v-if="hasExtension(editor, 'printer')"
      :editor="editor"
    />
    <div
      class="relative flex flex-col overflow-hidden"
      :class="{
        '!fixed bg-background inset-0 z-[10]  w-full h-full m-0 rounded-[0.5rem]': !customFullscreen && isFullscreen,
      }"
    >
      <Menubars
        v-if="!hideMenubar"
        :editor="editor"
        :disabled="disabled"
      />
      <Toolbar
        v-if="!hideToolbar"
        :editor="editor"
        :disabled="disabled"
        class="border-b py-1 px-1 overflow-hidden"
      />
      <div
        class="ai-editor-content-wrap overflow-hidden relative flex flex-col flex-1 min-h-0"
        :class="{
          'ai-editor-content-focus': isFocused,
        }"
        :style="contentWrapDynamicStyles"
      >
        <FindAndReplace
          v-if="hasExtension(editor, 'findAndReplace')"
          :container-ref="contentRef"
          :editor="editor"
        />
        <editor-content
          ref="contentRef"
          :editor="editor"
          :class="contentClass"
          :style="contentDynamicStyles"
          :spellcheck="state.spellCheck"
        />
        <template v-if="!hideBubble && !disabled && editor.isEditable">
          <ContentMenu
            :editor="editor"
            class="hidden sm:block"
          />
          <LinkBubbleMenu
            v-if="hasExtension(editor, 'link')"
            :editor="editor"
          />
          <ColumnsBubbleMenu
            v-if="hasExtension(editor, 'columns')"
            :editor="editor"
          />
          <TableBubbleMenu
            v-if="hasExtension(editor, 'table')"
            :editor="editor"
          />
          <AIMenu
            v-if="hasExtension(editor, 'AI')"
            :editor="editor"
          />
          <CommentMenu
            v-if="hasExtension(editor, 'comment')"
            :editor="editor"
          />
          <ImageBubbleMenu
            v-if="hasExtension(editor, 'image')"
            :editor="editor"
          />
          <BasicBubbleMenu :editor="editor" />
        </template>
      </div>
      <div
        v-if="hasExtension(editor, 'characterCount')"
        class="flex justify-between items-center"
      >
        <div class="flex justify-end  text-gray-500 text-xs mb-1 ml-3">
          {{ editor.storage.characterCount.characters() }}
          {{ t('editor.characters') }}
        </div>
        <slot
          name="footer"
          :editor="editor"
        />
      </div>
    </div>
    <Toaster />
  </div>
</template>
