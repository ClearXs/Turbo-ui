import { TurboRoute } from '@/route/AppRouter';
import { atom } from 'recoil';

const namespace = 'menu';

export const CurrentUserRouteState = atom({
  key: `${namespace}:current:router:state`,
  default: [] as TurboRoute[],
});
