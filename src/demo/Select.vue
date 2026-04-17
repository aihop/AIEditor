<template>
  <form class="max-w-md mx-auto space-y-6 bg-white p-6 rounded shadow w-[450px] h-[420px] overflow-y-auto">
    <!-- 目标市场 -->
    <!-- 可选：展示/编辑 link 和 text -->
    <div v-if="form.link !== undefined">
      <label class="block text-sm font-medium text-gray-700 mb-1">链接</label>
      <input
        v-model="form.link"
        class="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
      />
    </div>
    <div v-if="form.text !== undefined">
      <label class="block text-sm font-medium text-gray-700 mb-1">文本</label>
      <input
        v-model="form.text"
        class="w-full bg-gray-100 rounded px-3 py-2 focus:outline-none"
      />
    </div>
  </form>
</template>

<script setup lang="ts">
import { defineProps, ref, watch, defineEmits } from 'vue'

const props = defineProps<{
  editor?: any
  icon?: string
  tooltip?: string
  action?: Function
  onClose?: Function
  link?: string
  text?: string
}>()
const emits = defineEmits(['update:link', 'update:text', 'action', 'onClose'])

const form = ref({
  link: props.link ?? '',
  text: props.text ?? '',
})

// 外部 props 变化时同步到内部
watch(
  () => [props.link, props.text],
  ([newLink, newText]) => {
    if (newLink !== undefined) form.value.link = newLink
    if (newText !== undefined) form.value.text = newText
  }
)

// 内部变化时 emit 给父组件
watch(
  () => form.value.link,
  val => {
    emits('update:link', val)
  }
)
watch(
  () => form.value.text,
  val => emits('update:text', val)
)
</script>