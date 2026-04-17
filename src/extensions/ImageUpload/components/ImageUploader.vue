<script setup lang="ts">
import { ref, computed, defineProps } from 'vue'
import { nodeViewProps, NodeViewWrapper } from '@tiptap/vue-3'

import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Icon } from '@/components/icons'
import { useLocale } from '@/locales'
import { createImageUpload } from '@/plugins/image-upload'

const props = defineProps({
  ...nodeViewProps,
})

const link = ref<string>('')
const fileInput = ref()
const { t } = useLocale()
const isPopoverOpen = ref(true)

function handleFile(event) {
  const files = event?.target?.files
  if (!props.editor || props.editor.isDestroyed || files.length === 0) return
  const file = files[0]
  const uploadOptions = props.editor.extensionManager.extensions.find(
    extension => extension.name === 'imageUpload'
  )?.options

  const uploadFn = createImageUpload({
    validateFn: file => {
      return true
    },
    onUpload: uploadOptions.upload,
  })
  const result: Promise<any> | void = uploadFn([file], props.editor.view, props.getPos())
  if (result !== undefined && typeof (result as Promise<any>).then === 'function') {
    ;(result as Promise<any>).then(() => {
      isPopoverOpen.value = false
    })
  } else {
    isPopoverOpen.value = false
  }
}
function handleLink() {
  props.editor
    .chain()
    .setImage({ src: link.value })
    .deleteRange({ from: props.getPos(), to: props.getPos() })
    .focus()
    .run()
  isPopoverOpen.value = false
}
function handleDelete() {
  props.deleteNode()
}
function handleClick() {
  fileInput.value?.click()
}

// 这里的渲染数组是计算出来的
const componentSlot = computed(() => {
  const cb = props.extension && props.extension.options && props.extension.options.componentSlot
  if (typeof cb === 'function') {
    return cb({
      editor: props.editor,
      extension: props.extension,
      t: t,
    })
  }
  return cb ? cb : null
})
</script>

<template>
  <NodeViewWrapper
    class="p-0 m-0"
    data-drag-handle
  >
    <Popover
      :open="isPopoverOpen"
      :closeOnClickOutside="false"
    >
      <PopoverTrigger as-child>
        <div class="flex items-center w-full p-3 my-3 hover:bg-accent border border-border text-muted-foreground cursor-pointer rounded-sm transition-all">
          <div class="flex justify-between items-center w-full">
            <div class="flex justify-center items-center gap-3">
              <Icon
                name="ImageUp"
                class="w-6 h-6"
              />
              <span class="text-sm">{{ t('editor.image.dialog.title') }}</span>
            </div>
            <Icon
              name="Trash2"
              class="hover:text-foreground"
              @click.stop="handleDelete"
            />
          </div>
        </div>
      </PopoverTrigger>
      <PopoverContent
        trapFocus
        class="w-full"
        tabindex="0"
        :onOpenAutoFocus="e => e.preventDefault()"
      >
        <component
          v-if="componentSlot && componentSlot.component"
          :is="componentSlot.component"
          v-bind="{
                ...componentSlot.componentProps,
                editor: componentSlot.componentProps?.editor ?? props.editor
              }"
        />
        <component
          v-else-if="componentSlot"
          :is="componentSlot"
          :editor="props.editor"
        />
        <Tabs
          default-value="upload"
          class="w-[400px]"
          activationMode="manual"
        >
          <TabsList class="grid w-full grid-cols-2">
            <TabsTrigger value="upload">{{ t('editor.image.dialog.tab.upload') }} </TabsTrigger>
            <TabsTrigger value="link"> {{ t('editor.image.dialog.tab.url') }} </TabsTrigger>
          </TabsList>
          <TabsContent value="upload">
            <Button
              class="w-full mt-1"
              size="sm"
              @click="handleClick"
            >{{
              t('editor.image.dialog.tab.upload')
            }}</Button>
            <input
              type="file"
              accept="image/*"
              ref="fileInput"
              style="display: none"
              @change="handleFile"
            />
          </TabsContent>
          <TabsContent value="link">
            <form @submit.prevent="handleLink">
              <div class="flex items-center gap-2">
                <Input
                  type="url"
                  autofocus
                  required
                  v-model="link"
                  :placeholder="t('editor.image.dialog.placeholder')"
                />
                <Button type="submit">{{ t('editor.image.dialog.button.apply') }}</Button>
              </div>
            </form>
          </TabsContent>
        </Tabs>
      </PopoverContent>
    </Popover>
  </NodeViewWrapper>
</template>
