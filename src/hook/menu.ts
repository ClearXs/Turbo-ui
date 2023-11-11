import { TurboRoute } from '@/router/router';
import {
  CurrentUserMenuTabsState,
  CurrentUserSelectTabState,
  UserTab,
} from '@/store/menu';
import { newArray } from '@/util/utils';
import { useLoaderData } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

function useAddUserMenu() {
  const [userTabs, setUserMenuTabs] = useRecoilState(CurrentUserMenuTabsState);
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);

  const addUserMenuTab = (route: TurboRoute) => {
    // 设置用户选择的tab
    const hasTabIndex = userTabs.findIndex((tab) => tab.itemKey === route.path);
    if (hasTabIndex < 0) {
      // 添加user tab
      const newTabs = newArray<UserTab>();
      userTabs.map((tab) => newTabs.push(tab));
      newTabs.push({
        itemKey: route.code,
        path: route.path,
        icon: route.icon,
        tab: route.name,
        closable: true,
      });
      setUserMenuTabs(newTabs);
    }
    setSelectTab(route.path as string);
  };

  return addUserMenuTab;
}

function userFindUserMenu() {
  const routes = useLoaderData();
  const getUserRoute = (routeKey: string): TurboRoute | undefined => {
    const filterRoute = <T extends TurboRoute>(
      key: string,
      routes?: T[],
    ): TurboRoute | undefined => {
      for (const route of routes || []) {
        if (route.path === key) {
          return route;
        }
        const findRoute =
          route.children && filterRoute(key, route.children as TurboRoute[]);
        if (findRoute) {
          return findRoute;
        }
      }
    };
    return filterRoute(routeKey, routes as TurboRoute[]);
  };
  return getUserRoute;
}

export { useAddUserMenu, userFindUserMenu };
