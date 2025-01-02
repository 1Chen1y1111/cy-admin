import type { UserResultType } from '@/api/mock'
import type { UserType } from './types'
import { getMockLogin } from '@/api/mock'
import router from '@/router'
import { store } from '@/store'
import { setToken } from '@/utils/auth'
import { defineStore } from 'pinia'

export const useUserStore = defineStore({
  id: 'cy-user',
  state: (): UserType => ({
    userInfo: null,
  }),
  getters: {},
  actions: {
    /** Set userInfo */
    SET_USERINFO(data) {
      this.userInfo = data
    },
    /** login by api */
    async loginByAccount(data) {
      return new Promise<UserResultType>((resolve, reject) => {
        getMockLogin(data).then((res) => {
          if (res?.code === 0) {
            setToken(res.data)
          }
          resolve(res)
        }).catch((err) => {
          reject(err)
        })
      })
    },
    /** Log out without interface */
    logOut() {
      this.userInfo = null
      router.push('/login')
    },
  },
  persist: {
    key: 'cy-user',
    storage: window.localStorage,
  },
})

export function useUserStoreHook() {
  return useUserStore(store)
}
