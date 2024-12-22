export function getMessageInfo(status: number | string): string {
  switch (status) {
    case 400:
      return '请求错误(400)'
    case 401:
      return '未授权，请登录'
    case 403:
      return '拒绝访问'
    case 404:
      return `请求地址出错`
    case 408:
      return '请求超时'
    case 500:
      return '服务器内部错误'
    case 501:
      return '服务未实现'
    case 502:
      return '网关错误'
    case 503:
      return '服务不可用'
    case 504:
      return '网关超时'
    case 505:
      return 'HTTP版本不受支持'
    default:
      return '请联系管理员'
  }
}
