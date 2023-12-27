import { NavigateFunction, useNavigate } from 'react-router-dom';
import { TurboRoute } from './AppRouter';
import _ from 'lodash';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import { Notification, Typography } from '@douyinfe/semi-ui';
import { useEffect, useMemo } from 'react';
import { useContentMenu } from '@/hook/menu';

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
  addUserContentTab: (
    route: TurboRoute,
    topMenuKey: string,
    navigateTo?: boolean,
  ) => void;
};

/**
 * 每一个route的{@link TurboRoute#intercept}属性的实现
 */
class InnerRouteInterceptor implements RouteInterceptor {
  constructor(private route: TurboRoute) {
    this.order = Number.MAX_VALUE;
  }
  order: number = Number.MAX_VALUE;

  intercept(context: InterceptorContext): boolean {
    return this.route.intercept?.(context.navigate) || true;
  }

  match(route: TurboRoute, path?: string): boolean {
    if (_.isEmpty(path)) {
      return false;
    }
    return _.isEqual(this.route.path, path) || false;
  }
}

/**
 * 全局的鉴权认证
 */
const AuthenticationInterceptor: RouteInterceptor = {
  order: -1,
  intercept: (context: InterceptorContext): boolean => {
    if (_.isEmpty(local.get(headers.Authentication))) {
      context.navigate('/login');
      Notification.error({
        content: (
          <Typography.Text>当前用户信息不存在,请重新登陆.</Typography.Text>
        ),
        position: 'top',
      });
      return false;
    }
    return true;
  },

  match: (route: TurboRoute, path?: string): boolean => {
    // 排除鉴权验证的route path
    const exclusive: string[] = ['/login'];
    if (_.isEmpty(path)) {
      return false;
    }
    return !exclusive.includes(path as string);
  },
};

const RouteChangedInterceptor: RouteInterceptor = {
  order: 0,
  intercept: (context: InterceptorContext): boolean => {
    context.addUserContentTab(
      context.route,
      context.route.topRouteKey as string,
      false,
    );
    return true;
  },
  match: (route: TurboRoute, path: string): boolean => {
    return _.isEqual(route.path, path);
  },
};

export const withInterceptorComponent = (
  route: TurboRoute,
  Element: React.ReactNode,
) => {
  return (): React.ReactNode => {
    const navigate = useNavigate();
    const addUserContentTab = useContentMenu();
    const interceptor = useMemo(() => {
      return [
        AuthenticationInterceptor,
        RouteChangedInterceptor,
        new InnerRouteInterceptor(route),
      ].sort((a, b) => {
        return a.order < b.order;
      });
    }, []);

    useEffect(() => {
      const { pathname } = window.location;
      for (const intcp of interceptor) {
        const nextExecute =
          intcp.match(route, pathname) &&
          intcp.intercept({
            route,
            navigate,
            addUserContentTab,
          });
        if (!nextExecute) {
          break;
        }
      }
    }, []);
    return Element;
  };
};
