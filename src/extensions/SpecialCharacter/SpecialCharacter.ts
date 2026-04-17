import { Extension } from '@tiptap/core'
import type { GeneralOptions } from '@/type'
import { useTiptapStore } from '@/hooks'
import Button from './Button.vue'
const store = useTiptapStore()

declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    specialCharacter: {
      toggleSpecialCharacter: () => ReturnType
      insertSpecialCharacter: (char: string) => ReturnType
    }
  }
}
export interface SpecialCharacterOptions extends GeneralOptions<SpecialCharacterOptions> { }

export const SpecialCharacter = Extension.create<SpecialCharacterOptions>({
  name: 'specialCharacter',
  addOptions() {
    return {
      ...this.parent?.(),
      button: ({ editor,t }) => ({
        component: Button,
        componentProps: {
          icon: 'Omega',
          action: () => {
            editor.chain().toggleSpecialCharacter().focus().run()
          },
          tooltip: t('editor.specialCharacter.tooltip'),
          isActive: () => !!editor.storage.specialCharacterOpen
        },
      }),
    }
  },
  addCommands() {
    return {
      toggleSpecialCharacter:
        () =>
          ({ editor }) => {
            editor.storage.specialCharacterOpen = !editor.storage.specialCharacterOpen
            return true
          },
      insertSpecialCharacter:
        (char: string) =>
          ({ editor }) => {
            try {
              // 直接使用insertContent，这是最安全的方法
              editor.commands.insertContent(char)
              return true
            } catch (error) {
              console.error('Error in insertSpecialCharacter command:', error)
              return false
            }
          },
    }
  },
})
