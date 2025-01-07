<script setup lang='ts'>
import type { RouteLocationNormalizedLoaded } from 'vue-router'
import { type Component, computed } from 'vue'

const props = defineProps<{
  currentComp: Component
  currentRoute: RouteLocationNormalizedLoaded
}>()
console.log('🚀 ~ props:', props)

// const compList = shallowRef([])
const keepAlive = computed(() => {
  return (
    props.currentRoute.meta?.keepAlive
    && !!props.currentRoute.meta?.frameSrc
  )
})

// 插眼 avoid re render LayFrame
const normalComp = computed(() => !keepAlive.value && props.currentComp)
</script>

<template>
  <div class="w-full h-full">
    <slot :comp="normalComp" :full-path="currentRoute.fullPath" :frame-info="true" />
  </div>
</template>

<style lang="scss" scoped>

</style>
