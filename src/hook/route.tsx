// route相关的hook操作，包括route的获取即变换等等
import useAuthApi from '@/api/system/auth';
import { MenuTree } from '@/api/system/menu';
import { importIcon } from '@/components/Icon/shared';
import { TurboRoute } from '@/route/AppRouter';
import { CurrentUserRouteState, MenuErrorState } from '@/store/menu';
import { isEmpty } from '@/util/utils';
import _ from 'lodash';
import { Suspense, lazy, useContext, useMemo } from 'react';
import { useRecoilState, useSetRecoilState } from 'recoil';
import { useLottie } from 'lottie-react';
import ClockLoading from '@/lottie/ClockLoading.json';
import Loading from '@/pages/Loading';
import { findRoute } from '@/route/util';
import { RouteContext } from '@/route/context';

const PageComponents = import.meta.glob('../pages/**/index.tsx');

const getInnerPageComponent = (route: string) => {
  const findPage = Object.keys(PageComponents).find((pageName) => {
    return pageName.match(route);
  });
  if (findPage) {
    return slowLazy(PageComponents[findPage]());
  }
  return undefined;
};

export const slowLazy = (component: any, delay: number = 1000) => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve(component);
    }, delay);
  });
};

// 组件懒加载方式进行导入
export const lazyLoader = (chunk: any, fullscreen: boolean = false) => {
  if (chunk) {
    const Module = lazy(chunk);
    return (
      <Suspense fallback={<PlaceholderLoading fullscreen={fullscreen} />}>
        <Module />
      </Suspense>
    );
  }
  return null;
};

const PlaceholderLoading: React.FC<{
  fullscreen: boolean;
}> = ({ fullscreen }) => {
  const { View } = useLottie({
    animationData: ClockLoading,
    style: { height: '20%', width: '20%' },
  });

  return fullscreen ? (
    <Loading />
  ) : (
    <div className="flex w-[100%] h-[100%] items-center justify-center">
      {View}
    </div>
  );
};

/**
 * 菜单转换为路由对象
 * @param menus 菜单
 * @returns 路由对象
 */
export const menuToRouterObject = (
  menus: MenuTree[],
  topRouteKey?: string,
): TurboRoute[] => {
  if (isEmpty(menus)) {
    return [];
  }
  return menus
    .filter((m) => m.type !== 'BUTTON')
    .map((m) => {
      let Component;
      if (m.type === 'PAGE') {
        Component = lazyLoader(() => import('@/pages/developer/domain'));
      } else {
        // 目标route组件
        Component = _.isEmpty(m.route)
          ? null
          : lazyLoader(() => getInnerPageComponent(m.route));
      }
      // 图标组件
      const IconComponent = importIcon(m.icon as string);
      const route: TurboRoute = {
        id: String(m.id),
        element: Component,
        children: menuToRouterObject(
          m.children,
          m.depth === 0 ? m.code : topRouteKey,
        ),
        path: m.route,
        code: m.code,
        alias: m.alias,
        sort: m.sort,
        icon: IconComponent && <IconComponent />,
        name: m.name,
        depth: m.depth,
        type: 'custom',
        clearable: true,
        topRouteKey: m.depth === 0 ? m.code : topRouteKey,
        attrs: m.attrs,
      };
      return route;
    });
};

const useLoadRoutes = () => {
  const authApi = useAuthApi();
  const [userRoutes, setUserRouters] = useRecoilState(CurrentUserRouteState);
  const setMenuError = useSetRecoilState(MenuErrorState);

  const systemRoutePath = useMemo(() => {
    return ['/', '/home', '/profile', '/login'];
  }, []);

  // 加载当前用户的route并通过recoil state进行设置组成当前用户的route集
  return () => {
    const { pathname } = window.location;
    if (_.isEmpty(userRoutes)) {
      authApi
        .getCurrentUserMenu()
        .then((res) => {
          if (res.code === 200) {
            const turboRoute = menuToRouterObject(res.data || []);
            // 根据当前路径获取（可能是刷新的情况，去除/）设置选中的content tab 与 side tab
            // 如果没有找到则publish error（此时浏览器会提示错误信息并且展示error页面）
            const route = findRoute(pathname, turboRoute);
            if (route || systemRoutePath.indexOf(pathname) > -1) {
              setUserRouters(turboRoute);
              // 去除error signal
              setMenuError(undefined);
              return;
            }
          }
          // 发布菜单错误
          setMenuError(new Error(`page ${pathname} not found`));
        })
        .catch((error) => {
          setMenuError(error);
        });
    }
  };
};

const useRoute = () => {
  const route = useContext(RouteContext);
  return route?.current;
};

const useBackRoute = () => {
  const route = useContext(RouteContext);
  return route?.back;
};

export { useRoute, useBackRoute, useLoadRoutes };
