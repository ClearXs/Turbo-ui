import { Layout } from '@douyinfe/semi-ui';
import './theme/default.css';
import { useSetRecoilState } from 'recoil';
import { CurrentUserRouteState, CurrentUserSelectTabState } from './store/menu';
import { useEffect } from 'react';
import { get } from './util/local';
import { Authentication } from './util/headers';
import { useNavigate } from 'react-router-dom';
import { menuToRouterObject } from './router';
import MotionContent from './components/MotionContent';
import { useContentMenu, useFindUserRoute } from './hook/menu';
import useAuthApi from './api/system/auth';
import MotionHeader from './components/MotionHeader';

export default function App(): React.ReactNode {
  const authApi = useAuthApi();
  const findUserRoute = useFindUserRoute();
  const [addUserContentTab] = useContentMenu();
  const setUserRouters = useSetRecoilState(CurrentUserRouteState);
  const navigate = useNavigate();
  const setSelectContentTab = useSetRecoilState(CurrentUserSelectTabState);

  useEffect(() => {
    authApi.getCurrentUserMenu().then((res) => {
      res.code === 200 && setUserRouters(menuToRouterObject(res.data || []));
    });
    // 默认路由值home页面
    const route = findUserRoute('home');
    if (route) {
      // 1.加上content tabs的页签
      addUserContentTab(route, 'home');
      // 2.navigate to home
      navigate(route.path as string);
      // 3.设置content选中的面板
      setSelectContentTab(route.code as string);
    }
    // 重新加载组件需要重新考虑变更条件
  }, [get(Authentication)]);

  return (
    <Layout className="h-100vh w-100vw">
      <MotionHeader />
      <MotionContent />
    </Layout>
  );
}
