export type Config = {
  env: string;
  request: Request;
};

export type Request = {
  // 请求默认头
  baseUrl: string;
  // 请求超时时间
  timeout: number;
};

const env: string = process.env.NODE_ENV || 'development';

export default {
  env,
  request: {
    baseUrl: '/',
    // 默认超时时间为10s
    timeout: 100000,
  } as Request,
} as Config;
