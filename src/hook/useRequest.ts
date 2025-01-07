import axios, { AxiosError, AxiosInstance, AxiosResponse, Method } from 'axios';
import config from '@/config/config';
import { Toast } from '@douyinfe/semi-ui';
import * as local from '@/util/local';
import * as constants from '@/util/constant';
import * as auth from '@/util/auth';
import { useCallback } from 'react';
import { R } from '@/api';
import useStore from './useStore';
import { useNavigate } from 'react-router-dom';

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

export class InternalRequestImpl implements InternalRequest {
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
  const { error, user } = useStore();
  const navigate = useNavigate();

  /**
   * resolve response
   * according response status:
   * condition of status 200: once again code of data
   * condition of status 401: authentication error. redirect to login page
   * condition of status 404: not found error. redirect to error page
   * condition of other: redirect to error
   *
   */
  const resolveResponse = useCallback((res: AxiosResponse): Promise<any> => {
    const { status, data } = res;

    if (status === 200) {
      const { code, message } = data as R<any>;
      if (code === 200) {
        return Promise.resolve(res);
      } else if (code === 500) {
        handleInternalError(message);
        return Promise.reject(data);
      } else {
        return Promise.reject(new Error('unknown error'));
      }
    } else {
      return resolveIncorrectResponse(res);
    }
  }, []);

  const resolveIncorrectResponse = useCallback(
    (error: AxiosResponse): Promise<any> => {
      const {
        status,
        config: { url },
        statusText,
      } = error;
      if (status === 401) {
        const message = 'authentication failed';
        handleFailedAuthentication(message);
        return Promise.reject(new Error(message));
      } else if (status === 404) {
        const message = `not found ${url} service`;
        handleNotFound(message);
        return Promise.reject(new Error(message));
      } else {
        return Promise.reject(new Error(`unknown error: ${statusText}`));
      }
    },
    [],
  );

  const handleFailedAuthentication = useCallback((message: string) => {
    // toast the top screen
    Toast.error(message);
    // navigate to login
    navigate('/login');
    // clear relevant authentication
    user.setCurrentUser(undefined);
    auth.clear();
  }, []);

  const handleNotFound = useCallback((message: string) => {
    error.setError({ status: 404, message: message });
  }, []);

  const handleInternalError = useCallback((message: string) => {
    Toast.error(message);
  }, []);

  const axiosRequest = axios.create();
  axiosRequest.defaults.baseURL = config.request.baseUrl;
  axiosRequest.defaults.timeout = config.request.timeout;
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

  return createRequest((axiosInstance) => {
    axiosInstance.interceptors.response.clear();
    axiosInstance.interceptors.response.use(
      (res) => resolveResponse(res),
      (err) => {
        if (err instanceof AxiosError) {
          return resolveIncorrectResponse(err.response!);
        } else {
          return Promise.reject(err);
        }
      },
    );
  });
};

export const createRequest = (
  enhanceCallback?: (axiosInstance: AxiosInstance) => void,
) => {
  const axiosRequest = axios.create();
  axiosRequest.defaults.baseURL = config.request.baseUrl;
  axiosRequest.defaults.timeout = config.request.timeout;
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
