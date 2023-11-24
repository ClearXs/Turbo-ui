import useAuthApi from '@/api/system/auth';
import useUserApi, { Captcha, User } from '@/api/system/user';
import _ from 'lodash';
import { atom, selector } from 'recoil';

const namespace = 'user';

// 验证码
export const captchaState = atom({
  key: `${namespace}:captcha`,
  default: {} as Captcha,
  effects: [
    ({ setSelf }) => {
      // 设置预先加载的验证码数据
      setSelf(
        useUserApi()
          .captcha()
          .then((res) => res.data) as Promise<Captcha>,
      );
    },
  ],
});

export const CurrentUserState = atom<User | undefined>({
  key: `${namespace}:current:user`,
  effects: [
    ({ setSelf }) => {
      useAuthApi()
        .getCurrentUser()
        .then((res) => setSelf(res.data));
    },
  ],
});
