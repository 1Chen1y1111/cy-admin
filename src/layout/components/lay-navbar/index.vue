<script setup lang='ts'>
import { useNav } from '@/layout/hooks/useNav'

import LaySidebarCollapse from './components/SidebarCollapse.vue'

const { cyApp, toggleSideBar } = useNav()
</script>

<template>
  <div class="navbar border-b">
    <LaySidebarCollapse
      :is-active="cyApp.sidebar.opened"
      @toggle-click="toggleSideBar"
    />

    <div class="flex flex-1 items-center px-4 justify-between ">
      <div />
      <div class="flex items-center">
        <div class="text-black mr-2">
          1Chen1y1111
        </div>
        <div class="w-9 h-9 rounded-full overflow-hidden">
          <img src="@/assets/login/avatar.png" class="w-9 h-9" alt="">
        </div>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.navbar {
  height: 68px;
  display: flex;
  align-items: center;
}
</style>
