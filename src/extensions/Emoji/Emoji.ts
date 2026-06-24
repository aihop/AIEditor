import { Extension } from '@tiptap/core'
import Button from './Button.vue'
import type { GeneralOptions } from '@/type'

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    emoji: {
      toggleEmoji: () => ReturnType
      insertEmoji: (char: string) => ReturnType
    }
  }
}
export interface EmojiOptions extends GeneralOptions<EmojiOptions> { }

export const Emoji = Extension.create<EmojiOptions>({
  name: 'emoji',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({editor, t }) => ({
        component: Button,
        componentProps: {
          icon: 'Smile',
          action: () => {
            editor.chain().toggleEmoji().focus().run()
          },
          tooltip: t('editor.emoji.tooltip'),
          isActive: () => !!editor.storage.emojiOpen
        },
      }),
    }
  },
  addCommands() {
    return {
      toggleEmoji:
        () =>
          ({ editor }) => {
            editor.storage.emojiOpen = !editor.storage.emojiOpen
            return true
          },
      insertEmoji:
        (char: string) =>
          ({ editor }) => {
            try {
              // 直接使用insertContent，这是最安全的方法
              editor.commands.insertContent(char)
              return true
            } catch (error) {
              console.error('Error in insertEmoji command:', error)
              return false
            }
          },
    }
  },
})
