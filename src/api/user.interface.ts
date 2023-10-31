import { TenantEntity } from './api.interface';

export type User = TenantEntity & {
  username: string;
  password: string;
  email: string;
  name: string;
  age: number;
};

export type Captcha = {
  captchaId: string;
  base64: string;
};
