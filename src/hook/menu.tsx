import { AppProperty } from '@/App';
import { createContentTab } from '@/components/MotionContent/util';
import { HIDE, NEW_WINDOW } from '@/constant/menuAttr';
import { TurboRoute } from '@/route/AppRouter';
import { Nav, Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

// router渲染称组件
const useRenderMenu = () => {
  const navigate = useNavigate();

  const chosenSetMenu = useMemo(() => {
    return (route: TurboRoute, sideMenu: TurboRoute, app: AppProperty) => {
      app.selectTopKey = route.topRouteKey;
      if (route.depth < sideMenu.depth) {
        app.selectSideKey = route.code;
      } else {
        app.selectSideKey = sideMenu.code;
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
    app: AppProperty,
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
            key={route.code}
            itemKey={route.code}
            text={route.name}
            icon={route.icon}
            onClick={() => {
              // TODO 需要考虑iframe内嵌的页面
              // const path = route.path;
              // home特殊处理
              if (route.code === 'home') {
                app.selectTopKey = route.topRouteKey;
                app.selectSideKey = route.code;
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
                chosenSetMenu(route, sideMenu, app);
                return;
              }
              // 判断是否打开新窗口
              if ((sideMenu.attrs || []).includes(NEW_WINDOW)) {
                chosenSetMenu(route, sideMenu, app);
                window.open(sideMenu.path);
              } else {
                app.selectTopKey = sideMenu.topRouteKey;
                app.selectSideKey = sideMenu.code;
                // 创建content tabs
                const newUserTabs = createContentTab(
                  app.userTabs,
                  sideMenu,
                  sideMenu.topRouteKey as string,
                );
                if (newUserTabs) {
                  app.userTabs = newUserTabs;
                }
                app.selectTabKey = sideMenu.code;
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
              <Nav.Sub
                key={route.code}
                itemKey={route.code}
                text={route.name}
                icon={route.icon}
              >
                {renderMenu(
                  route.children as TurboRoute[],
                  source,
                  app,
                  topMenuKey,
                )}
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

export { useRenderMenu };
