<script setup lang='ts'>
import { useAppStoreHook } from '@/store/modules/app'

import { deviceDetection, useResizeObserver } from '@pureadmin/utils'
import { computed, onMounted, reactive, ref } from 'vue'
import LayContent from './components/lay-content/index.vue'
import LayNavbar from './components/lay-navbar/index.vue'
import LaySideBar from './components/lay-sidebar/index.vue'

defineOptions({
  name: 'LayIndex',
})

const appWrapperRef = ref()
const isMobile = deviceDetection()

const set = reactive({
  sidebar: computed(() => {
    return useAppStoreHook().sidebar
  }),

  device: computed(() => {
    return useAppStoreHook().device
  }),

  classes: computed(() => {
    return {
      hideSidebar: !set.sidebar.opened,
      openSidebar: set.sidebar.opened,
      withoutAnimation: set.sidebar.withoutAnimation,
      mobile: set.device === 'mobile',
    }
  }),
})

useResizeObserver(appWrapperRef, (entries) => {
  if (isMobile)
    return
  const entry = entries[0]
  const [{ inlineSize: width, blockSize: height }] = entry.borderBoxSize
  useAppStoreHook().SET_VIEWPORT_SIZE({ width, height })

  /**
   * width app-wrapper
   * 0 < width <= 760 hide sidebar
   * 760 < width <= 990 fold sidebar
   * width > 990 expand sidebar
   */
  if (width > 0 && width <= 760) {
    toggle('mobile', false)
  }
  else {
    toggle('desktop', true)
  }
})

function toggle(device: string, bool: boolean) {
  useAppStoreHook().TOGGLE_DEVICE(device)
  useAppStoreHook().toggleSideBar(bool, 'resize')
}

function onMaskToggle() {
  useAppStoreHook().toggleSideBar()
}

onMounted(() => {
  if (isMobile) {
    toggle('mobile', false)
  }
})
</script>

<template>
  <div ref="appWrapperRef" class="app-container" :class="[set.classes]">
    <div
      v-show="set.device === 'mobile' && set.sidebar.opened"
      class="app-mask"
      @click="onMaskToggle"
    />
    <div class="sidebar-container">
      <LaySideBar />
    </div>
    <div class="main-container">
      <div class="fixed-header">
        <LayNavbar />
      </div>
      <LayContent />
    </div>
  </div>
</template>

<style lang='scss' scoped>
.app-container {
  display: flex;
  height: 100vh;
  box-sizing: border-box;
  background-color: var(--cy-bg-1);
}

.app-mask {
  position: absolute;
  top: 0;
  z-index: 2001;
  width: 100%;
  height: 100%;
  background: #000;
  opacity: 0.3;
}

.sidebar-container {
  background-color: var(--cy-gray-1);
  width: var(--sidebar-width);
  flex: 0 0 var(--sidebar-width);
  transition: all var(--cy-transition-duration);
  font-size: 0;
}

.main-container {
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100vh;
  overflow-y: scroll;
  transition: margin-left var(--cy-transition-duration);
}

.fixed-header {
  position: sticky;
  top: 0;
}
</style>
