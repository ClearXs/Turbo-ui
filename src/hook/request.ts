import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';
import sysconfig from '@/config/config';
import { Toast } from '@douyinfe/semi-ui';
import * as auth from '@/util/auth';
import * as local from '@/util/local';
import * as constants from '@/util/constant';
import { useRecoilState } from 'recoil';
import { ErrorState } from '@/store/error';

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
  const [, setError] = useRecoilState(ErrorState);
  const remoteRequest = createRequest((axiosInstance) => {
    // 清除存在的响应拦截器
    axiosInstance.interceptors.response.clear();
    axiosInstance.interceptors.response.use(
      (res) => {
        const status = res.status;
        if (status === 200) {
          // 消息提示
          const data = res.data;
          if (data?.code !== 200) {
            Toast.error(data?.message);
            return Promise.reject(res);
          } else {
            return Promise.resolve(res);
          }
        } else {
          throw new Error('unkonwn error');
        }
      },
      (err) => {
        if (err instanceof AxiosError) {
          const errCode = err.response?.status || err.status;
          // 错误消息展示
          const msg = err.response?.data?.message || err.response?.statusText;
          Toast.error(msg);
          // 认证失败
          if (errCode === 401) {
            auth.clear();
            setError?.({ status: 401, message: msg });
          }
          return Promise.reject(err);
        } else {
          return Promise.reject(err);
        }
      },
    );
  });

  return remoteRequest;
};

export const createRequest = (
  enhanceCallback?: (axiosInstance: AxiosInstance) => void,
) => {
  const axiosRequest = axios.create();
  axiosRequest.defaults.baseURL = sysconfig.request.baseUrl;
  axiosRequest.defaults.timeout = sysconfig.request.timeout;
  axiosRequest.defaults.headers.post['Content-Type'] = 'application/json';

  // 请求拦截器
  axiosRequest.interceptors.request.use((config) => {
    // 设置请求头
    config.headers.set(
      constants.Authentication,
      local.get(constants.Authentication) || '',
    );
    config.headers.set(constants.Tenant, local.get(constants.Tenant) || '');
    config.headers.set(constants.App, 'PC');
    return config;
  });

  enhanceCallback?.(axiosRequest);

  return new InternalRequestImpl(axiosRequest);
};

export default useRequest;
