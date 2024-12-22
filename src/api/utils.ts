import process from 'node:process'

export function baseUrlApi(url: string) {
  return process.env.NODE_ENV === 'development' ? `/api/${url}` : `/${url}`
}
