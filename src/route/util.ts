import { TurboRoute } from './AppRouter';

/**
 * 从Routes中找到用户指定route code的route实例
 * by route key or route path
 * @param routeKeyOrPath route key or path
 * @param customRoutes 外部传递进行替换{@link useLoaderData}的值进行使用过滤
 */
export const findRoute = (
  routeKeyOrPath: string,
  routes: TurboRoute[] = [],
) => {
  const filterRoute = <T extends TurboRoute>(
    key: string,
    routes?: T[],
  ): TurboRoute | undefined => {
    for (const route of routes || []) {
      if (route?.code === key) {
        return route;
      }
      if (route?.path === key) {
        return route;
      }
      const findRoute =
        route?.children && filterRoute(key, route?.children as TurboRoute[]);
      if (findRoute) {
        return findRoute;
      }
    }
  };

  return filterRoute(routeKeyOrPath, routes);
};
