<script setup lang="ts">
import { reactive, watchEffect, ref, onMounted, watch, withDefaults, defineProps, defineEmits, computed } from 'vue'
import { Icon } from '@/components/icons'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { onClickOutside } from '@vueuse/core'
import type { Editor } from '@tiptap/vue-3'
import { useLocale } from '@/locales'
import { useFocus } from '@vueuse/core'

interface Props {
  editor: Editor
  text?: string
  link?: string
  hideTarget?: boolean
  componentSlot?: any
}
const props = withDefaults(defineProps<Props>(), {})
const emits = defineEmits(['onSetLink', 'onClickOutside'])

const { t } = useLocale()

let form = reactive({
  text: '',
  link: '',
})
const inputRef = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(inputRef)
const openInNewTab = ref<boolean>(false)
const isStrictUrl = ref<boolean>(true)
const target = ref(null)
onClickOutside(target, event => emits('onClickOutside', event))

watchEffect(() => {
  const { href, target, strictUrl } = props.editor.getAttributes('link')
  const linkValue = props.link ? props.link : href
  const { from, to } = props.editor.state.selection
  const text = props.text ? props.text : props.editor.state.doc.textBetween(from, to, ' ')
  form.link = linkValue
  form.text = text
  openInNewTab.value = target === '_blank' ? true : false
  isStrictUrl.value = strictUrl
})
function handleSubmit() {
  emits('onSetLink', form.link, form.text, openInNewTab.value)
}
onMounted(() => {
  focused.value = true
})

const updateLink = $event => {
  form.link = $event
}
</script>

<template>
  <div
    ref="target"
    class="p-2 rounded-lg bg-card shadow-sm border"
  >
    <form
      @submit.prevent="handleSubmit"
      class="flex flex-col gap-2"
    >
      <Label> {{ t('editor.link.dialog.text') }} </Label>
      <div class="flex w-full max-w-sm items-center gap-1.5">
        <div class="relative w-full max-w-sm items-center">
          <Input
            type="text"
            v-model="form.text"
            required
            class="w-80"
            :placeholder="t('editor.link.dialog.input.text')"
          />
        </div>
      </div>

      <!-- 1. 如果 componentSlot 是对象（推荐这种结构） -->
      <component
        v-if="componentSlot && componentSlot.component"
        :is="componentSlot.component"
        v-bind="{
          ...componentSlot.componentProps,
          link: form.link,
          text: form.text,
          editor: componentSlot.componentProps?.editor ?? props.editor
        }"
        @update:link="updateLink"
        @update:text="form.text = $event"
      />
      <component
        v-else-if="componentSlot"
        :is="componentSlot"
        :link="form.link"
        :text="form.text"
        :editor="props.editor"
        @update:link="updateLink"
        @update:text="form.text = $event"
      />

      <Label>{{ t('editor.link.dialog.link') }}</Label>
      <div class="flex w-full max-w-sm items-center gap-1.5">
        <div class="relative w-full max-w-sm items-center">
          <Input
            :type="isStrictUrl ? 'url' : 'text'"
            ref="inputRef"
            v-model="form.link"
            required
            class="pl-10"
          />
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Icon
              class="size-5 text-muted-foreground"
              name="Link"
            />
          </span>
        </div>
      </div>
      <div
        class="flex items-center space-x-2 mt-1"
        v-if="!hideTarget"
      >
        <Checkbox
          v-model="openInNewTab"
          id="openInNewTab"
        />
        <Label for="openInNewTab">{{ t('editor.link.dialog.openInNewTab') }}</Label>
      </div>
      <Button
        type="submit"
        class="mt-2 self-end"
      >{{ t('editor.link.dialog.button.apply') }} </Button>
    </form>
  </div>
</template>
