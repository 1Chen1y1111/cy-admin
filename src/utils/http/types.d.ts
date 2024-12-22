import type {
  AxiosError,
  AxiosRequestConfig,
  AxiosResponse,
  Method,
} from 'axios'

export interface ResultType<T> {
  code: number | string
  message: string
  data: T
}

export type RequestMethods = Extract<
  Method,
    'get' | 'post' | 'put' | 'delete' | 'patch' | 'option' | 'head'
>

export interface CyHttpError extends AxiosError {
  isCancelRequest?: boolean
}

export interface CyHttpResponseConfig extends AxiosResponse {
  config: CyHttpRequestConfig
}

export interface CyHttpRequestConfig extends AxiosRequestConfig {
  beforeRequestCallback?: (request: CyHttpRequestConfig) => void
  beforeResponseCallback?: (response: CyHttpResponseConfig) => void
}

export default class CyHttp {
  request<T>(
    method: RequestMethods,
    url: string,
    params?: AxiosRequestConfig,
    axiosConfig?: CyHttpRequestConfig
  ): Promise<T>
}
