import type { homeType } from './types'
import { store } from '@/store'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore({
  id: 'cy-home',
  state: (): homeType => ({
    name: '',
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'cy-home', // 修改存储的键名，默认为当前 Store 的 id
    storage: window.sessionStorage, // 存储位置修改为 sessionStorage
  },
})

export function useHomeStoreHook() {
  return useHomeStore(store)
}
