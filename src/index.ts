import type { Plugin } from 'vue'
import AiEditor from '@/components/AiEditor.vue'
import ActionButton from '@/components/ActionButton.vue'
import { Extension } from '@tiptap/core'
import locale, { zhHans, en } from './locales'
import './styles/index.css'
import {useTiptapStore} from './hooks/index'

const AiEditorPlugin: Plugin = {
  install(app) {
    app.component('ai-editor', AiEditor)
  },
}
export { en, locale, zhHans }
export * from '@/extensions'
export { useEditor } from '@tiptap/vue-3'
export type * from '@/type'
export { type Editor as EditorInstance, type JSONContent } from '@tiptap/core'
export type { AiEditorProps, AiEditorEmits } from './type'
export type { Theme } from './constants'
export { useTheme } from './hooks/useTheme'
export { default as ThemeToggle } from './components/ThemeToggle.vue'
export { default as ThemePicker } from './components/ThemePicker.vue'
export { hasExtension } from './utils/utils'
export { AiEditorPlugin, AiEditor, ActionButton, Extension, useTiptapStore }

export default AiEditorPlugin
