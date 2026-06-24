import { Extension } from '@tiptap/core'
import ActionButton from '@/components/ActionButton.vue'
import type { GeneralOptions } from '@/type'
import { useTiptapStore } from '@/hooks'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    preview: {
      togglePreview: () => ReturnType
    }
  }
}
export interface PreviewOptions extends GeneralOptions<PreviewOptions> {}

export const Preview = Extension.create<PreviewOptions>({
  name: 'preview',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor, t }) => {
        const store = useTiptapStore(editor)
        return {
          component: ActionButton,
          componentProps: {
            icon: 'Eye',
            action: () => {
              store.togglePreview()
            },
            tooltip: t('editor.preview.tooltip'),
            isActive: () => store.state.showPreview,
          },
        }
      },
    }
  },
  addCommands() {
    return {
      togglePreview:
        () =>
        ({ editor }) => {
          useTiptapStore(editor).togglePreview()
          return true
        },
    }
  },
})
