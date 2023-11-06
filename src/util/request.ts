import axios, { AxiosError, AxiosResponse } from 'axios';
import sysconfig from '@/config/config';
import * as local from '@/util/local';
import { R } from '@/api/api.interface';
import { Notification } from '@douyinfe/semi-ui';
import * as headers from './headers';

axios.defaults.baseURL = sysconfig.request.baseUrl;
axios.defaults.timeout = sysconfig.request.timeout;
axios.defaults.headers.post['Content-Type'] = 'application/json';

axios.interceptors.request.use((config) => {
  // 设置请求头
  config.headers.set(
    headers.Authentication,
    local.get(headers.Authentication) || '',
  );
  config.headers.set(headers.Tenant, local.get(headers.Tenant) || '');
  return config;
});

axios.interceptors.response.use(
  (res) => {
    return handleSuccess(res);
  },
  (err) => {
    if (err instanceof AxiosError) {
      return handleResError(err);
    } else {
      return Promise.reject(err);
    }
  },
);

const errorCode: Record<number, string> = {
  401: 'Authentication failed',
  403: '',
  500: 'Internal Server Error',
};

function handleSuccess<T>(res: AxiosResponse): Promise<AxiosResponse> {
  const status = res.status;
  if (status === 200) {
    // 消息提示
    return Promise.resolve(res);
  } else {
    const errMsg = errorCode[status];
    throw new Error(`${errMsg}`);
  }
}

/**
 * reponse错误处理，包含消息提示
 * @param err
 */
function handleResError<T>(err: AxiosError, errorValue?: R<T>) {
  // 1.消息提示
  const msg = err.response?.data?.message || errorCode[err.status || 500];
  Notification.error({
    duration: 3,
    position: 'top',
    content: msg,
  });
  // 2.返回错误数据
  return Promise.resolve(errorValue || err.response);
}

/**
 * rquest for get
 * @param path
 * @param params
 * @returns
 */
export const get = (path: string, params = {}) => {
  return axios.request({
    url: path,
    method: 'GET',
    params,
  });
};

export const post = (path: string, params = {}) => {
  return axios.request({
    url: path,
    method: 'POST',
    data: params,
  });
};
