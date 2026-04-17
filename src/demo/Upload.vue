<!-- filepath: src/demo/Upload.vue -->
<template>
  <div>
    <button @click="visible = true">
      <Icon :name="icon" />
      {{ tooltip || '插入图片' }}
    </button>
    <teleport to="body">
      <div
        v-if="visible"
        class="fixed inset-0 z-[9999]  z-50 flex items-center justify-center bg-black/30"
        @click.self="visible = false"
        @mousedown.self="visible = false"
      >
        <div
          class="bg-white rounded shadow-lg p-6 w-[350px]"
          @mousedown.stop
          @mouseup.stop
          @click.stop
        >
          <div class="mb-2 font-bold">插入图片</div>
          <input
            v-model="imgurl"
            placeholder="图片链接"
            class="border rounded px-2 py-1 w-full"
          />
          <img
            v-if="imgurl"
            :src="imgurl"
            alt="预览"
            class="max-w-full max-h-40 mt-2"
          />
          <div class="flex justify-end gap-2 mt-4">
            <button
              class="px-3 py-1 border rounded"
              @click="visible = false"
            >取消</button>
            <button
              class="px-3 py-1 bg-blue-500 text-white rounded"
              @click="handleUpload"
            >插入</button>
          </div>
        </div>
      </div>
    </teleport>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { Icon } from '@/components/icons'
const props = defineProps(['editor', 'icon', 'tooltip', 'action'])

const visible = ref(false)
const imgurl = ref('https://picsum.photos/1920/1080.webp?t=1')

function handleUpload() {
  if (props.editor && imgurl.value) {
    props.editor.chain().focus().setImage({ src: imgurl.value }).run()
  }
  props.action && props.action()
  visible.value = false
}
</script>