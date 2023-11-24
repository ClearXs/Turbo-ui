import { GeneralApi, GeneralParams, Pagination, R, TenantEntity } from '../api';
import useRequest from '@/hook/request';

export type User = TenantEntity & {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: number;
  nickname: string;
  avatar: string;
};

export type LoginInfo = {
  captchaId: string;
  username: string;
  password: string;
  tenant?: string;
  captcha: string;
};

export type Captcha = {
  captchaId: string;
  base64: string;
};

export interface UserApi extends GeneralApi<User> {
  register: (user: User) => Promise<R<Record<string, any>>>;

  /**
   * 获取验证码
   * @returns promise for captcha
   */
  captcha: () => Promise<R<Captcha>>;
}

function useUserApi(): UserApi {
  const request = useRequest();

  const save = (entity: User): Promise<R<boolean>> => {
    return request.post('/api/sys/user/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: User): Promise<R<boolean>> => {
    return request.put('/api/sys/user/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: User): Promise<R<boolean>> => {
    return request.put('/api/sys/user/save-or-update', entity).then((res) => {
      return res.data;
    });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/user/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<User>> => {
    return request.get('/api/sys/user/details', { id }).then((res) => {
      return res.data;
    });
  };

  const list = (params: GeneralParams<User>): Promise<R<User[]>> => {
    return request.post('/api/sys/user/list', { ...params }).then((res) => {
      return res.data;
    });
  };

  const page = (
    page: Pagination<User>,
    params: GeneralParams<User>,
  ): Promise<R<Pagination<User>>> => {
    return request
      .post('/api/sys/user/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  const register = (user: User): Promise<R<Record<string, any>>> => {
    return request.post('/api/auth/register', user).then((res) => {
      return res.data;
    });
  };

  /**
   * 获取验证码
   * @returns promise for captcha
   */
  const captcha = (): Promise<R<Captcha>> => {
    return request.get('/api/auth/captcha').then((res) => {
      return res.data || ({} as R<Captcha>);
    });
  };

  return {
    save,
    edit,
    saveOrUpdate,
    deleteEntity,
    details,
    list,
    page,
    register,
    captcha,
  };
}

export default useUserApi;
