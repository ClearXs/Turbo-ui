import useStore from '@/hook/useStore';
import { TurboRoute } from '@/route/AppRouter';
import { Nav, Notification } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { observer } from 'mobx-react';
import { useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { createContentTab } from '@/components/motion-content/util';
import { HIDE, NEW_WINDOW } from '@/constant/menuAttributes';

export type UserMenuProps = {
  routes: TurboRoute[];
  source: 'top' | 'side';
  topMenuKey?: string;
};

const UserMenu: React.FC<UserMenuProps> = ({ routes, source, topMenuKey }) => {
  const navigate = useNavigate();
  const { app } = useStore();

  const render = useCallback(
    ({ routes, source, topMenuKey }: UserMenuProps): React.ReactNode => {
      // 过滤router中属性为'hide'的路由
      return routes
        .filter((route) => {
          // 过滤router.attribute属性中存在hide数据
          return !(route.attrs || []).includes(HIDE);
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
                  app.setSelectTopKey(route.topRouteKey!);
                  app.setSelectSideKey(route.code);
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
                  app.setSelectTopKey(sideMenu.topRouteKey!);
                  app.setSelectSideKey(sideMenu.code!);
                  // 创建content tabs
                  const newUserTabs = createContentTab(
                    app.userTabs,
                    sideMenu,
                    sideMenu.topRouteKey as string,
                  );
                  if (newUserTabs) {
                    app.setUserTabs(newUserTabs);
                  }
                  app.setSelectTabKey(sideMenu.code!);
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
                  {render({ routes: route.children || [], source, topMenuKey })}
                </Nav.Sub>
              );
            } else {
              return Tab;
            }
          }
        });
    },
    [],
  );

  const chosenSetMenu = useCallback(
    (route: TurboRoute, sideMenu: TurboRoute) => {
      app.selectTopKey = route.topRouteKey;
      if (route.depth! < sideMenu.depth!) {
        app.setSelectSideKey(route.code!);
      } else {
        app.setSelectSideKey(sideMenu.code!);
      }
    },
    [],
  );

  return render({ routes, source, topMenuKey });
};

export default observer(UserMenu);
