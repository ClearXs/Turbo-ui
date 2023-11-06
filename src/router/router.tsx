import {
  RouteObject,
  RouterProvider,
  createBrowserRouter,
  redirect,
} from 'react-router-dom';
import Error from '@/pages/Erros';
import { Suspense, lazy } from 'react';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import { isEmpty } from '@/util/utils';
import { useRecoilValue } from 'recoil';
import { CurrentUserRouteState } from '@/store/menu';
import { MenuTree } from '@/api/menu';
import { IconHome } from '@douyinfe/semi-icons';

export type TurboRouter = RouteObject &
  Pick<MenuTree, 'code' | 'alias' | 'sort' | 'icon' | 'name' | 'level'> & {
    type: 'system' | 'custom' | null;
  };

// 组件懒加载方式进行导入
export const lazyLoader = (factory: () => Promise<any>) => {
  const Module = lazy(factory);
  return (
    <Suspense>
      <Module />
    </Suspense>
  );
};

/**
 * 菜单转换为路由对象
 * @param menus 菜单
 * @returns 路由对象
 */
export const menuToRouterObject = (menus: MenuTree[]): TurboRouter[] => {
  if (isEmpty(menus)) {
    return [];
  }
  return menus.map((m) => {
    return {
      /* @vite-ignore */
      element: lazyLoader(() => import(`../pages${m.path}`)),
      children: menuToRouterObject(m.children),
      path: m.path,
      code: m.code,
      alias: m.alias,
      sort: m.sort,
      icon: m.icon,
      name: m.name,
      level: m.level,
      type: 'custom',
    } as TurboRouter;
  });
};

const defaultRoutes = [
  {
    /* @vite-ignore */
    element: lazyLoader(() => import(`@/pages/home`)),
    path: '/home',
    code: 'home',
    alias: '首页',
    sort: 1,
    icon: <IconHome />,
    name: '首页',
    level: 1,
    type: 'custom',
  },
];

const AppRouter: React.FC = () => {
  const userRouter = useRecoilValue(CurrentUserRouteState);
  const routers = [
    {
      path: '/',
      element: lazyLoader(() => import('@/App')),
      errorElement: <Error />,
      loader: () => {
        if (isEmpty(local.get(headers.Authentication))) {
          return redirect('/login');
        }

        return userRouter;
      },
      type: 'system',
      children: userRouter,
    },
    {
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
