import { Extension } from '@tiptap/core'
import ActionButton from '@/components/ActionButton.vue'
import type { GeneralOptions } from '@/type'
import { useTiptapStore } from '@/hooks'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    markdownMode: {
      toggleMarkdownMode: () => ReturnType
    }
  }
}

export interface MarkdownModeOptions extends GeneralOptions<MarkdownModeOptions> { }

export const MarkdownMode = Extension.create<MarkdownModeOptions>({
  name: 'markdownMode',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => {
        const store = useTiptapStore(editor)
        return {
          component: ActionButton,
          componentProps: {
            icon: 'CodeXml',
            action: () => {
              store.toggleMarkdownMode()
            },
            tooltip: t('editor.markdownMode.tooltip'),
            isActive: () => store.state.markdownMode,
          },
        }
      },
    }
  },
  addCommands() {
    return {
      toggleMarkdownMode:
        () =>
          ({ editor }) => {
            useTiptapStore(editor).toggleMarkdownMode()
            return true
          },
    }
  },
})
