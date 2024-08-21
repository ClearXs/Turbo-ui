import '@/pages/developer/editor';
import { Layout } from '@douyinfe/semi-ui';
import MotionContent from './components/motion-content';
import MotionHeader from './components/motion-header';
import { Suspense, useEffect, useMemo } from 'react';
import { GlobalRegistry } from '@designable/core';
import { SUPPORT_LOCALES } from './components/motion-header/Locales';
import { useLoaderData, useLocation } from 'react-router-dom';
import { TurboRoute } from './route/AppRouter';
import { observable } from '@formily/reactive';
import { findRoute } from './route/util';
import { AppContext } from './context';
import { observer } from '@formily/reactive-react';
import { UserTab } from './components/motion-content/interface';
import { createContentTab } from './components/motion-content/util';
import './locales';
import './theme/default.css';
import { useRecoilValue } from 'recoil';
import Error from './pages/Error';
import { ErrorState } from './store/error';
import _ from 'lodash';
import { CurrentUserRouteState } from './store/menu';

import SystemApp from '@/components/app';
import Loading from './pages/Loading';

export type AppProperty = {
  // 选择顶部菜单的key
  selectTopKey: string | undefined;
  // 选择侧边菜单的key
  selectSideKey: string | undefined;
  // 小tab栏
  userTabs: UserTab[];
  // 选中的小tab栏
  selectTabKey: string | undefined;
};

export default function App(): React.ReactNode {
  const error = useRecoilValue(ErrorState);
  const location = useLocation();
  const routes = useLoaderData() as TurboRoute[];
  const userRoutes = useRecoilValue(CurrentUserRouteState);

  const app = useMemo(() => {
    const { pathname } = location;
    const route = findRoute(pathname, userRoutes);
    const app: AppProperty = observable({
      selectTopKey: route ? route.topRouteKey || 'home' : 'home',
      selectSideKey: undefined,
      userTabs: [],
      selectTabKey: undefined,
    });
    return app;
  }, []);

  useEffect(() => {
    const supportLocales = SUPPORT_LOCALES.map((locales) => locales.value);
    if (!supportLocales.includes(GlobalRegistry.getDesignerLanguage())) {
      GlobalRegistry.setDesignerLanguage('zh-cn');
    }
    const { pathname } = location;
    const route = findRoute(pathname, routes);
    if (route) {
      app.selectTopKey = route.topRouteKey;
      app.selectSideKey = route.code;
      const newTabs = createContentTab(
        app.userTabs,
        route,
        route.topRouteKey as string,
      );
      if (newTabs) {
        app.userTabs = newTabs;
      }
      app.selectTabKey = route.code;
    }
  }, [location.pathname, userRoutes]);

  return error !== undefined ? (
    <Error />
  ) : (
    <Suspense fallback={<Loading />}>
      <AppLayout app={app} />
    </Suspense>
  );
}

const AppLayout: React.FC<{ app: AppProperty }> = observer(({ app }) => {
  return (
    <SystemApp>
      <Layout className="h-100vh w-100vw overflow-hidden">
        <AppContext.Provider value={app}>
          <MotionHeader />
          <MotionContent />
        </AppContext.Provider>
      </Layout>
    </SystemApp>
  );
});
