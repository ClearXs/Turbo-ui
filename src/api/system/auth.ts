import { R } from '../api';
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
    return request.get('/api/auth/menus').then((res) => {
      return res.data;
    });
  };

  /**
   * 登出
   */
  const logout = (): Promise<R<boolean>> => {
    return request.get('/api/auth/logout').then((res) => {
      return res.data;
    });
  };

  /**
   * 修改密码
   * @returns token 信息
   */
  const changePassword = (
    newPassword: string,
  ): Promise<R<Record<string, any>>> => {
    return request
      .put('/api/auth/changePassword', { newPassword })
      .then((res) => {
        return res.data;
      });
  };

  /**
   * 修改用户信息
   * @returns token 信息
   */
  const modify = (
    user: Record<string, any>,
  ): Promise<R<Record<string, any>>> => {
    return request.put('/api/auth/modify', user).then((res) => {
      return res.data;
    });
  };

  return {
    login,
    getCurrentUser,
    getCurrentUserMenu,
    logout,
    changePassword,
    modify,
  };
}
