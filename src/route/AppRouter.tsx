import {
  NavigateFunction,
  RouteObject,
  RouterProvider,
  createBrowserRouter,
} from 'react-router-dom';
import React, { useCallback } from 'react';
import { MenuTree } from '@/api/system/menu';
import _ from 'lodash';
import { withInterceptorComponent } from './Interceptor';
import routes from './routes';

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

const AppRouter = () => {
  const createInterceptorRoute = useCallback(
    (routes: TurboRoute[]): TurboRoute[] => {
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
          newRoute.children = createInterceptorRoute(newRoute.children);
        }
        newRoutes.push(newRoute);
      }
      return newRoutes;
    },
    [],
  );

  return (
    <RouterProvider
      router={createBrowserRouter(createInterceptorRoute(routes))}
    />
  );
};

export default AppRouter;
