import useAuthApi from '@/api/system/auth';
import { User } from '@/api/system/user';
import _ from 'lodash';
import { atom } from 'recoil';

const namespace = 'user';

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
