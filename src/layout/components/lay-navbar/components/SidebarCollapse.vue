<script setup lang="ts">
import MenuFold from '@iconify-icons/ri/menu-fold-fill'
import MenuUnfold from '@iconify-icons/ri/menu-unfold-fill'

interface Props {
  isActive: boolean
}

withDefaults(defineProps<Props>(), {
  isActive: false,
})

const emit = defineEmits<{
  (e: 'toggleClick'): void
}>()

function toggleClick() {
  emit('toggleClick')
};
</script>

<template>
  <div
    class="px-4 cursor-pointer"
    :title="isActive ? '点击折叠' : '点击展开'"
    @click="toggleClick"
  >
    <IconifyIconOffline
      :icon="isActive ? MenuFold : MenuUnfold"
      class="inline-block align-middle hover:text-primary dark:hover:!text-white"
    />
  </div>
</template>
