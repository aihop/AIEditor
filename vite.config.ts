import path from 'path'
import { defineConfig } from 'vite'
import vue from '@vitejs/plugin-vue'
import dts from 'vite-plugin-dts'
import tailwind from 'tailwindcss'
import autoprefixer from 'autoprefixer'
import type { Plugin } from 'vite'
import postcss from 'postcss'
import prefixer from 'postcss-prefix-selector'
import { visualizer } from 'rollup-plugin-visualizer'

function cssNamespacePlugin(): Plugin {
  return {
    name: 'vite-plugin-css-namespace',
    enforce: 'post',
    async generateBundle(_, bundle) {
      for (const key of Object.keys(bundle)) {
        const chunk = bundle[key]
        if (key.endsWith('.css') && 'source' in chunk) {
          const css = chunk.source as string
          const result = await postcss([
            prefixer({
              prefix: '.ai-editor',
              transform(_prefix: string, selector: string, prefixedSelector: string) {
                if (selector.startsWith('.ai-editor') || selector.startsWith('.FtContentView')) {
                  return selector
                }
                return prefixedSelector
              },
            }),
          ]).process(css, { from: undefined })
          chunk.source = result.css
        }
      }
    },
  }
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    vue(),
    dts({
      insertTypesEntry: true,
      outDir: 'lib',
      exclude: ['src/demo/**/*', 'examples/**/*'],
    }),
    cssNamespacePlugin(),
    visualizer({
      filename: './stats.html',
      open: true,
    }),
  ],
  optimizeDeps: {
    include: ['vue'],
    exclude: ['examples/*', 'src/demo/*'],
  },
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  css: {
    postcss: {
      plugins: [tailwind(), autoprefixer()] as any,
    },
  },
  build: {
    outDir: 'lib',
    lib: {
      entry: path.resolve(__dirname, 'src/index.ts'),
      name: 'AiEditor',
      fileName: format => `ai-editor.${format}.js`,
    },
    cssCodeSplit: false,
    rollupOptions: {
      output: {
        exports: 'named',
        globals: {
          vue: 'vue',
        },
        assetFileNames: info => {
          if (info.name && info.name.endsWith('.css')) {
            return 'style.css'
          }
          return 'assets/[name].[hash][extname]'
        },
      },
      external: ['vue'],
    },
  },
})
