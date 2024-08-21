import {
  NavigateFunction,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import React, { useEffect, useMemo } from 'react';
import * as auth from '@/util/auth';
import { useRecoilValue } from 'recoil';
import { CurrentUserRouteState } from '@/store/menu';
import { MenuTree } from '@/api/system/menu';
import { importIcon } from '@/components/icon/shared';
import _ from 'lodash';
import Home from '@/pages/home';
import Login from '@/pages/login';
import { withInterceptorComponent } from './Interceptor';
import Profile from '@/pages/profile';
import App from '@/App';
import useRouteHelper from './useRouteHelper';
import { useAuth } from '@/hook/auth';
import Loading from '@/pages/Loading';

export type TurboRoute = RouteObject &
  Pick<MenuTree, 'code' | 'alias' | 'sort' | 'name' | 'depth' | 'attrs'> & {
    // 菜单类型 'system' 系统默认菜单。 'custom'是自定义菜单由后端返回
    type: 'system' | 'custom';
    // 是否允许关闭
    clearable?: boolean;
    // icon
    icon?: React.ReactNode;
    // 当前路由所属于的顶部route，如果为undefined则为顶部菜单或者非关键菜单
    topRouteKey?: string;
    // 路由定义拦截器
    intercept?: (navigate: NavigateFunction) => boolean;
    // 子级
    children?: TurboRoute[];
  };

const AppRouter: React.FC = () => {
  const authentication = useAuth();
  const userRoutes = useRecoilValue(CurrentUserRouteState);
  const loadCurrentUserRoute = useRouteHelper();

  // 增强route功能
  const routerEnhancer = useMemo(() => {
    // 拦截器增强
    const interceptorTrait = (routes: TurboRoute[]): TurboRoute[] => {
      const newRoutes: TurboRoute[] = [];
      for (const route of routes) {
        const newRoute = { ...route };
        if (newRoute.element) {
          const InterceptorElement = withInterceptorComponent(
            newRoute,
            newRoute.element,
          );
          newRoute.element = <InterceptorElement />;
        }
        if (newRoute.children) {
          newRoute.children = interceptorTrait(
            newRoute.children as TurboRoute[],
          );
        }
        newRoutes.push(newRoute);
      }
      return newRoutes;
    };

    return (routes: TurboRoute[]): TurboRoute[] => {
      return interceptorTrait(routes);
    };
  }, []);

  useEffect(
    function loadUserRouteIfAuthNotEmpty() {
      if (!_.isEmpty(authentication) && _.isEmpty(userRoutes)) {
        loadCurrentUserRoute();
      }
    },
    [authentication],
  );

  const IconHomeComponent = useMemo(() => importIcon('IconHome'), []);
  const IconUserComponent = useMemo(() => importIcon('IconUser'), []);
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
      depth: 0,
      topRouteKey: 'home',
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
      attrs: ['hide'],
      topRouteKey: 'home',
    },
    ...userRoutes,
  ];
  const routers = [
    {
      id: '/',
      path: '/',
      element: <App />,
      loader: () => renderRoutes,
      type: 'system',
      children: renderRoutes,
      errorElement: <Loading />,
      intercept: (navigate: NavigateFunction) => {
        const authentication = auth.get();
        if (_.isEmpty(authentication)) {
          navigate('/login');
        } else {
          navigate('/home');
        }
        return false;
      },
    },
    {
      id: 'login',
      path: '/login',
      element: <Login />,
      intercept: (navigate: NavigateFunction) => {
        const authentication = auth.get();
        if (!_.isEmpty(authentication)) {
          navigate('/');
          return false;
        }
        return true;
      },
      type: 'system',
    },
  ];
  return (
    <RouterProvider
      router={createBrowserRouter(routerEnhancer(routers as TurboRoute[]))}
    />
  );
};

export default AppRouter;
