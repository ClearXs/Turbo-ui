import { captcha } from '@/api/user';
import { Captcha } from '@/api/user.interface';
import {
  atom,
  atomFamily,
  selector,
  selectorFamily,
  useSetRecoilState,
} from 'recoil';

const namespace = 'user';

export const captchaState = atom({
  key: `${namespace}:captcha`,
  default: {} as Captcha,
});

export const refreshCaptchaIdState = atomFamily({
  key: `${namespace}:captcha:refresh`,
  default: 0,
});

export const captchaQuery = selectorFamily({
  key: `${namespace}:captcha:query`,
  get:
    (id) =>
    async ({ get }) => {
      get(refreshCaptchaIdState(id));
      const res = await captcha();
      return res.data;
    },
});

export const useRefreshCaptcha = (id: number) => {
  const setCaptchaId = useSetRecoilState(refreshCaptchaIdState(id));
  return () => {
    setCaptchaId((id) => id + 1);
  };
};
