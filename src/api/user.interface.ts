import { TenantEntity } from './api.interface';

export type User = TenantEntity & {
  username: string;
  password: string;
  email: string;
  name: string;
  phone: number;
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
