import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';
import sysconfig from '@/config/config';
import * as local from '@/util/local';
import { R } from '@/api/interface';
import { Notification } from '@douyinfe/semi-ui';
import * as headers from '@/util/headers';
import { useEffect } from 'react';

export interface InternalRequest {
  request: (
    path: string,
    method: Method,
    params?: Record<string, any>,
    headers?: Record<string, any>,
  ) => Promise<AxiosResponse<any, any>>;
  get: (
    path: string,
    params?: Record<string, any>,
  ) => Promise<AxiosResponse<any, any>>;
  post: (
    path: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ) => Promise<AxiosResponse<any, any>>;
  put: (
    path: string,
    params?: Record<string, any>,
  ) => Promise<AxiosResponse<any, any>>;
  delete: (
    path: string,
    params?: Record<string, any>,
  ) => Promise<AxiosResponse<any, any>>;
}

// 创建内部remote
const internalRemote = axios.create();
internalRemote.defaults.baseURL = sysconfig.request.baseUrl;
internalRemote.defaults.timeout = sysconfig.request.timeout;
internalRemote.defaults.headers.post['Content-Type'] = 'application/json';

// 请求拦截器
internalRemote.interceptors.request.use((config) => {
  // 设置请求头
  config.headers.set(
    headers.Authentication,
    local.get(headers.Authentication) || '',
  );
  config.headers.set(headers.Tenant, local.get(headers.Tenant) || '');
  return config;
});

// 响应拦截器
internalRemote.interceptors.response.use(
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

function handleSuccess<T>(res: AxiosResponse): Promise<AxiosResponse> {
  const status = res.status;
  if (status === 200) {
    // 消息提示
    const data = res.data;
    if (data?.code !== 200) {
      Notification.error({
        duration: 3,
        position: 'top',
        content: data?.message,
      });
      return Promise.reject(res);
    } else {
      return Promise.resolve(res);
    }
  } else {
    throw new Error('unkonwn error');
  }
}

/**
 * response错误处理，包含消息提示
 * @param err
 */
function handleResError<T>(err: AxiosError, errorValue?: R<T>) {
  const errCode = err.response?.status || err.status;
  // 错误消息展示
  const msg = err.response?.data?.message || err.response?.statusText;
  Notification.error({
    duration: 3,
    position: 'top',
    content: msg,
  });
  // 认证失败
  if (errCode === 401) {
    local.remove(headers.Authentication);
    return Promise.reject(err);
    // 服务错误或者权限认证失败
  } else if (errCode === 403 || errCode === 500) {
    // 2.返回错误数据
    return Promise.resolve(errorValue || err.response);
  }
}

class InternalRequestImpl implements InternalRequest {
  constructor(private axiosRequest: AxiosInstance) {}

  request(
    path: string,
    method: Method,
    params?: Record<string, any>,
    headers?: Record<string, any>,
  ) {
    if (method === 'GET') {
      return this.axiosRequest.request({ url: path, method, params, headers });
    } else {
      return this.axiosRequest.request({
        url: path,
        method,
        data: params,
        headers,
      });
    }
  }
  get(path: string, params?: Record<string, any>) {
    return this.axiosRequest.request({
      url: path,
      method: 'GET',
      params,
    });
  }
  post(
    path: string,
    params?: Record<string, any>,
    headers?: Record<string, string>,
  ) {
    return this.axiosRequest.request({
      url: path,
      method: 'POST',
      data: params,
      headers,
    });
  }
  put(path: string, params?: Record<string, any>) {
    return this.axiosRequest.request({
      url: path,
      method: 'PUT',
      data: params,
    });
  }
  delete(path: string, params?: Record<string, any>) {
    return this.axiosRequest.request({
      url: path,
      method: 'DELETE',
      data: params,
    });
  }
}

// issue：
// 为什么使用request hook，因为需要错误处理的跳转，而期望又只能有一个实例，所以使用useEffect，
// 但useEffect的渲染将晚于使用它的组件，故报null。考虑创建全局axios的一个实例
const useRequest = () => {
  useEffect(() => {
    // 清除存在的响应拦截器
    internalRemote.interceptors.response.clear();
    internalRemote.interceptors.response.use(
      (res) => {
        return handleSuccess(res);
      },
      (err) => {
        if (err instanceof AxiosError) {
          return handleResError(err, undefined);
        } else {
          return Promise.reject(err);
        }
      },
    );
  }, []);

  return new InternalRequestImpl(internalRemote);
};

export const createRequest = () => {
  const axiosRequest = axios.create();
  return new InternalRequestImpl(axiosRequest);
};

export default useRequest;
