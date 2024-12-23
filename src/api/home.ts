import { http } from '@/utils/http'

export interface UserResultType {
  success: boolean
  data: {
    avatar: string
    name: string
    age: number
  }
}

/** login */
export function getLogin(data: object) {
  return http.request<UserResultType>('post', '/api/login', { data })
}
