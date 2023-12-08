import {
  Avatar,
  Button,
  Dropdown,
  Image,
  Modal,
  Nav,
  Notification,
} from '@douyinfe/semi-ui';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import IconTheme from '../Icon/IconTheme';
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useContentMenu, useFindUserRoute, useRenderMenu } from '@/hook/menu';
import { CurrentUserState } from '@/store/user';
import { useRecoilValue } from 'recoil';
import { useState } from 'react';
import useAuthApi from '@/api/system/auth';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import ChangePasswordForm from '@/pages/system/user/ChangePassword';
import Brand from '../../../public/vite.svg';
import { TurboRoute } from '@/router';
import { CurrentUserSelectTabState } from '@/store/menu';

const MotionHeader = () => {
  const authApi = useAuthApi();
  const findUserRoute = useFindUserRoute();
  const [addUserContentTab] = useContentMenu();
  const currentUser = useRecoilValue(CurrentUserState);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();

  // 取depth = 0的菜单项进行渲染
  const userRoutes = useLoaderData() as TurboRoute[];
  const topMenus = userRoutes.filter(
    (route) => route.depth === 0 || route.code === 'home',
  );
  const renderMenu = useRenderMenu();
  const selectTab = useRecoilValue(CurrentUserSelectTabState);

  return (
    <>
      <Header className="h-[8%] w-[100%]">
        <Nav
          mode="horizontal"
          selectedKeys={[selectTab]}
          style={{ height: '100%' }}
        >
          <Nav.Header
            logo={<Image src={Brand} className="h-6 w-6" />}
            text="Turbo"
          />
          {renderMenu(topMenus, 'top')}
          <Nav.Footer>
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
              trigger={'hover'}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item
                    onClick={() => {
                      navigate('/home');
                      const route = findUserRoute('home');
                      route && addUserContentTab(route, 'home');
                    }}
                  >
                    首页
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      const route = findUserRoute('profile');
                      route && addUserContentTab(route, selectTab);
                    }}
                  >
                    个人档案
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowChangePassword(true)}>
                    修改密码
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      Modal.confirm({
                        content: '是否退出登陆',
                        onOk: () => {
                          authApi.logout().then((res) => {
                            if (res.code === 200 && res.data) {
                              // 1.清除token
                              local.remove(headers.Authentication);
                              // 2.重定向
                              navigate('/login');
                            }
                            Notification.success({
                              position: 'top',
                              content: res.message,
                            });
                          });
                        },
                      });
                    }}
                  >
                    退出登陆
                  </Dropdown.Item>
                </Dropdown.Menu>
              }
              clickToHide
            >
              <Avatar color="orange" src={currentUser?.avatar} size="medium" />
            </Dropdown>
          </Nav.Footer>
        </Nav>
      </Header>
      {showChangePassword && (
        <ChangePasswordForm
          onOk={(formContext) => {
            if (currentUser === undefined) {
              Notification.error({
                position: 'top',
                content: '当前用户信息不存在!',
              });
              return;
            }
            const changePassword = formContext.getValues();
            authApi
              .changePassword(
                currentUser.userId,
                changePassword.rawPassword,
                changePassword.newPassword,
              )
              .then((res) => {
                const { code, data, message } = res;
                if (code === 200) {
                  Notification.success({ position: 'top', content: message });
                  setShowChangePassword(false);
                  // 设置新token
                  local.set(headers.Authentication, data.token.tokenValue);
                } else {
                  Notification.error({ position: 'top', content: message });
                }
              });
          }}
          onCancel={() => setShowChangePassword(false)}
        />
      )}
    </>
  );
};

export default MotionHeader;
