import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import Error from '@/pages/error';
import { Suspense, lazy } from 'react';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import { isEmpty } from '@/util/utils';
import { useRecoilValue } from 'recoil';
import { CurrentUserRouteState } from '@/store/menu';
import { MenuTree } from '@/api/menu';
import { importIcon } from '@/components/Icon';

export type TurboRoute = RouteObject &
  Pick<MenuTree, 'code' | 'alias' | 'sort' | 'icon' | 'name' | 'depth'> & {
    type: 'system' | 'custom';
    attribute?: string[];
  };

// 组件懒加载方式进行导入
export const lazyLoader = (factory: () => Promise<any>) => {
  const Module = lazy(factory);
  return (
    <Suspense fallback={''}>
      <Module />
    </Suspense>
  );
};

/**
 * 菜单转换为路由对象
 * @param menus 菜单
 * @returns 路由对象
 */
export const menuToRouterObject = (menus: MenuTree[]): TurboRoute[] => {
  if (isEmpty(menus)) {
    return [];
  }
  return menus.map((m) => {
    return {
      id: String(m.id),
      /* @vite-ignore */
      element: lazyLoader(() => import(`../pages${m.route}`)),
      children: menuToRouterObject(m.children),
      path: m.route,
      code: m.code,
      alias: m.alias,
      sort: m.sort,
      icon: m.icon,
      name: m.name,
      depth: m.depth,
      type: 'custom',
    } as TurboRoute;
  });
};

const AppRouter: React.FC = () => {
  const userRoutes = useRecoilValue(CurrentUserRouteState);

  const renderRoutes = [
    {
      id: '/home',
      path: '/home',
      name: '首页',
      level: 2,
      element: lazyLoader(() => import('@/pages/home')),
      icon: importIcon('IconHome'),
      type: 'system',
    },
    {
      id: '/profile',
      path: '/profile',
      name: '个人档案',
      level: 2,
      element: lazyLoader(() => import('@/pages/profile')),
      type: 'system',
      attribute: ['hide'],
    },
    ...userRoutes,
  ];
  const routers = [
    {
      id: '/',
      path: '/',
      element: lazyLoader(() => import('@/App')),
      errorElement: <Error />,
      loader: () => {
        if (isEmpty(local.get(headers.Authentication))) {
          return redirect('/login');
        }
        return renderRoutes;
      },
      type: 'system',
      children: renderRoutes,
    },
    {
      id: '/login',
      path: '/login',
      element: lazyLoader(() => import('@/pages/login')),
      loader: () => {
        if (isEmpty(local.get(headers.Authentication))) {
          return '';
        }
        return redirect('/');
      },
      type: 'system',
    },
  ];
  return <RouterProvider router={createBrowserRouter(routers)} />;
};
export default AppRouter;
