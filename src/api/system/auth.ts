import { R } from '..';
import useRequest, { InternalRequest } from '@/hook/useRequest';
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

export interface AuthApi {
  /**
   * 登陆
   *
   * @param username 用户名
   * @param password 密码
   * @param code 验证码
   *
   * @returns user of collection
   */
  login: (params: LoginInfo) => Promise<R<Record<string, any>>>;

  /**
   * 获取当前用户
   *
   * @returns
   */
  getCurrentUser: () => Promise<R<User>>;

  /**
   * 获取当前用户菜单
   */
  getCurrentUserMenu: () => Promise<R<MenuTree[]>>;

  /**
   * 登出
   */
  logout: () => Promise<R<boolean>>;

  /**
   * 修改密码
   *
   * @returns token 信息
   */
  changePassword: (
    id: string,
    rawPassword: string,
    newPassword: string,
  ) => Promise<R<Record<string, any>>>;

  /**
   * 修改用户信息
   *
   * @returns token 信息
   */
  modify: (user: Record<string, any>) => Promise<R<Record<string, any>>>;

  /**
   * 获取验证码
   *
   * @returns promise for captcha
   */
  captcha: () => Promise<R<Captcha>>;

  /**
   * 注册
   *
   * @param user 用户信息
   * @returns
   */
  register: (user: User) => Promise<R<Record<string, any>>>;

  /**
   * 获取当前用户组织
   */
  currentUserOrg: () => Promise<R<Org>>;

  /**
   * 获取当前用户角色
   */
  currentUserRole: () => Promise<R<Role[]>>;

  /**
   * 获取当前用户岗位
   */
  currentUserPost: () => Promise<R<Post[]>>;
}

export class AuthApiImpl implements AuthApi {
  request: InternalRequest;
  constructor(request: InternalRequest) {
    this.request = request;
  }

  login = (params: LoginInfo): Promise<R<Record<string, any>>> => {
    return this.request
      .post('/api/auth/login', params, { 'X-LOGIN-MODE': params.loginMode })
      .then((res) => {
        return res.data;
      });
  };

  getCurrentUser = (): Promise<R<User>> => {
    return this.request.get('/api/auth/current-user').then((res) => {
      return res.data;
    });
  };

  getCurrentUserMenu = (): Promise<R<MenuTree[]>> => {
    return this.request.get('/api/auth/current-user-menus').then((res) => {
      return res.data;
    });
  };

  logout = (): Promise<R<boolean>> => {
    return this.request.get('/api/auth/logout').then((res) => {
      return res.data;
    });
  };

  changePassword = (
    id: string,
    rawPassword: string,
    newPassword: string,
  ): Promise<R<Record<string, any>>> => {
    return this.request
      .put('/api/auth/changePassword', { id, rawPassword, newPassword })
      .then((res) => {
        return res.data;
      });
  };

  modify = (user: Record<string, any>): Promise<R<Record<string, any>>> => {
    return this.request.put('/api/auth/modify', user).then((res) => {
      return res.data;
    });
  };

  captcha = (): Promise<R<Captcha>> => {
    return this.request.get('/api/auth/captcha').then((res) => {
      return res.data || ({} as R<Captcha>);
    });
  };

  register = (user: User): Promise<R<Record<string, any>>> => {
    return this.request.post('/api/auth/register', user).then((res) => {
      return res.data;
    });
  };

  currentUserOrg = (): Promise<R<Org>> => {
    return this.request.get('/api/auth/current-user-org').then((res) => {
      return res.data;
    });
  };

  currentUserRole = (): Promise<R<Role[]>> => {
    return this.request.get('/api/auth/current-user-role').then((res) => {
      return res.data;
    });
  };

  currentUserPost = (): Promise<R<Post[]>> => {
    return this.request.get('/api/auth/current-user-post').then((res) => {
      return res.data;
    });
  };
}

export default function useAuthApi() {
  const request = useRequest();
  return new AuthApiImpl(request);
}
