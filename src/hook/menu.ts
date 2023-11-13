import { TurboRoute } from '@/router/router';
import {
  CurrentUserMenuTabsState,
  CurrentUserSelectTabState,
  UserTab,
} from '@/store/menu';
import { newArray } from '@/util/utils';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilState, useSetRecoilState } from 'recoil';

// 从Routes中找到用户指定route code的route实例
function useFindUserRoute() {
  const routes = useLoaderData();
  return (routeKey: string): TurboRoute | undefined => {
    const filterRoute = <T extends TurboRoute>(
      key: string,
      routes?: T[],
    ): TurboRoute | undefined => {
      for (const route of routes || []) {
        if (route.code === key) {
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
}

// content区域的快捷菜单
function useContentMenu() {
  const [userTabs, setUserMenuTabs] = useRecoilState(CurrentUserMenuTabsState);
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);
  const navigate = useNavigate();

  // 添加主页面板用户快捷菜单tab（如果存在则不进行添加）并进行跳转
  const addUserContentTab = (route: TurboRoute) => {
    // 设置用户选择的tab
    const hasTabIndex = userTabs.findIndex((tab) => tab.itemKey === route.code);
    if (hasTabIndex < 0) {
      // 添加user tab
      const newTabs = newArray<UserTab>();
      userTabs.map((tab) => newTabs.push(tab));
      newTabs.push({
        itemKey: route.code,
        path: route.path,
        icon: route.icon,
        tab: route.name,
        closable: route.clearable,
      });
      setUserMenuTabs(newTabs);
    }
    // 设置content tab 激活项
    setSelectTab(route.code as string);
    // 跳转
    navigate(route.path as string);
  };
  return [addUserContentTab];
}

export { useContentMenu, useFindUserRoute };
