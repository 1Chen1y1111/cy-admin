import type { HomeType } from './types'
import { store } from '@/store'
import { defineStore } from 'pinia'

export const useHomeStore = defineStore({
  id: 'cy-home',
  state: (): HomeType => ({
    name: '',
  }),
  getters: {},
  actions: {},
  persist: {
    key: 'cy-home',
    storage: window.sessionStorage,
  },
})

export function useHomeStoreHook() {
  return useHomeStore(store)
}
