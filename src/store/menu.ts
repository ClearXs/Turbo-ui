import { TurboRoute } from '@/router';
import { TabPaneProps } from '@douyinfe/semi-ui/lib/es/tabs';
import { atom } from 'recoil';

const namespace = 'menu';

export type UserTab = Omit<TabPaneProps, 'className' | 'children' | 'style'> & {
  path: string;
  topMenuKey: string;
};

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
  default: 'home',
});

// 当前用户侧边栏选中的tab
export const CurrentUserSidebarSelectTabState = atom({
  key: `${namespace}:current:user:side:bar:select`,
  default: '',
});

// 当前用户sidebar菜单集
export const CurrentUserSidebarMenusState = atom<
  | {
      topMenuKey: string;
      sideMenus: TurboRoute[];
    }
  | undefined
>({
  key: `${namespace}:current:user:side:bar:menus`,
  default: undefined,
});
