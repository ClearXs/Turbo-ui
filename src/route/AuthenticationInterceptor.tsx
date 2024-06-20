import _ from 'lodash';
import * as constants from '@/util/constant';
import * as cookies from '@/util/cookies';
import * as auth from '@/util/auth';
import { InterceptorContext, RouteInterceptor } from './Interceptor';
import { Toast, Typography } from '@douyinfe/semi-ui';
import { TurboRoute } from './AppRouter';

/**
 * 全局鉴权认证
 */
export default {
  order: -1,
  intercept: (context: InterceptorContext): boolean => {
    // get and set token by cookies and local storage
    let authentication = auth.get();
    if (_.isEmpty(authentication)) {
      authentication = cookies.get(constants.Authentication, {
        path: '/oauth2/code/login',
      });
      auth.set(authentication);
    }
    // verify token is empty and is login rather decide path is login
    if (_.isEmpty(authentication) && context.route.path != '/login') {
      // not token to login
      context.navigate('/login');
      Toast.error({
        content: (
          <Typography.Text>当前用户信息不存在,请重新登陆!</Typography.Text>
        ),
      });
      return false;
    }
    return true;
  },
  match: (route: TurboRoute, path?: string): boolean => {
    // 排除鉴权验证的route path
    const exclusive: string[] = [''];
    if (_.isEmpty(path)) {
      return false;
    }
    return !exclusive.includes(path as string);
  },
} as RouteInterceptor;
