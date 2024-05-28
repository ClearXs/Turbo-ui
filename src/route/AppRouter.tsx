import {
  NavigateFunction,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import React, { useCallback, useEffect, useMemo } from 'react';
import * as auth from '@/util/auth';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { CurrentUserRouteState } from '@/store/menu';
import { MenuTree } from '@/api/system/menu';
import { importIcon, tryGetIcon } from '@/components/Icon/shared';
import _ from 'lodash';
import Home from '@/pages/home';
import Login from '@/pages/login';
import Loading from '../pages/Loading';
import { withInterceptorComponent } from './Interceptor';
import Profile from '@/pages/profile';
import App from '@/App';
import useAuthApi from '@/api/system/auth';
import { findRoute } from './util';
import Preview from './routes';
import PageNotFound from '@/error/PageNotFound';
import { ErrorState } from '@/store/error';
import { useAuth } from '@/hook/auth';

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
    children?: TurboRoute[];
  };

const AppRouter: React.FC = () => {
  const authApi = useAuthApi();
  const [userRoutes, setUserRouters] = useRecoilState(CurrentUserRouteState);
  const setError = useSetRecoilState(ErrorState);

  const authentication = useAuth();

  const systemRoutePath = useMemo(() => {
    return ['/', '/home', '/profile', '/login'];
  }, []);

  const loadCurrentUserRoute = useCallback(() => {
    const { pathname } = window.location;
    if (_.isEmpty(userRoutes)) {
      authApi
        .getCurrentUserMenu()
        .then((res) => {
          if (res.code === 200) {
            const routes = menuToRoutes(res.data || []);
            // 根据当前路径获取（可能是刷新的情况，去除/）设置选中的content tab 与 side tab
            // 如果没有找到则publish error（此时浏览器会提示错误信息并且展示error页面）
            const route = findRoute(pathname, routes);
            if (route || systemRoutePath.indexOf(pathname) > -1) {
              setUserRouters(routes);
              // 去除error signal
              setError(undefined);
              return;
            }
          }
          // 发布菜单错误
          setError({ status: 404, message: `page ${pathname} not found` });
        })
        .catch((error) => {
          setError({ status: 500, message: error });
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
      if (!_.isEmpty(authentication)) {
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
      errorElement: <Loading />,
      loader: () => renderRoutes,
      type: 'system',
      children: renderRoutes,
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
