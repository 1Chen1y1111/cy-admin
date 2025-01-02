import { http } from '@/utils/http'

export interface UserResultType {
  code: number
  data: {
    avatar: string
    username: string
    nickname: string
    roles: Array<string>
    accessToken: string
    refreshToken: string
    expires: string
  }
}
interface RouterResult {
  code: number
  data: Array<any>
}

/** Mock login */
export function getMockLogin(data: object) {
  return http.request<UserResultType>('post', '/mock/login', { data })
}

/** Mock routes */
export function getMockAsyncRoutes() {
  return http.request<RouterResult>('get', '/mock/get-async-routes')
}
