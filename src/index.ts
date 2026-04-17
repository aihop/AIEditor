import type { Plugin } from 'vue'
import FtEditor from '@/components/FtEditor.vue'
import ActionButton from '@/components/ActionButton.vue'
import { Extension } from '@tiptap/core'
import locale, { zhHans, en } from './locales'
import './styles/index.css'
import {useTiptapStore} from './hooks/index'

const FtEditorPlugin: Plugin = {
  install(app) {
    app.component('ft-editor', FtEditor)
  },
}
export { en, locale, zhHans }
export * from '@/extensions'
export { useEditor } from '@tiptap/vue-3'
export type * from '@/type'
export { type Editor as EditorInstance, type JSONContent } from '@tiptap/core'
export type { FtEditorProps, FtEditorEmits } from './type'
export type { Theme } from './constants'
export { useTheme } from './hooks/useTheme'
export { default as ThemeToggle } from './components/ThemeToggle.vue'
export { default as ThemePicker } from './components/ThemePicker.vue'
export { hasExtension } from './utils/utils'
export { FtEditorPlugin, FtEditor, ActionButton, Extension, useTiptapStore }

export default FtEditorPlugin
