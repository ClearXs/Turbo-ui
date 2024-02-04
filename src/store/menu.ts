import { TurboRoute } from '@/route/AppRouter';
import { atom } from 'recoil';

const namespace = 'menu';

export const CurrentUserRouteState = atom({
  key: `${namespace}:current:router:state`,
  default: [] as TurboRoute[],
});

// 当系统运行过程中发生与菜单有关的错误通过该state进行设置（发布信号量至处理端进行处理）
export const MenuErrorState = atom<Error | undefined>({
  key: `${namespace}:menu:error`,
  default: undefined,
});
