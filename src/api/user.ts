import { get, post } from '@/util/request';
import { Captcha, User, LoginInfo } from '@/api/user.interface';
import { Exceptions, R } from './api.interface';

/**
 * 登陆
 * @param username 用户名
 * @param password 密码
 * @param code 验证码
 * @returns user of collection
 */
export function loginApi(params: LoginInfo): Promise<R<Record<string, any>>> {
  return post('/api/auth/login', params).then((res) => {
    return res.data;
  });
}

export function registerApi(user: User): Promise<R<Record<string, any>>> {
  return post('/api/auth/register', user).then((res) => {
    return res.data;
  });
}

/**
 * 获取验证码
 * @returns promise for captcha
 */
export function captchaApi(): Promise<R<Captcha>> {
  return get('/api/auth/captcha').then((res) => {
    return res.data || ({} as R<Captcha>);
  });
}
