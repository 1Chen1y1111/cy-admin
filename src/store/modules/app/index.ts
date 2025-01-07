import type { AppType } from './types'
import { store } from '@/store'
import { deviceDetection } from '@pureadmin/utils'
import { defineStore } from 'pinia'

export const useAppStore = defineStore({
  id: 'cy-app',
  state: (): AppType => ({
    sidebar: {
      opened: true,
      withoutAnimation: false,
      isClickCollapse: false,
    },
    device: deviceDetection() ? 'mobile' : 'desktop',
    viewportSize: {
      width: document.documentElement.clientWidth,
      height: document.documentElement.clientHeight,
    },
  }),
  getters: {
    getSidebarStatus(state) {
      return state.sidebar.opened
    },
  },
  actions: {
    TOGGLE_SIDEBAR(opened?: boolean, resize?: string) {
      if (opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = true
      }
      else if (!opened && resize) {
        this.sidebar.withoutAnimation = true
        this.sidebar.opened = false
      }
      else if (!opened && !resize) {
        this.sidebar.withoutAnimation = false
        this.sidebar.opened = !this.sidebar.opened
        this.sidebar.isClickCollapse = !this.sidebar.opened
      }
    },
    async toggleSideBar(opened?: boolean, resize?: string) {
      await this.TOGGLE_SIDEBAR(opened, resize)
    },
    TOGGLE_DEVICE(device: string) {
      this.device = device
    },
    SET_VIEWPORT_SIZE(size) {
      this.viewportSize = size
    },
  },
  persist: {
    key: 'cy-app',
    storage: window.sessionStorage,
  },
})

export function useAppStoreHook() {
  return useAppStore(store)
}
