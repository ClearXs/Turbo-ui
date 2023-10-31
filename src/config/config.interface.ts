export type Config = {
  env: string
  request: Request
}

export type Request = {
  // 请求默认头
  baseUrl: string
  // 请求超时时间
  timeout: number
}
