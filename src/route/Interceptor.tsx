import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TurboRoute } from './AppRouter';
import _ from 'lodash';
import { useEffect, useMemo, useRef } from 'react';
import { RouteContext } from './context';
import { findRoute } from './util';
import AuthenticationInterceptor from './AuthenticationInterceptor';
import InnerRouteInterceptor from './InnerRouteInterceptor';
import useStore from '@/hook/useStore';

export type RouteInterceptor = {
  // 优先级
  order: number;

  /**
   * 拦截实现
   * @param route an turbo route
   * @param navigate navigate instance
   * @returns if true then invoke next interceptor
   */
  intercept: (context: InterceptorContext) => boolean;

  /**
   * 给定路径是否能够匹配当前 interceptor
   * @param path 当前路由路径
   * @returns 是否匹配结果
   */
  match: (route: TurboRoute, path: string) => boolean;
};

export type InterceptorContext = {
  route: TurboRoute;
  navigate: NavigateFunction;
};

export const withInterceptorComponent = (
  r: TurboRoute,
  Element: React.ReactNode,
) => {
  return (): React.ReactNode => {
    const navigate = useNavigate();
    const { route } = useStore();
    const backRoute = useRef<TurboRoute | undefined>(undefined);

    const location = window.location;
    const interceptor = useMemo(() => {
      return [AuthenticationInterceptor, new InnerRouteInterceptor(r)].sort(
        (a, b) => {
          return a.order - b.order;
        },
      );
    }, []);

    useEffect(() => {
      const { pathname } = window.location;
      for (const intcp of interceptor) {
        if (pathname === r.path) {
          const nextExecute =
            intcp.match(r, pathname) &&
            intcp.intercept({
              route: r,
              navigate,
            });
          if (!nextExecute) {
            break;
          }
        }
      }
      backRoute.current = findRoute(pathname, route.userRoutes || []);
    }, [location.pathname]);

    return (
      <RouteContext.Provider value={{ current: r, back: backRoute.current }}>
        {Element}
      </RouteContext.Provider>
    );
  };
};
