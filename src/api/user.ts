import { R, TenantEntity } from './api';
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

const useUserApi = () => {
  const request = useRequest();

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

  return { register, captcha };
};

export default useUserApi;
