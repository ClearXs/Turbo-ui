import { TurboRoute } from '@/router/router';
import { TabPaneProps } from '@douyinfe/semi-ui/lib/es/tabs';
import { atom } from 'recoil';

const namespace = 'menu';

export type UserTab = Omit<TabPaneProps, 'className' | 'children' | 'style'>;

export const CurrentUserRouteState = atom({
  key: `${namespace}:current:router:state`,
  default: [] as TurboRoute[],
});

// 当前用户选择打开的tab标签
export const CurrentUserMenuTabsState = atom({
  key: `${namespace}:current:user:menu:tabs`,
  default: [] as UserTab[],
});

// 当前用户选择的tab标签
export const CurrentUserSelectTabState = atom({
  key: `${namespace}:current:user:tabs:select`,
  default: '/home',
});
