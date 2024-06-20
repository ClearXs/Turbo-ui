import useAuthApi from '@/api/system/auth';
import { CurrentUserRouteState } from '@/store/menu';
import _ from 'lodash';
import { useCallback } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { findRoute } from './util';
import { ErrorState } from '@/store/error';
import { MenuTree } from '@/api/system/menu';
import { TurboRoute } from './AppRouter';
import { tryGetIcon } from '@/components/Icon';
import Preview from './routes';
import PageNotFound from '@/error/PageNotFound';

const SKIP_PATH_LIST = ['/', '/home', '/profile', '/login'];

export default function useRouteHelper() {
  const setError = useSetRecoilState(ErrorState);

  const authApi = useAuthApi();
  const [userRoutes, setUserRouters] = useRecoilState(CurrentUserRouteState);

  const loadCurrentUserRoute = useCallback(() => {
    const { pathname } = window.location;
    if (_.isEmpty(userRoutes)) {
      authApi.getCurrentUserMenu().then((res) => {
        if (res.code === 200) {
          const routes = menuToRoutes(res.data || []);
          // 根据当前路径获取（可能是刷新的情况，去除/）设置选中的content tab 与 side tab
          // 如果没有找到则publish error（此时浏览器会提示错误信息并且展示error页面）
          const route = findRoute(pathname, routes);
          if (route || SKIP_PATH_LIST.indexOf(pathname) > -1) {
            setUserRouters(routes);
            // 去除error signal
            setError(undefined);
            return;
          }
        }
        // 发布菜单错误
        setError({ status: 404, message: `page ${pathname} not found` });
      });
    }
  }, []);

  /**
   * 菜单转换为路由对象
   * @param menus 菜单
   * @returns 路由对象
   */
  const menuToRoutes = useCallback(
    (menus: MenuTree[], topRouteKey?: string): TurboRoute[] => {
      if (_.isEmpty(menus)) {
        return [];
      }
      return menus
        .filter((m) => m.type !== 'BUTTON')
        .map((m) => {
          // 图标组件
          const IconComponent = tryGetIcon(m.icon as string);
          const route: TurboRoute = {
            id: String(m.id),
            element: findPageComponent(m),
            children: menuToRoutes(
              m.children,
              m.depth === 0 ? m.code : topRouteKey,
            ),
            path: m.route,
            code: m.code,
            alias: m.alias,
            sort: m.sort,
            icon: IconComponent,
            name: m.name,
            depth: m.depth,
            type: 'custom',
            clearable: true,
            topRouteKey: m.depth === 0 ? m.code : topRouteKey,
            attrs: m.attrs,
          };
          return route;
        });
    },
    [],
  );

  /**
   * find page component. this method will be first find 'PreviewRoutes'
   *
   * @param m the menu data
   */
  const findPageComponent = useCallback((m: MenuTree): any => {
    // find preview route
    const PageComponent = Preview.find((preview) => {
      // low code domain page
      if (m.type === 'PAGE') {
        return (
          m.route?.startsWith('/domain') && preview.path.startsWith('/domain')
        );
      }
      return preview.path === m.route;
    })?.element;
    // exclude parent route ('parent' has children )
    if (_.isEmpty(m.children) && _.isEmpty(PageComponent)) {
      return <PageNotFound />;
    }
    return PageComponent;
  }, []);

  return loadCurrentUserRoute;
}
