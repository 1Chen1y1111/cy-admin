import type { PermissionType } from './types'
import { constantMenus } from '@/router'
import { filterTree, reRankRoutes } from '@/router/utils'
import { store } from '@/store'

import { defineStore } from 'pinia'

export const usePermissionStore = defineStore({
  id: 'cy-permission',
  state: (): PermissionType => ({
    constantMenus,
    wholeMenus: [],
    flatteningRouters: [],
    cachePageList: [],
  }),
  getters: {},
  actions: {
    handleWholeMenus(routes: any[]) {
      this.wholeMenus = filterTree(reRankRoutes(this.constantMenus.concat(routes)))
    },
  },
  persist: {
    key: 'cy-permission',
    storage: window.localStorage,
  },
})

export function usePermissionStoreHook() {
  return usePermissionStore(store)
}
