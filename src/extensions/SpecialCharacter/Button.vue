<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Icon } from '@/components/icons'
import SpecialCharacter from '@/components/SpecialCharacter.vue'
import type { Editor } from '@tiptap/core'

const props = defineProps<{ editor: Editor; disabled?: boolean }>()

const open = ref(false)
watch(
  () => props.editor.storage.specialCharacterOpen,
  v => {
    open.value = v
  },
  { immediate: true }
)
watch(open, v => {
  props.editor.storage.specialCharacterOpen = v
})

function handleOpenChange(v: boolean) {
  open.value = v
}
</script>

<template>
  <Popover
    :open="open"
    @update:open="handleOpenChange"
  >
    <PopoverTrigger>
      <Button
        size="icon"
        class="bg-white text-black hover:bg-gray-100 *:dark:bg-gray-800 dark:text-white dark:hover:bg-gray-700 shadow-none"
        :disabled="props.disabled"
      >
        <Icon name="Omega" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[360px]">
      <SpecialCharacter :editor="props.editor" />
    </PopoverContent>
  </Popover>
</template>