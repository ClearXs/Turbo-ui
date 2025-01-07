import { Layout } from '@douyinfe/semi-ui';
import MotionContent from './components/motion-content';
import MotionHeader from './components/motion-header';
import { Suspense, useEffect } from 'react';
import { GlobalRegistry } from '@clearx/designable-core';
import { useLocation } from 'react-router-dom';
import { findRoute } from './route/util';
import { createContentTab } from './components/motion-content/util';
import './locales';
import Error from './pages/Error';
import _ from 'lodash';
import SystemApp from '@/components/app';
import Loading from './pages/Loading';
import useStore from './hook/useStore';
import { useAuth } from './hook/useAuth';
import useRouteHelper from './route/useRouteHelper';
import useAuthApi from './api/system/auth';
import { observer } from 'mobx-react';
import { reaction } from 'mobx';
import { TurboRoute } from './route/AppRouter';

const App = () => {
  const location = useLocation();
  const authApi = useAuthApi();
  const { route, app, error, user } = useStore();
  const authentication = useAuth();
  const loadCurrentUserRoute = useRouteHelper();

  useEffect(
    function setLanguage() {
      GlobalRegistry.setDesignerLanguage(app.language);
    },
    [app.language],
  );

  useEffect(
    // 当刷新页面、或者页面回退或者前进时，重新设置导航相关的信息
    function whenLocationChangeResetNavigationInformation() {
      reaction(
        () => route.routes,
        (routes) => {
          if (routes.length > 0) {
            resetUserNavigation(routes);
          }
        },
      );

      const resetUserNavigation = (routes: TurboRoute[]) => {
        const { pathname } = location;
        const r = findRoute(pathname, routes);
        if (r) {
          app.setSelectTopKey(r.topRouteKey!);
          app.setSelectSideKey(r.code!);
          const newTabs = createContentTab(app.userTabs, r, r.topRouteKey!);
          if (newTabs) {
            app.setUserTabs(newTabs);
          }
          app.setSelectTabKey(r.code!);
        }
      };
      if (route.routes.length > 0) {
        resetUserNavigation(route.routes);
      }
    },
    [location.pathname],
  );

  useEffect(
    function loadUserRouteIfAuthNotEmpty() {
      if (!_.isEmpty(authentication) && _.isEmpty(route.routes)) {
        loadCurrentUserRoute();
      }
    },
    [authentication],
  );

  useEffect(
    function loadCurrentUserIfNull() {
      if (_.isEmpty(user.currentUser)) {
        authApi.getCurrentUser().then((res) => {
          user.setCurrentUser(res.data);
        });
      }
    },
    [user.currentUser],
  );

  return error.error !== undefined ? (
    <Error />
  ) : (
    <Suspense fallback={<Loading />}>
      <SystemApp>
        <Layout className="h-100vh w-100vw overflow-hidden">
          <MotionHeader />
          <MotionContent />
        </Layout>
      </SystemApp>
    </Suspense>
  );
};

export default observer(App);
