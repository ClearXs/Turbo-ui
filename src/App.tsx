import '@/pages/developer/editor';
import { Layout } from '@douyinfe/semi-ui';
import MotionContent from './components/MotionContent';
import MotionHeader from './components/MotionHeader';
import { useEffect, useMemo } from 'react';
import { GlobalRegistry } from '@designable/core';
import { SUPPORT_LOCALES } from './components/MotionHeader/Locales';
import { useLoaderData, useLocation } from 'react-router-dom';
import { TurboRoute } from './route/AppRouter';
import { observable } from '@formily/reactive';
import { findRoute } from './route/util';
import { AppContext } from './context';
import { observer } from '@formily/reactive-react';
import { UserTab } from './components/MotionContent/interface';
import { createContentTab } from './components/MotionContent/util';
import './locales';
import './theme/default.css';

export type AppProperty = {
  // 当前用户route
  userRoutes: TurboRoute[];
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
  const userRoutes = useLoaderData() as TurboRoute[];
  const location = useLocation();

  const app = useMemo(() => {
    const { pathname } = location;
    const route = findRoute(pathname, userRoutes);
    const app: AppProperty = observable({
      userRoutes,
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
    const route = findRoute(pathname, app.userRoutes);
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
  }, [location]);

  return <AppLayout app={app} />;
}

const AppLayout: React.FC<{ app: AppProperty }> = observer(({ app }) => {
  return (
    <Layout className="h-100vh w-100vw overflow-hidden">
      <AppContext.Provider value={app}>
        <MotionHeader />
        <MotionContent />
      </AppContext.Provider>
    </Layout>
  );
});
