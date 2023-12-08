import { TurboRoute } from '@/router';
import {
  CurrentUserMenuTabsState,
  CurrentUserSelectTabState,
  CurrentUserSidebarMenusState,
  CurrentUserSidebarSelectTabState,
  UserTab,
} from '@/store/menu';
import { newArray } from '@/util/utils';
import { Nav, Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';
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
  const setSidebarSelectTab = useSetRecoilState(
    CurrentUserSidebarSelectTabState,
  );
  const navigate = useNavigate();
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);

  // 添加主页面板用户快捷菜单tab（如果存在则不进行添加）并进行跳转
  const addUserContentTab = (route: TurboRoute, topMenuKey: string) => {
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
        topMenuKey,
      });
      setUserMenuTabs(newTabs);
    }
    setSelectTab(topMenuKey);
    // 设置content tab 激活项
    setSidebarSelectTab(route.code as string);
    // 跳转
    navigate(route.path as string);
  };
  return [addUserContentTab];
}

const useRenderMenu = () => {
  const setSidebarMenus = useSetRecoilState(CurrentUserSidebarMenusState);
  const navigate = useNavigate();
  const [addUserContentTab] = useContentMenu();
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);

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
        return (
          (router.attribute || []).findIndex((attr) => attr === 'hide') < 0
        );
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
                navigate('/home');
                setSelectTab('home');
                return;
              }

              // 1.确定是从侧边栏还是顶部菜单点击
              // 2.如果是顶部菜单点击，则默认选中该顶部菜单第一个
              // 3.如果不是则赋值当前选中
              let exactTopKey;
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
                exactTopKey = route.code;
                // 赋值
                setSidebarMenus({
                  topMenuKey: route.code,
                  sideMenus: sidebarMenus,
                });
              } else if (source === 'side') {
                sideMenu = route;
                exactTopKey = topMenuKey;
              }
              if (_.isEmpty(sideMenu)) {
                navigate(route.path as string);
              } else {
                // 添加 快捷tab栏时，需要确定是由哪一个顶部菜单进行点击
                addUserContentTab(sideMenu, exactTopKey as string);
                if (_.isEmpty(sideMenu.path)) {
                  Notification.error({
                    position: 'top',
                    content: `菜单'${sideMenu.name}'未配置路由!`,
                  });
                }
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

export { useContentMenu, useFindUserRoute, useRenderMenu };
