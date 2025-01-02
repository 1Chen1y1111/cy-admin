import { useUserStoreHook } from '@/store/modules/user'
import Cookies from 'js-cookie'

export interface DataInfo {
  /** avatar */
  avatar?: string
  /** username */
  username?: string
  /** nickname */
  nickname?: string
  /** current roles array */
  roles?: Array<string>
  /** token */
  accessToken?: string
  /** refresh accessToken */
  refreshToken?: string
  /** accessToken's expires time（ISO 8601） */
  expires: string
}

export const userKey = 'user-info'
export const TokenKey = 'authorized-token'

/**
 * Check the user has logged in to the system by checking whether `multiple-tabs` is in `cookie` to realize no login required.
 */
export const multipleTabsKey = 'multiple-tabs'

/**
 * @description: setToken
 * Use this function to set token and other info.
 * Adopt the solution of refreshing token without any sense.
 * RefreshToken's expiration time should be greater than accessToken's expiration time.
 * Put the three pieces of information `accessToken`、`expires`、`refreshToken` in the cookie with the key value of `authorized-token` (automatically destroyed when expired).
 * Put the six pieces of information `avatar`、`username`、`nickname`、`expires`、`refreshToken` in the localStorage with the key value of `user-info` (use `multipleTabsKey` to automatically destroy when the browser is completely closed).
 */
export function setToken(data: DataInfo) {
  let expires = 0

  const { accessToken, refreshToken } = data
  expires = new Date(data.expires).getTime()

  const cookieString = JSON.stringify({
    accessToken,
    refreshToken,
    expires,
  })

  expires > 0
    ? Cookies.set(TokenKey, cookieString, {
        expires: (expires - Date.now()) / 86400000,
      })
    : Cookies.set(TokenKey, cookieString)

  Cookies.set(multipleTabsKey, 'true')

  useUserStoreHook().SET_USERINFO(data)
}

/** Remove the `token` and the localStorage with the key `user-info` */
export function removeToken() {
  Cookies.remove(TokenKey)
  Cookies.remove(multipleTabsKey)
  useUserStoreHook().logOut()
}
