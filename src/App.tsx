import {
  Layout,
  Button,
  Avatar,
  Dropdown,
  Divider,
  Input,
} from '@douyinfe/semi-ui';
import { IconBell, IconLanguage, IconSearch } from '@douyinfe/semi-icons';
import IconTheme from './components/Icon/IconTheme';
import './theme/default.css';
import { useSetRecoilState } from 'recoil';
import { CurrentUserRouteState, CurrentUserSelectTabState } from './store/menu';
import { useEffect } from 'react';
import { get } from './util/local';
import { Authentication } from './util/headers';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { TurboRoute, menuToRouterObject } from './router/router';
import Sidebar from './components/Sidebar';
import MotionContent from './components/MotionContent';
import { useContentMenu, useFindUserRoute } from './hook/menu';
import useAuthApi from './api/auth';

export default function App(): React.ReactNode {
  const authApi = useAuthApi();
  const findUserRoute = useFindUserRoute();
  const [addUserContentTab] = useContentMenu();
  const setUserRouters = useSetRecoilState(CurrentUserRouteState);
  const navigate = useNavigate();
  const setSelectContentTab = useSetRecoilState(CurrentUserSelectTabState);
  const userRoutes = useLoaderData() as TurboRoute[];

  useEffect(() => {
    authApi.getCurrentUserMenu().then((res) => {
      res.code === 200 && setUserRouters(menuToRouterObject(res.data || []));
    });
    // 默认路由值home页面
    const route = findUserRoute('home');
    if (route) {
      // 1.加上content tabs的页签
      addUserContentTab(route);
      // 2.navigate to home
      navigate(route.path as string);
      // 3.设置content选中的面板
      setSelectContentTab(route.code as string);
    }
    // 重新加载组件需要重新考虑变更条件
  }, [get(Authentication)]);

  const { Header, Footer } = Layout;
  return (
    <Layout className="h-100vh w-100vw">
      <Sidebar routes={userRoutes} />
      <Layout>
        <Header className="h-16 w-[100%] bg-slate-50">
          <div className="flex items-center h-[100%]">
            <div className="max-w-lg ml-10">
              <Input
                prefix={<IconSearch />}
                showClear
                placeholder="输入内容,快捷获取"
              />
            </div>
            <div className="ml-auto mr-10">
              <Dropdown
                trigger="click"
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item type="primary">默认</Dropdown.Item>
                    <Dropdown.Item>暗色</Dropdown.Item>
                  </Dropdown.Menu>
                }
                clickToHide
              >
                <Button
                  theme="borderless"
                  icon={<IconTheme size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                >
                  主题
                </Button>
              </Dropdown>
              <Dropdown
                trigger="click"
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item type="primary">中文</Dropdown.Item>
                    <Dropdown.Item>English</Dropdown.Item>
                    <Dropdown.Item>日本語</Dropdown.Item>
                  </Dropdown.Menu>
                }
                clickToHide
              >
                <Button
                  theme="borderless"
                  icon={<IconLanguage size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                >
                  国际化
                </Button>
              </Dropdown>
              <Button
                theme="borderless"
                icon={<IconBell size="large" />}
                style={{
                  color: 'var(--semi-color-text-2)',
                  marginRight: '12px',
                }}
              >
                消息
              </Button>
              <Dropdown
                trigger={'click'}
                render={
                  <Dropdown.Menu>
                    <Dropdown.Item
                      onClick={() => {
                        const route = findUserRoute('profile');
                        route && addUserContentTab(route);
                      }}
                    >
                      个人档案
                    </Dropdown.Item>
                    <Dropdown.Item>修改密码</Dropdown.Item>
                    <Dropdown.Item>退出登陆</Dropdown.Item>
                  </Dropdown.Menu>
                }
                clickToHide
              >
                <Avatar color="orange" size="small">
                  YJ
                </Avatar>
              </Dropdown>
            </div>
          </div>
        </Header>
        <MotionContent />
        <Footer className="h-12">
          <aside className="flex items-center flex-col">
            <Divider />
            <p className="text-base text-center max-h-max">
              Copyright © 2023 - All right reserved by uno ltd.
            </p>
          </aside>
        </Footer>
      </Layout>
    </Layout>
  );
}
