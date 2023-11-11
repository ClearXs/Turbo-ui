import { R } from './api';
import useRequest from '@/hook/request';
import { LoginInfo, User } from './user';
import { MenuTree } from './menu';

export default function useAuthApi() {
  const request = useRequest();

  /**
   * 登陆
   * @param username 用户名
   * @param password 密码
   * @param code 验证码
   * @returns user of collection
   */
  const login = (params: LoginInfo): Promise<R<Record<string, any>>> => {
    return request.post('/api/auth/login', params).then((res) => {
      return res.data;
    });
  };

  /**
   * 获取当前用户
   * @returns
   */
  const getCurrentUser = (): Promise<R<User>> => {
    return request.get('/api/auth/current-user').then((res) => {
      return res.data;
    });
  };

  /**
   * 获取当前用户菜单
   */
  const getCurrentUserMenu = (): Promise<R<MenuTree[]>> => {
    // mock
    return request.get('/api/auth/menus').then((res) => {
      return res.data;
    });
  };

  return { login, getCurrentUser, getCurrentUserMenu };
}
