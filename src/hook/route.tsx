// route相关的hook操作，包括route的获取即变换等等
import useAuthApi from '@/api/system/auth';
import { MenuTree } from '@/api/system/menu';
import { importIcon, tryGetIcon } from '@/components/Icon/shared';
import { TurboRoute } from '@/route/AppRouter';
import { CurrentUserRouteState, MenuErrorState } from '@/store/menu';
import { isEmpty } from '@/util/utils';
import _ from 'lodash';
import { useContext, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { findRoute } from '@/route/util';
import { RouteContext } from '@/route/context';
import PreviewRoutes from '@/route/routes';

const useLoadRoutes = () => {
  const authApi = useAuthApi();
  const [userRoutes, setUserRouters] = useRecoilState(CurrentUserRouteState);
  const setMenuError = useSetRecoilState(MenuErrorState);

  const systemRoutePath = useMemo(() => {
    return ['/', '/home', '/profile', '/login'];
  }, []);

  // 加载当前用户的route并通过recoil state进行设置组成当前用户的route集
  return () => {
    const { pathname } = window.location;
    if (_.isEmpty(userRoutes)) {
      authApi
        .getCurrentUserMenu()
        .then((res) => {
          if (res.code === 200) {
            const turboRoute = menuToRouterObject(res.data || []);
            // 根据当前路径获取（可能是刷新的情况，去除/）设置选中的content tab 与 side tab
            // 如果没有找到则publish error（此时浏览器会提示错误信息并且展示error页面）
            const route = findRoute(pathname, turboRoute);
            if (route || systemRoutePath.indexOf(pathname) > -1) {
              setUserRouters(turboRoute);
              // 去除error signal
              setMenuError(undefined);
              return;
            }
          }
          // 发布菜单错误
          setMenuError(new Error(`page ${pathname} not found`));
        })
        .catch((error) => {
          setMenuError(error);
        });
    }
  };
};

/**
 * 菜单转换为路由对象
 * @param menus 菜单
 * @returns 路由对象
 */
const menuToRouterObject = (
  menus: MenuTree[],
  topRouteKey?: string,
): TurboRoute[] => {
  if (isEmpty(menus)) {
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
        children: menuToRouterObject(
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
};

/**
 * find page component. this method will be first find 'PreviewRoutes'
 *
 * @param m the menu data
 */
const findPageComponent = (m: MenuTree): any => {
  // find preview route
  return PreviewRoutes.find((preview) => {
    // low code domain page
    if (m.type === 'PAGE') {
      return (
        m.route?.startsWith('/domain') && preview.path.startsWith('/domain')
      );
    }
    return preview.path === m.route;
  })?.element;
};

const useRoute = () => {
  const route = useContext(RouteContext);
  return route?.current;
};

const useBackRoute = () => {
  const route = useContext(RouteContext);
  return route?.back;
};

export { useRoute, useBackRoute, useLoadRoutes };
