<script lang="ts" setup>
import type { ButtonViewReturnComponentProps } from '@/type'
import type { TooltipContentProps } from 'reka-ui'
import { icons } from '@/components/icons'
import { useTiptapStore } from '@/hooks/useStore'
import type { Editor } from '@tiptap/vue-3'
import ActionButton from '@/components/ActionButton.vue'

// 组件属性接口
interface Props {
  editor: Editor
  icon?: keyof typeof icons
  title?: string
  tooltip?: string
  disabled?: boolean
  shortcutKeys?: string[]
  customClass?: string
  loading?: boolean
  tooltipOptions?: TooltipContentProps
  color?: string
  action?: ButtonViewReturnComponentProps['action']
  isActive?: ButtonViewReturnComponentProps['isActive']
}

// 定义默认属性
const props = withDefaults(defineProps<Props>(), {
  icon: undefined,
  title: undefined,
  tooltip: undefined,
  disabled: false,
  customClass: '',
  color: undefined,
  loading: false,
  shortcutKeys: undefined,
  tooltipOptions: undefined,
  action: undefined,
  isActive: undefined,
})

const store = useTiptapStore()

/**
 * 处理点击事件 - 打开评论输入框
 */
function handleOpen() {
  // 检查是否有选中的文本
  const { from, to } = props.editor.state.selection
  if (from === to) {
    // 没有选中文本，不打开评论框
    return
  }

  // 打开评论菜单
  store!.state.CommentMenu = true
  // 聚焦编辑器
  props.editor?.commands.focus()
}
</script>

<template>
  <ActionButton :action="handleOpen" :disabled="disabled" :icon="icon" :tooltip="tooltip" />
</template>

