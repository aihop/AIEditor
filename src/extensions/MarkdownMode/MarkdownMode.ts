import { Extension } from '@tiptap/core'
import ActionButton from '@/components/ActionButton.vue'
import type { GeneralOptions } from '@/type'
import { useTiptapStore } from '@/hooks'

const store = useTiptapStore()

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
      button: ({ t }) => ({
        component: ActionButton,
        componentProps: {
          icon: 'CodeXml',
          action: () => {
            store.toggleMarkdownMode()
          },
          tooltip: t('editor.markdownMode.tooltip'),
          isActive: () => store.state.markdownMode,
        },
      }),
    }
  },
  addCommands() {
    return {
      toggleMarkdownMode:
        () =>
          () => {
            store.toggleMarkdownMode()
            return true
          },
    }
  },
})
