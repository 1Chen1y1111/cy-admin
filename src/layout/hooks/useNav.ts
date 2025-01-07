import { useAppStoreHook } from '@/store/modules/app'
import { computed } from 'vue'

export function useNav() {
  const cyApp = useAppStoreHook()

  const isCollapse = computed(() => {
    return !cyApp.getSidebarStatus
  })

  function toggleSideBar() {
    cyApp.toggleSideBar()
  }

  return {
    cyApp,
    isCollapse,
    toggleSideBar,
  }
}
