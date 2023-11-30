import { GeneralApi, GeneralApiImpl, R, TenantEntity } from '../interface';
import useRequest from '@/hook/request';

export type User = TenantEntity & {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: number;
  nickname: string;
  avatar: string;
  status: string;
};

export interface UserApi extends GeneralApi<User> {
  /**
   * 锁定
   * @param id 用户id
   */
  lock: (id: User['id']) => Promise<R<Boolean>>;

  /**
   * 激活
   * @param id 用户id
   */
  active: (id: User['id']) => Promise<R<Boolean>>;

  /**
   * 更改密码
   * @param id 用户id
   * @param newPassword 新密码
   */
  changePassword: (
    id: User['id'],
    newPassword: User['password'],
  ) => Promise<R<Boolean>>;
}

class UserApiImpl extends GeneralApiImpl<User> implements UserApi {
  lock(id: string): Promise<Boolean> {
    return this.request.get(this.apiPath + '/lock', { id }).then((res) => {
      return res.data;
    });
  }
  active(id: string): Promise<Boolean> {
    return this.request.get(this.apiPath + '/active', { id }).then((res) => {
      return res.data;
    });
  }
  changePassword(id: string, newPassword: string): Promise<Boolean> {
    return this.request
      .post(this.apiPath + '/change-password', {
        id,
        newPassword,
      })
      .then((res) => {
        return res.data;
      });
  }
}

function useUserApi(): UserApi {
  const request = useRequest();
  return new UserApiImpl('/api/sys/user', request);
}

export default useUserApi;
