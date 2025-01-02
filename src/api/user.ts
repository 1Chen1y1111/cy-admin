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

/** login */
export function getLogin(data: object) {
  return http.request<UserResultType>('post', '/login', { data })
}
