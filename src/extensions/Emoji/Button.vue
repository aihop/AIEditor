<script setup lang="ts">
import { ref, watch, defineProps } from 'vue'
import { Button } from '@/components/ui/button'
import { Popover, PopoverTrigger, PopoverContent } from '@/components/ui/popover'
import { Icon } from '@/components/icons'
import Emoji from '@/components/Emoji.vue'
import type { Editor } from '@tiptap/core'

const props = defineProps<{ editor: Editor; disabled?: boolean }>()

const open = ref(false)
watch(
  () => props.editor.storage.emojiOpen,
  v => {
    open.value = v
  },
  { immediate: true }
)
watch(open, v => {
  props.editor.storage.emojiOpen = v
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
        <Icon name="Smile" />
      </Button>
    </PopoverTrigger>
    <PopoverContent class="p-0 w-[360px]">
      <Emoji :editor="props.editor" />
    </PopoverContent>
  </Popover>
</template>