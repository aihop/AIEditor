<script setup lang="ts">
import { computed, ref } from 'vue'
import type { Editor } from '@tiptap/vue-3'
import { BubbleMenu } from '@tiptap/vue-3'
import { useLocale } from '@/locales'
import { useHotkeys, useTiptapStore } from '@/hooks'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'
import { useFocus } from '@vueuse/core'
import { useToast } from '@/components/ui/toast/use-toast'
import { Icon } from '@/components/icons'
import type { Props as TippyProps } from 'tippy.js'
import { reactive } from 'vue'

// 组件属性
interface Props {
  editor: Editor
  disabled?: boolean
}

const props = withDefaults(defineProps<Props>(), {
  disabled: false,
})

// 状态管理
const store = useTiptapStore()
const content = ref<string>('') // 评论内容
const inputRef = ref<HTMLInputElement | null>(null)
const { focused } = useFocus(inputRef)
const { t } = useLocale()
const isShaking = ref<boolean>(false) // 抖动效果
const tippyInstance = ref<any>(null)

const { toast } = useToast()

/**
 * 获取选中的文本内容
 */
function getSelectionText(editor: Editor): string {
  const { from, to } = editor.state.selection
  return editor.state.doc.textBetween(from, to, ' ')
}

/**
 * 处理提交评论
 */
async function handleSubmit() {
  if (!props.editor) {
    toast({
      title: t.value('editor.comment.error'),
      description: t.value('editor.comment.editorNotFound'),
      variant: 'destructive',
    })
    return
  }

  // 检查评论内容
  if (!content.value.trim()) {
    toast({
      title: t.value('editor.comment.error'),
      description: t.value('editor.comment.contentRequired'),
      variant: 'destructive',
    })
    return
  }

  try {
    // 获取选中的文本
    const selectedText = getSelectionText(props.editor)

    if (!selectedText.trim()) {
      toast({
        title: t.value('editor.comment.error'),
        description: t.value('editor.comment.noSelection'),
        variant: 'destructive',
      })
      return
    }

    // 生成临时评论ID（用于传递给外部回调）
    const tempCommentId = `comment-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`

    // 获取 onCommentCreate 回调
    const onCommentCreate = props.editor.extensionManager.extensions
      .find(e => e.name === 'comment')?.options?.onCommentCreate

    // 调用回调，获取真实的评论ID
    let realCommentId: string | null = tempCommentId // 默认使用临时ID
    
    if (typeof onCommentCreate === 'function') {
      const result = await onCommentCreate({
        commentId: tempCommentId,
        selectedText,
        annotationContent: content.value,
      })
      
      // 如果回调返回了真实ID，则使用真实ID；如果返回null，表示创建失败
      if (result === null) {
        toast({
          title: t.value('editor.comment.error'),
          description: t.value('editor.comment.createFailed'),
          variant: 'destructive',
        })
        return
      } else if (typeof result === 'string') {
        realCommentId = result
      }
    }

    // 使用真实ID为选中的文本添加评论标记
    props.editor.chain().focus().setComment(realCommentId).run()

    // 关闭菜单并清空输入
    handleClose()

    toast({
      title: t.value('editor.comment.success'),
      description: t.value('editor.comment.addSuccess'),
    })
  } catch (error) {
    toast({
      title: t.value('editor.comment.error'),
      description: error instanceof Error ? error.message : t.value('editor.comment.unknownError'),
      variant: 'destructive',
    })
  }
}

/**
 * ESC 键关闭菜单
 */
const { bind, unbind } = useHotkeys('esc', () => {
  handleClose()
})

/**
 * Tippy 配置
 */
const tippyOptions = reactive<Partial<TippyProps>>({
  maxWidth: 450,
  zIndex: 99,
  appendTo: 'parent',
  placement: 'bottom-start',
  onShow(instance) {
    tippyInstance.value = instance
    bind()
    setTimeout(() => {
      focused.value = true
    }, 30)
  },
  onHide() {
    unbind()
    handleClose()
  },
  onDestroy() {
    tippyInstance.value = null
    unbind()
  },
})

/**
 * 计算是否显示菜单
 */
const shouldShow: any = computed(() => {
  return store?.state.CommentMenu
})

/**
 * 关闭菜单
 */
function handleClose() {
  content.value = ''
  store!.state.CommentMenu = false
}

/**
 * 处理覆盖层点击 - 如果输入为空则关闭，否则抖动提示
 */
function handleOverlayClick(): void {
  if (content.value === '') {
    handleClose()
    return
  }
  isShaking.value = true
  setTimeout(() => {
    isShaking.value = false
  }, 820)
}

/**
 * 处理表单提交
 */
function onFormSubmit(e: Event) {
  e.preventDefault()
  handleSubmit()
}
</script>

<template>
  <div
    class="absolute left-0 right-0 top-0 bottom-0"
    :style="{
      zIndex: 98,
    }"
    v-show="shouldShow"
    @click="handleOverlayClick"
  >
    <BubbleMenu
      pluginKey="CommentMenu"
      :update-delay="0"
      v-show="shouldShow"
      :editor="editor"
      :tippy-options="tippyOptions"
    >
      <div class="relative w-[450px] z-[99]" :class="{ 'shake-animation': isShaking }">
        <form @submit="onFormSubmit" class="relative w-full items-center flex bg-background rounded-md shadow-sm">
          <!-- 输入框 -->
          <Input
            v-model="content"
            ref="inputRef"
            :placeholder="t('editor.comment.placeholder')"
            class="pl-10 pr-20 h-12 outline-none ring-0 focus-visible:ring-0"
          />

          <!-- 左侧图标 -->
          <span class="absolute start-0 inset-y-0 flex items-center justify-center px-2">
            <Icon name="MessageSquare" class="w-5 h-5" />
          </span>

          <!-- 右侧按钮 -->
          <div class="absolute end-0 inset-y-0 flex items-center justify-center gap-2 px-2">
            <!-- 取消按钮 -->
            <Button
              type="button"
              variant="ghost"
              size="sm"
              class="h-[32px]"
              @click="handleClose"
            >
              {{ t('editor.comment.cancel') }}
            </Button>

            <!-- 提交按钮 -->
            <Button
              type="submit"
              :disabled="!content.trim()"
              size="sm"
              class="h-[32px]"
            >
              {{ t('editor.comment.submit') }}
            </Button>
          </div>
        </form>
      </div>
    </BubbleMenu>
  </div>
</template>

<style scoped>
/* 抖动动画 */
.shake-animation {
  animation: shake 0.82s cubic-bezier(0.36, 0.07, 0.19, 0.97) both;
  transform: translate3d(0, 0, 0);
  backface-visibility: hidden;
  perspective: 1000px;
}

@keyframes shake {
  10%,
  90% {
    transform: translate3d(-1px, 0, 0);
  }

  20%,
  80% {
    transform: translate3d(2px, 0, 0);
  }

  30%,
  50%,
  70% {
    transform: translate3d(-4px, 0, 0);
  }

  40%,
  60% {
    transform: translate3d(4px, 0, 0);
  }
}
</style>

