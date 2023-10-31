import { Config, Request } from '@/config/config.interface'

const env: string = process.env.NODE_ENV || 'development'

export default {
  env,
  request: {
    baseUrl: '/',
    // 默认超时时间为10s
    timeout: 100000
  } as Request
} as Config
