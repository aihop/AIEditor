import { computed, reactive } from 'vue'

import type { AnyExtension } from '@tiptap/core'

import { DEFAULT_LANG_VALUE } from '@/constants'

/**
 * Interface representing an tiptap editor instance.
 */
interface Instance {
  /**
   * List of extensions
   *
   * @default []
   */
  extensions: AnyExtension[]

  /**
   * Default language setting
   *
   * @default DEFAULT_LANG_VALUE
   */
  defaultLang?: string

  /**
   * Whether it is in fullscreen mode
   *
   * @default false
   */
  isFullscreen: boolean

  /** Text color */
  color?: string

  /** Highlight color */
  highlight?: string

  /** AI Menu visibility */
  AIMenu: boolean

  /** AI Menu Shortcut visibility */
  AIMenuShortcut: boolean

  /** Comment Menu visibility */
  CommentMenu: boolean

  /** Preview visibility */
  showPreview: boolean

  /** SpellCheck */
  spellCheck: boolean

  /** SourceCode */
  sourceCode: boolean

  /** Markdown mode */
  markdownMode: boolean

  /** FindAndReplace */
  findAndReplace: boolean
  /** Printer */
  printer: boolean
  /** Disabled */
  disabled: boolean
}

/**
 * 创建一个独立的编辑器状态实例。
 *
 * 注意：之前使用 `createGlobalState` 让整个状态成为全页单例，
 * 导致同一页面挂载多个编辑器时彼此串状态（全屏 / markdown / 源码 / 预览
 * 等开关互相影响，全屏遮罩 z-index 叠加产生层级问题）。
 * 现在改为每个编辑器实例各自持有一份状态。
 */
function createTiptapStore() {
  const state: Instance = reactive({
    extensions: [],
    defaultLang: DEFAULT_LANG_VALUE,
    isFullscreen: false,
    color: undefined,
    highlight: undefined,
    AIMenu: false,
    AIMenuShortcut: true,
    CommentMenu: false,
    sourceCode: false,
    markdownMode: false,
    showPreview: false,
    spellCheck: false,
    findAndReplace: false,
    printer: false,
    disabled: false,
  })

  const isFullscreen = computed(() => state.isFullscreen)

  function toggleFullscreen() {
    state.isFullscreen = !state.isFullscreen
  }

  function togglePreview() {
    state.showPreview = !state.showPreview
  }
  function toggleSourceCode() {
    state.sourceCode = !state.sourceCode
  }
  function toggleMarkdownMode() {
    state.markdownMode = !state.markdownMode
  }
  function toggleSpellCheck() {
    state.spellCheck = !state.spellCheck
  }
  function toggleFindAndReplace() {
    state.findAndReplace = !state.findAndReplace
  }
  function togglePrinter() {
    state.printer = !state.printer
  }
  function setDisabled(disabled: boolean) {
    state.disabled = disabled
  }

  return {
    state,
    isFullscreen,
    toggleFullscreen,
    togglePreview,
    toggleSpellCheck,
    toggleFindAndReplace,
    togglePrinter,
    toggleSourceCode,
    toggleMarkdownMode,
    setDisabled,
  }
}

export type TiptapStore = ReturnType<typeof createTiptapStore>

/**
 * 每个编辑器实例对应一份状态，按 editor 实例做键缓存。
 * 使用 WeakMap，编辑器销毁后状态自动回收。
 */
const storeMap = new WeakMap<object, TiptapStore>()

/** 无 editor 时的回退实例（兼容在组件 setup 之外、拿不到 editor 的调用） */
let fallbackStore: TiptapStore | null = null

/**
 * 获取（或创建）某个编辑器实例对应的状态 store。
 *
 * @param editor 该状态所属的编辑器实例。库内组件请传 `props.editor`，
 *               扩展请在 button / command 回调里传入参数 `editor`。
 *               不传则回退到一个共享实例（仅为兼容旧用法，多实例下不建议）。
 */
export function useTiptapStore(editor?: object | null): TiptapStore {
  if (editor) {
    let store = storeMap.get(editor)
    if (!store) {
      store = createTiptapStore()
      storeMap.set(editor, store)
    }
    return store
  }

  if (!fallbackStore) fallbackStore = createTiptapStore()
  return fallbackStore
}
