import { R } from '..';
import useRequest from '@/hook/request';
import { User } from './user';
import { MenuTree } from './menu';
import { Org } from './org';
import { Role } from './role';
import { Post } from './post';

export type LoginMode = 'EMPTY' | 'CAPTCHA_CODE' | 'VERIFICATION_CODE';

export type CaptchaCode = {
  captcha?: string;
  captchaId?: string;
};

export type VerificationCode = {
  code: string;
};

export type LoginUsernamePassword = {
  /**
   * 用户名
   */
  username: string;

  /**
   * 密码
   */
  password: string;

  /**
   * login mode
   */
  loginMode: LoginMode;
};

export type LoginCaptcha = {
  /**
   * 用户名
   */
  username: string;

  /**
   * 密码
   */
  password: string;

  /**
   * login mode
   */
  loginMode: LoginMode;

  /**
   * the captcha code
   */
  captchaCode: CaptchaCode;
};

export type LoginInfo = LoginUsernamePassword | LoginCaptcha;

export type Captcha = {
  captchaId: string;
  base64: string;
};

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
    return request
      .post('/api/auth/login', params, { 'X-LOGIN-MODE': params.loginMode })
      .then((res) => {
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
    return request.get('/api/auth/current-user-menus').then((res) => {
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
    id: string,
    rawPassword: string,
    newPassword: string,
  ): Promise<R<Record<string, any>>> => {
    return request
      .put('/api/auth/changePassword', { id, rawPassword, newPassword })
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

  /**
   * 获取验证码
   * @returns promise for captcha
   */
  const captcha = (): Promise<R<Captcha>> => {
    return request.get('/api/auth/captcha').then((res) => {
      return res.data || ({} as R<Captcha>);
    });
  };

  /**
   * 注册
   * @param user 用户信息
   * @returns
   */
  const register = (user: User): Promise<R<Record<string, any>>> => {
    return request.post('/api/auth/register', user).then((res) => {
      return res.data;
    });
  };

  /**
   * 获取当前用户组织
   */
  const currentUserOrg = (): Promise<R<Org>> => {
    return request.get('/api/auth/current-user-org').then((res) => {
      return res.data;
    });
  };

  /**
   * 获取当前用户角色
   */
  const currentUserRole = (): Promise<R<Role[]>> => {
    return request.get('/api/auth/current-user-role').then((res) => {
      return res.data;
    });
  };

  /**
   * 获取当前用户岗位
   */
  const currentUserPost = (): Promise<R<Post[]>> => {
    return request.get('/api/auth/current-user-post').then((res) => {
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
    captcha,
    register,
    currentUserOrg,
    currentUserRole,
    currentUserPost,
  };
}
