import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Image,
  Modal,
  Nav,
  Notification,
  TabPane,
  Tabs,
} from '@douyinfe/semi-ui';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import IconTheme from '../Icon/IconTheme';
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { useLoaderData, useNavigate } from 'react-router-dom';
import { useClearCurrentUserMenuResources, useRenderMenu } from '@/hook/menu';
import { CurrentUserState } from '@/store/user';
import { useRecoilValue } from 'recoil';
import { useMemo, useState } from 'react';
import useAuthApi from '@/api/system/auth';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import ChangePasswordForm from '@/pages/system/user/ChangePassword';
import Brand from '../../../public/vite.svg';
import { TurboRoute } from '@/route/AppRouter';
import { CurrentUserSelectTabState } from '@/store/menu';
import { SUPPORT_LOCALES } from './Locales';
import { GlobalRegistry } from '@designable/core';
import { TextWidget } from '@designable/react';

const MotionHeader = () => {
  const authApi = useAuthApi();
  const currentUser = useRecoilValue(CurrentUserState);
  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);
  const navigate = useNavigate();
  const clearMenuResources = useClearCurrentUserMenuResources();

  // 取depth = 0的菜单项进行渲染
  const userRoutes = useLoaderData() as TurboRoute[];
  const topMenus = userRoutes.filter(
    (route) => route.depth === 0 || route.code === 'home',
  );
  const renderMenu = useRenderMenu();
  const selectTab = useRecoilValue(CurrentUserSelectTabState);

  const clearResources = useMemo(() => {
    return () => {
      clearMenuResources();
    };
  }, []);

  return (
    <>
      <Header className="h-16 w-[100%]">
        <Nav
          mode="horizontal"
          selectedKeys={[selectTab || '']}
          style={{ height: '100%' }}
        >
          <Nav.Header
            logo={<Image src={Brand} className="h-6 w-6" />}
            text="Turbo"
          />
          {renderMenu(topMenus, 'top')}
          <Nav.Footer>
            <Dropdown
              key="message"
              trigger="hover"
              clickToHide
              render={
                <div className="w-96 h-80 max-h-80 overflow-y-auto border-r-2">
                  <div className="w-[100%] h-[90%]">
                    <Tabs type="button" size="small">
                      <TabPane tab="文档" itemKey="1">
                        文档
                      </TabPane>
                      <TabPane tab="快速起步" itemKey="2">
                        快速起步
                      </TabPane>
                      <TabPane tab="帮助" itemKey="3">
                        帮助
                      </TabPane>
                    </Tabs>
                  </div>
                  <div className="w-[100%] h-[10%]">
                    <Button block theme="borderless" type="tertiary">
                      查看更多
                    </Button>
                  </div>
                </div>
              }
            >
              <Badge type="danger" count={2}>
                <Button
                  theme="borderless"
                  icon={<IconBell size="large" />}
                  style={{
                    color: 'var(--semi-color-text-2)',
                    marginRight: '12px',
                  }}
                >
                  <TextWidget token={'headers.Message'} />
                </Button>
              </Badge>
            </Dropdown>

            <Dropdown
              key="theme"
              trigger="hover"
              clickToHide
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
                <TextWidget token={'headers.Theme'} />
              </Button>
            </Dropdown>
            <Dropdown
              key="internationalization"
              trigger="hover"
              clickToHide
              render={
                <Dropdown.Menu>
                  {SUPPORT_LOCALES.map((locales) => {
                    return (
                      <Dropdown.Item
                        type={
                          GlobalRegistry.getDesignerLanguage() === locales.value
                            ? 'primary'
                            : 'tertiary'
                        }
                        active={
                          GlobalRegistry.getDesignerLanguage() === locales.value
                        }
                        key={locales.value}
                        onClick={(e) => {
                          GlobalRegistry.setDesignerLanguage(locales.value);
                        }}
                      >
                        {locales.label}
                      </Dropdown.Item>
                    );
                  })}
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
                <TextWidget token={'headers.Locales'} />
              </Button>
            </Dropdown>
            <Dropdown
              key={'profile'}
              trigger={'hover'}
              render={
                <Dropdown.Menu>
                  <Dropdown.Item onClick={() => navigate('/home')}>
                    <TextWidget token={'headers.Index'} />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item onClick={() => navigate('/profile')}>
                    <TextWidget token={'headers.Profile'} />
                  </Dropdown.Item>
                  <Dropdown.Item onClick={() => setShowChangePassword(true)}>
                    <TextWidget token={'headers.ChangePassword'} />
                  </Dropdown.Item>
                  <Dropdown.Divider />
                  <Dropdown.Item
                    onClick={() => {
                      Modal.confirm({
                        content: '是否退出登陆',
                        onOk: () => {
                          authApi.logout().then((res) => {
                            if (res.code === 200 && res.data) {
                              // 1.资源清理
                              clearResources();
                              // 2.清除token
                              local.remove(headers.Authentication);
                              // 3.重定向
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
                    <TextWidget token={'headers.Logout'} />
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
