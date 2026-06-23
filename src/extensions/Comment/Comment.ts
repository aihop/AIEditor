import { Mark, mergeAttributes } from '@tiptap/core'
import type { MarkType } from '@tiptap/pm/model'
import { Plugin, PluginKey } from '@tiptap/pm/state'
import CommentButton from './components/CommentButton.vue'
import type { GeneralOptions } from '@/type'

// 评论数据接口
export interface CommentData {
  commentId: string          // 前端生成的唯一ID
  selectedText: string       // 选中的文字内容
  annotationContent: string  // 批注内容
}

// 评论选项接口
export interface CommentOptions extends GeneralOptions<CommentOptions> {
  // HTML 属性
  HTMLAttributes: Record<string, any>
  // 评论激活回调 - 当用户点击评论时触发
  onCommentActivated?: (commentId: string | null) => void
  // 评论创建回调 - 当用户创建评论时触发，将数据暴露给外部
  // 返回值：返回真实的评论ID（从后端获取），如果返回null则表示创建失败
  onCommentCreate?: (data: CommentData) => Promise<string | null>
}

// 插件 Key
export const CommentPluginKey = new PluginKey('comment')

// 声明模块，添加 Commands 类型
declare module '@tiptap/core' {
  interface Commands<ReturnType> {
    comment: {
      /**
       * 设置评论
       */
      setComment: (commentId: string) => ReturnType
      /**
       * 取消评论
       */
      unsetComment: (commentId: string) => ReturnType
      /**
       * 切换评论
       */
      toggleComment: (commentId: string) => ReturnType
    }
  }
}

// Comment Mark 扩展
export const Comment = Mark.create<CommentOptions>({
  name: 'comment',

  // 添加配置选项
  addOptions() {
    return {
      ...this.parent?.(),
      HTMLAttributes: {
        class: 'ai-comment',
      },
      onCommentActivated: undefined,
      onCommentCreate: undefined,
      toolbar: true, // 显示在工具栏中
      // 按钮配置
      button: ({ editor, t }) => ({
        component: CommentButton,
        componentProps: {
          editor,
          isActive: () => editor.isActive('comment') || false,
          disabled: !editor?.isEditable || !editor.can().setComment(''),
          icon: 'Comment',
          tooltip: t('editor.comment.tooltip'),
        },
      }),
    }
  },

  // 添加存储
  addStorage() {
    return {
      activeCommentId: null as string | null,
    }
  },

  // 定义属性
  addAttributes() {
    return {
      commentId: {
        default: null,
        parseHTML: element => element.getAttribute('data-comment-id'),
        renderHTML: attributes => {
          if (!attributes.commentId) {
            return {}
          }
          return {
            'data-comment-id': attributes.commentId,
          }
        },
      },
    }
  },

  // 解析规则
  parseHTML() {
    return [
      {
        tag: 'span[data-comment-id]',
      },
    ]
  },

  // 渲染规则
  renderHTML({ HTMLAttributes }) {
    return [
      'span',
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes, {
        class: 'ai-comment',
      }),
      0,
    ]
  },

  // 添加命令
  addCommands() {
    return {
      // 设置评论
      setComment:
        (commentId: string) =>
        ({ commands }) => {
          return commands.setMark(this.name, { commentId })
        },
      // 取消评论
      unsetComment:
        (commentId: string) =>
        ({ tr, state, dispatch }) => {
          const { doc } = state
          // 在整个文档范围内查找批注，而不是只在当前选区
          const from = 0
          const to = doc.content.size
          let removed = false

          doc.nodesBetween(from, to, (node, pos) => {
            if (node.isText && node.marks) {
              node.marks.forEach(mark => {
                if (mark.type.name === this.name && mark.attrs.commentId === commentId) {
                  const markFrom = pos
                  const markTo = pos + node.nodeSize
                  tr.removeMark(markFrom, markTo, mark.type)
                  removed = true
                }
              })
            }
          })

          if (dispatch && removed) {
            dispatch(tr)
          }

          return removed
        },
      // 切换评论
      toggleComment:
        (commentId: string) =>
        ({ commands, editor }) => {
          if (editor.isActive('comment', { commentId })) {
            return commands.unsetComment(commentId)
          }
          return commands.setComment(commentId)
        },
    }
  },

  // 添加 ProseMirror 插件
  addProseMirrorPlugins() {
    const extensionThis = this

    return [
      new Plugin({
        key: CommentPluginKey,
        state: {
          init() {
            return {
              activeCommentId: null,
            }
          },
          apply(tr, value) {
            const meta = tr.getMeta(CommentPluginKey)
            if (meta) {
              return meta
            }
            return value
          },
        },
        props: {
          // 处理点击事件
          handleClick(view, pos) {
            const { doc } = view.state
            const $pos = doc.resolve(pos)
            const marks = $pos.marks()

            // 查找评论 mark
            const commentMark = marks.find(mark => mark.type.name === extensionThis.name)

            if (commentMark) {
              const commentId = commentMark.attrs.commentId
              // 设置激活的评论 ID
              extensionThis.storage.activeCommentId = commentId
              // 触发回调
              if (extensionThis.options.onCommentActivated) {
                extensionThis.options.onCommentActivated(commentId)
              }
            } else {
              // 点击非评论区域，清除激活状态
              if (extensionThis.storage.activeCommentId) {
                extensionThis.storage.activeCommentId = null
                if (extensionThis.options.onCommentActivated) {
                  extensionThis.options.onCommentActivated(null)
                }
              }
            }

            return false
          },
          // 添加装饰
          decorations(state) {
            return null
          },
        },
      }),
    ]
  },
})

