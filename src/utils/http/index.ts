import type {
  CyHttpError,
  CyHttpRequestConfig,
  CyHttpResponseConfig,
  RequestMethods,
} from './types.d'

import Axios, {
  type AxiosInstance,
  type AxiosRequestConfig,
  type CustomParamsSerializer,
} from 'axios'

import { stringify } from 'qs'
import { getMessageInfo } from '../index'
import { message } from '../message'

/** related config docs:www.axios-js.com/zh-cn/docs/#axios-request-config-1 */
const defaultConfig: AxiosRequestConfig = {
  timeout: 10000,
  headers: {
    'Accept': 'application/json, text/plain, */*',
    'Content-Type': 'application/json',
    'X-Requested-With': 'XMLHttpRequest',
  },
  /** array format parameter serialization（https://github.com/axios/axios/issues/5142） */
  paramsSerializer: {
    serialize: stringify as unknown as CustomParamsSerializer,
  },
}

class CyHttp {
  constructor() {
    this.httpInterceptorsRequest()
    this.httpInterceptorsResponse()
  }

  /** init config */
  private static initConfig: CyHttpRequestConfig = {}

  /** init axios instance */
  private static axiosInstance: AxiosInstance = Axios.create(defaultConfig)

  /** request interceptor */
  private httpInterceptorsRequest(): void {
    CyHttp.axiosInstance.interceptors.request.use(
      (config: CyHttpRequestConfig): Promise<any> => {
        if (typeof config.beforeRequestCallback === 'function') {
          config.beforeRequestCallback(config)
          return Promise.resolve(config)
        }

        if (CyHttp.initConfig.beforeRequestCallback) {
          CyHttp.initConfig.beforeRequestCallback(config)
          return Promise.resolve(config)
        }

        return Promise.resolve(config)
      },
      (error) => {
        return Promise.reject(error)
      },
    )
  }

  /** response interceptor */
  private httpInterceptorsResponse(): void {
    CyHttp.axiosInstance.interceptors.response.use(
      (response: CyHttpResponseConfig) => {
        const $config = response.config

        if (typeof $config.beforeResponseCallback === 'function') {
          $config.beforeResponseCallback(response)
          return response.data
        }

        if (CyHttp.initConfig.beforeResponseCallback) {
          CyHttp.initConfig.beforeResponseCallback(response)
          return response.data
        }

        // file blob
        if ($config.responseType === 'blob') {
          return response
        }

        // message tip
        message(getMessageInfo(response.status), {
          customClass: 'el',
          type: 'error',
        })

        if (response.status === 200) {
          return response.data
        }
      },
      (error: CyHttpError) => {
        //  插眼
        const $error: any = error
        $error.isCancelRequest = Axios.isCancel($error)

        // message tip
        message(getMessageInfo($error.response.status), {
          customClass: 'el',
          type: 'error',
        })

        return Promise.reject(error)
      },
    )
  }

  /** request utils function */
  public request<T>(
    method: RequestMethods,
    url: string,
    params?: AxiosRequestConfig,
    axiosConfig?: CyHttpRequestConfig,
  ): Promise<T> {
    const config = {
      method,
      url,
      ...params,
      ...axiosConfig,
    }

    return new Promise((resolve, reject) => {
      CyHttp.axiosInstance
        .request(config)
        .then((response: any) => {
          resolve(response)
        })
        .catch((error) => {
          reject(error)
        })
    })
  }
}

export const http = new CyHttp()
