import { HIDE, NEW_WINDOW } from '@/constant/MenuAttr';
import { TurboRoute } from '@/route/AppRouter';
import {
  CurrentUserMenuTabsState,
  CurrentUserRouteState,
  CurrentUserSelectTabState,
  CurrentUserSidebarMenusState,
  CurrentUserSidebarSelectTabState,
  UserTab,
} from '@/store/menu';
import { newArray } from '@/util/utils';
import { Nav, Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { useEffect, useMemo } from 'react';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

/**
 * 从Routes中找到用户指定route code的route实例
 * by route key or route path
 * @param routeKeyOrPath route key or path
 * @param customRoutes 外部传递进行替换{@link useLoaderData}的值进行使用过滤
 */
export const findRoute = (
  routeKeyOrPath: string,
  routes: TurboRoute[] = [],
) => {
  const filterRoute = <T extends TurboRoute>(
    key: string,
    routes?: T[],
  ): TurboRoute | undefined => {
    for (const route of routes || []) {
      if (route.code === key) {
        return route;
      }
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

  return filterRoute(routeKeyOrPath, routes);
};

const useFindUserRoute = () => {
  const routes = useLoaderData();

  return (routeKeyOrPath: string) => {
    return findRoute(routeKeyOrPath, routes as TurboRoute[]);
  };
};

const useMenuItem = () => {
  const setSidebarSelectTab = useSetRecoilState(
    CurrentUserSidebarSelectTabState,
  );
  const setSidebarMenus = useSetRecoilState(CurrentUserSidebarMenusState);
  const userRoutes = useRecoilValue(CurrentUserRouteState);
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);

  /**
   * 添加主页面板用户快捷菜单tab（如果存在则不进行添加）
   * @param route route
   * @param topMenuKey 顶部菜单key
   */
  return (route: TurboRoute, topMenuKey: string) => {
    setSelectTab(topMenuKey);
    // 设置content tab选中项
    setSidebarSelectTab(route.code as string);
    // 设置侧边栏选中菜单项
    const topMenu = findRoute(topMenuKey, userRoutes);
    // 设置侧边栏菜单集合
    topMenu &&
      setSidebarMenus({
        topMenuKey: topMenu.code,
        sideMenus: topMenu.children as TurboRoute[],
      });
  };
};

// content区域的快捷菜单
const useContentMenu = () => {
  const [userTabs, setUserMenuTabs] = useRecoilState(CurrentUserMenuTabsState);
  const navigate = useNavigate();
  const setMenuItem = useMenuItem();
  const routes = useLoaderData();

  const pushContentTab = useMemo(() => {
    return (route: TurboRoute, topMenuKey: string) => {
      // 设置用户选择的tab
      const hasTabIndex = userTabs.findIndex(
        (tab) => tab.itemKey === route.code,
      );
      // 排除 '/'路径的content tab添加
      const newTabs = newArray<UserTab>();
      userTabs.map((tab) => newTabs.push(tab));
      if (hasTabIndex < 0 && route.path !== '/') {
        // 添加user tab
        newTabs.push({
          itemKey: route.code,
          path: route.path,
          icon: route.icon,
          tab: route.name,
          closable: route.clearable,
          topMenuKey,
        });
      }
      return newTabs;
    };
  }, []);

  useEffect(() => {
    const homeRoute = findRoute('/home', routes as TurboRoute[]);
    if (homeRoute) {
      const newTabs = pushContentTab(homeRoute, 'home');
      setUserMenuTabs(newTabs);
    }
  }, []);

  /**
   * 添加主页面板用户快捷菜单tab（如果存在则不进行添加）
   * @param route route
   * @param topMenuKey 顶部菜单key
   * @param navigateTo 是否进行跳转
   */
  return (
    route: TurboRoute,
    topMenuKey: string,
    navigateTo: boolean = true,
  ) => {
    const newTabs = pushContentTab(route, topMenuKey);
    setUserMenuTabs(newTabs);
    // 设置Menu项，包括顶部菜单以及侧边栏
    setMenuItem(route, topMenuKey);
    if (navigateTo) {
      // 跳转
      navigate(route.path as string);
    }
  };
};

// router渲染称组件
const useRenderMenu = () => {
  const navigate = useNavigate();
  const setMenuItem = useMenuItem();

  const chosenSetMenu = useMemo(() => {
    return (route: TurboRoute, sideMenu: TurboRoute) => {
      if (route.depth < sideMenu.depth) {
        setMenuItem(route, route.topRouteKey as string);
      } else {
        setMenuItem(sideMenu, route.topRouteKey as string);
      }
    };
  }, []);

  const tryRerenderMenu = useMemo(() => {
    // issue: top menu的侧边不存在路由时返回原先top menu不重新渲染菜单问题
    return (route: TurboRoute) => {
      const { pathname } = window.location;
      if (pathname === route.path) {
        setMenuItem(route, route.topRouteKey as string);
      }
    };
  }, []);

  /**
   * 把router渲染称组件
   * @param userRouters routers
   * @param render 函数
   * @param delve 是否需要继续渲染子集
   * @param source 渲染来源
   * @returns tsx 组件
   */
  const renderMenu = (
    userRouters: TurboRoute[],
    source: 'top' | 'side',
    topMenuKey?: string,
  ): React.ReactNode[] => {
    // 过滤router中属性为'hide'的路由
    return userRouters
      .filter((router) => {
        // 过滤router.attribute属性中存在hide数据
        return !(router.attrs || []).includes(HIDE);
      })
      .map((route) => {
        const Tab = (
          <Nav.Item
            itemKey={route.code}
            text={route.name}
            icon={route.icon}
            onClick={() => {
              // TODO 需要考虑iframe内嵌的页面
              // const path = route.path;
              // home特殊处理
              if (route.code === 'home') {
                tryRerenderMenu(route);
                navigate('/home');
                return;
              }
              // 1.确定是从侧边栏还是顶部菜单点击
              // 2.如果是顶部菜单点击，则默认选中该顶部菜单第一个
              // 3.如果不是则赋值当前选中
              let sideMenu;
              if (source === 'top') {
                const sidebarMenus = (route.children as TurboRoute[]) || [];
                // 默认选中第一条
                let deepSide = sidebarMenus;
                while (sideMenu == null) {
                  if (_.isEmpty(deepSide)) {
                    break;
                  }
                  // 没有下级则停止循环
                  if (_.isEmpty(deepSide[0].children)) {
                    sideMenu = deepSide[0];
                    break;
                  } else {
                    deepSide = deepSide[0].children as TurboRoute[];
                  }
                }
              } else if (source === 'side') {
                sideMenu = route;
              }
              // top menu没有配置侧边栏菜单
              if (_.isEmpty(sideMenu)) {
                Notification.error({
                  position: 'top',
                  content: `请配置菜单'${route.name}'的侧边栏菜单!`,
                });
                return;
              }

              // 配置的侧边栏菜单没有配置路由
              if (_.isEmpty(sideMenu.path)) {
                Notification.error({
                  position: 'top',
                  content: `菜单'${sideMenu.name}'未配置路由!`,
                });
                chosenSetMenu(route, sideMenu);
                return;
              }
              // 判断是否打开新窗口
              if ((sideMenu.attrs || []).includes(NEW_WINDOW)) {
                chosenSetMenu(route, sideMenu);
                window.open(sideMenu.path);
              } else {
                tryRerenderMenu(sideMenu);
                navigate(sideMenu.path as string);
              }
            }}
          />
        );
        if (_.isEmpty(route.children)) {
          return Tab;
        } else {
          if (source === 'side') {
            return (
              <Nav.Sub itemKey={route.code} text={route.name} icon={route.icon}>
                {renderMenu(route.children as TurboRoute[], source, topMenuKey)}
              </Nav.Sub>
            );
          } else {
            return Tab;
          }
        }
      });
  };

  return renderMenu;
};

const useClearCurrentUserMenuResources = () => {
  const setCurrentUserRoute = useSetRecoilState(CurrentUserRouteState);
  const setCurrentUserMenuTabs = useSetRecoilState(CurrentUserMenuTabsState);
  const setCurrentUserSelectTab = useSetRecoilState(CurrentUserSelectTabState);
  const setCurrentUserSidebarSelectTab = useSetRecoilState(
    CurrentUserSidebarSelectTabState,
  );
  const setCurrentUserSidebarMenus = useSetRecoilState(
    CurrentUserSidebarMenusState,
  );

  return () => {
    // 1.清除routes
    setCurrentUserRoute([]);
    // 2.清楚open tabs
    setCurrentUserMenuTabs([]);
    // 3.清除select tab
    setCurrentUserSelectTab(undefined);
    // 4.清除sidebar tab
    setCurrentUserSidebarSelectTab(undefined);
    // 5.sidebar菜单集
    setCurrentUserSidebarMenus(undefined);
  };
};

export {
  useFindUserRoute,
  useContentMenu,
  useRenderMenu,
  useClearCurrentUserMenuResources,
};
