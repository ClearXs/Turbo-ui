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
import { CurrentUserRouteState } from './store/menu';
import { useEffect } from 'react';
import { getCurrentUserMenuApi } from './api/menu';
import { get } from './util/local';
import { Authentication } from './util/headers';
import { useLoaderData } from 'react-router-dom';
import { TurboRouter, menuToRouterObject } from './router/router';
import Sidebar from './components/Sidebar';
import MotionContent from './components/MotionContent';

export default function App(): React.ReactNode {
  const setUserRouters = useSetRecoilState(CurrentUserRouteState);
  useEffect(() => {
    getCurrentUserMenuApi().then((res) => {
      res.code === 200 && setUserRouters(menuToRouterObject(res.data || []));
    });
    // 重新加载组件需要重新考虑变更条件
  }, [get(Authentication)]);
  const userRoutes = useLoaderData() as TurboRouter[];
  const { Header, Footer, Content } = Layout;
  return (
    <Layout className="h-100vh w-100vw">
      <Sidebar routes={userRoutes} />
      <Layout>
        <Header className="h-16 w-[100%]">
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
                    <Dropdown.Item>个人信息</Dropdown.Item>
                    <Dropdown.Item>修改密码</Dropdown.Item>
                    <Dropdown.Item>退出登陆</Dropdown.Item>
                  </Dropdown.Menu>
                }
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
