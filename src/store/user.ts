import useAuthApi from '@/api/auth';
import useUserApi, { Captcha, User } from '@/api/user';
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

export const CurrentUserState = selector<User | undefined>({
  key: `${namespace}:current:user`,
  get: async ({}) => {
    const res = await useAuthApi().getCurrentUser();
    return res.data;
  },
});
