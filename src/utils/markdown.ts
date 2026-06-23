import { marked } from 'marked'

const BLOCK_MARKDOWN_PATTERNS = [
  /^(#{1,6})\s+\S/m,
  /^>\s+\S/m,
  /^(\s*[-*+])\s+\S/m,
  /^(\s*\d+\.)\s+\S/m,
  /^```[\w-]*\s*$/m,
  /^~~~[\w-]*\s*$/m,
  /^\|.+\|\s*$/m,
  /^-{3,}$|^\*{3,}$|^_{3,}$/m,
  /^\s*[-*+]\s+\[( |x|X)\]\s+\S/m,
]

const INLINE_MARKDOWN_PATTERNS = [
  /\*\*[^*\n]+\*\*/,
  /__[^_\n]+__/,
  /(^|[^*])\*[^*\n]+\*([^*]|$)/,
  /(^|[^_])_[^_\n]+_([^_]|$)/,
  /`[^`\n]+`/,
  /\[[^\]]+\]\([^)]+\)/,
]

export function isLikelyMarkdown(text: string): boolean {
  const normalized = text.trim()
  if (!normalized) return false

  if (BLOCK_MARKDOWN_PATTERNS.some(pattern => pattern.test(normalized))) {
    return true
  }

  const inlineMatchCount = INLINE_MARKDOWN_PATTERNS.reduce((count, pattern) => {
    return count + (pattern.test(normalized) ? 1 : 0)
  }, 0)

  return inlineMatchCount >= 2
}

export function markdownToHtml(text: string): string {
  return marked.parse(text, { async: false }) as string
}
