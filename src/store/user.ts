import { captchaApi } from '@/api/user';
import { Captcha } from '@/api/user.interface';
import { atom } from 'recoil';

const namespace = 'user';

// 验证码
export const captchaState = atom({
  key: `${namespace}:captcha`,
  default: {} as Captcha,
  effects: [
    ({ setSelf }) => {
      // 设置预先加载的验证码数据
      setSelf(captchaApi().then((res) => res.data) as Promise<Captcha>);
    },
  ],
});
