// route相关的hook操作，包括route的获取即变换等等
import useAuthApi from '@/api/system/auth';
import { MenuTree } from '@/api/system/menu';
import { importIcon } from '@/components/Icon/shared';
import { TurboRoute } from '@/route/AppRouter';
import { CurrentUserRouteState, MenuErrorState } from '@/store/menu';
import { isEmpty } from '@/util/utils';
import { Skeleton } from '@douyinfe/semi-ui';
import _ from 'lodash';
import { Suspense, lazy, useMemo } from 'react';
import { useSetRecoilState } from 'recoil';
import { findRoute } from './menu';

const PageComponents = import.meta.glob('../pages/**/index.tsx');

const getInnerPageComponent = (route: string) => {
  const findPage = Object.keys(PageComponents).find((pageName) => {
    return pageName.match(route);
  });
  if (findPage) {
    return PageComponents[findPage];
  } else {
    return () => Promise.resolve(<></>);
  }
};
// 组件懒加载方式进行导入
export const lazyLoader = (Module: React.ReactNode) => {
  return (
    <Suspense
      fallback={
        <Skeleton>
          <div>
            <Skeleton.Title
              style={{ width: 120, marginBottom: 12, marginTop: 12 }}
            />
            <Skeleton.Paragraph style={{ width: 240 }} rows={3} />
          </div>
        </Skeleton>
      }
    >
      {Module}
    </Suspense>
  );
};

/**
 * 菜单转换为路由对象
 * @param menus 菜单
 * @returns 路由对象
 */
export const menuToRouterObject = (
  menus: MenuTree[],
  topRouteKey?: string,
): TurboRoute[] => {
  if (isEmpty(menus)) {
    return [];
  }
  return menus
    .filter((m) => m.type !== 'BUTTON')
    .map((m) => {
      /* @vite-ignore */
      // 目标route组件
      const Module = lazy(getInnerPageComponent(m.route));
      const Component = _.isEmpty(m.route) ? null : lazyLoader(<Module />);
      // 图标组件
      const IconComponent = importIcon(m.icon as string);
      return {
        id: String(m.id),
        element: Component,
        children: menuToRouterObject(
          m.children,
          m.depth === 0 ? m.code : topRouteKey,
        ),
        path: m.route,
        code: m.code,
        alias: m.alias,
        sort: m.sort,
        icon: IconComponent && <IconComponent />,
        name: m.name,
        depth: m.depth,
        type: 'custom',
        clearable: true,
        topRouteKey: m.depth === 0 ? m.code : topRouteKey,
        attrs: m.attrs,
      } as TurboRoute;
    });
};

const useTurboRoute = () => {
  const authApi = useAuthApi();
  const setUserRouters = useSetRecoilState(CurrentUserRouteState);
  const setMenuError = useSetRecoilState(MenuErrorState);

  const systemRoutePath = useMemo(() => {
    return ['/', '/home', '/profile', '/login'];
  }, []);

  // 加载当前用户的route并通过recoil state进行设置组成当前用户的route集
  const loadCurrentUserRoute = () => {
    const { pathname } = window.location;
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
  };

  return { loadCurrentUserRoute };
};

export default useTurboRoute;
