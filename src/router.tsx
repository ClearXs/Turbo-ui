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
import { MenuTree } from '@/api/system/menu';
import { importIcon } from '@/components/Icon';
import _ from 'lodash';
import Home from '@/pages/home';
import Profile from '@/pages/profile';
import Login from '@/pages/login';
import { Skeleton } from '@douyinfe/semi-ui';
import App from '@/App';

const PageComponents = import.meta.glob('./pages/**/index.tsx');

const getInnerPageComponent = (route: string) => {
  const findPage = Object.keys(PageComponents).find((pageName) => {
    return pageName.match(route);
  });
  if (findPage) {
    return PageComponents[findPage];
  } else {
    return () => Promise.resolve(<Error />);
  }
};

export type TurboRoute = RouteObject &
  Pick<MenuTree, 'code' | 'alias' | 'sort' | 'name' | 'depth'> & {
    // 菜单类型 'system' 系统默认菜单。 'custom'是自定义菜单由后端返回
    type: 'system' | 'custom';
    // 菜单属性集合
    attribute?: string[];
    // 是否允许关闭
    clearable: boolean;
    icon?: React.ReactNode;
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
export const menuToRouterObject = (menus: MenuTree[]): TurboRoute[] => {
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
        children: menuToRouterObject(m.children),
        path: m.route,
        code: m.code,
        alias: m.alias,
        sort: m.sort,
        icon: IconComponent && <IconComponent />,
        name: m.name,
        depth: m.depth,
        type: 'custom',
        clearable: true,
      } as TurboRoute;
    });
};

const AppRouter: React.FC = () => {
  const userRoutes = useRecoilValue(CurrentUserRouteState);

  const IconHomeComponent = importIcon('IconHome');
  const IconUserComponent = importIcon('IconUser');
  const renderRoutes = [
    {
      id: '/home',
      code: 'home',
      path: '/home',
      name: '首页',
      level: 2,
      element: <Home />,
      icon: IconHomeComponent && <IconHomeComponent />,
      clearable: false,
      type: 'system',
    },
    {
      id: '/profile',
      code: 'profile',
      path: '/profile',
      name: '个人档案',
      level: 2,
      element: <Profile />,
      type: 'system',
      icon: IconUserComponent && <IconUserComponent />,
      clearable: true,
      attribute: ['hide'],
    },
    ...userRoutes,
  ];
  const routers = [
    {
      id: '/',
      path: '/',
      element: lazyLoader(<App />),
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
      id: 'login',
      path: '/login',
      element: <Login />,
      loader: () => {
        if (isEmpty(local.get(headers.Authentication))) {
          return '';
        }
        return redirect('/');
      },
      type: 'system',
    },
  ];
  return (
    <RouterProvider router={createBrowserRouter(routers, { basename: '/' })} />
  );
};
export default AppRouter;
