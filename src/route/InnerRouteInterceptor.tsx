import _ from 'lodash';
import { TurboRoute } from './AppRouter';
import { InterceptorContext, RouteInterceptor } from './Interceptor';

/**
 * 每一个route的{@link TurboRoute#intercept}属性的实现
 */
export default class InnerRouteInterceptor implements RouteInterceptor {
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
