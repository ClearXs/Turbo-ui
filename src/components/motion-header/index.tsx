import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Nav,
  Notification,
} from '@douyinfe/semi-ui';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect, useMemo, useState } from 'react';
import useAuthApi from '@/api/system/auth';
import * as auth from '@/util/auth';
import { SUPPORT_LOCALES } from './Locales';
import { TextWidget } from '@clearx/designable-react';
import UniForm from '../uni-form/UniForm';
import { changePasswordColumns } from '@/pages/system/user/ChangePassword';
import _ from 'lodash';
import { IconTheme } from '../icon';
import Message from './MessageScrolling';
import useDicApi, { Dic } from '@/api/system/dic';
import useMessageApi from '@/api/message/message';
import './styles.scss';
import Modular from '../modular/Modular';
import { useAuth } from '@/hook/useAuth';
import { changeTheme } from '@/theme';
import UserMenu from '@/components/menu';

import logo from '../../../public/favicon.png';
import useStore from '@/hook/useStore';
import { observer } from 'mobx-react';
import { TurboRoute } from '@/route/AppRouter';

const MotionHeader = () => {
  const { app, user, route } = useStore();
  const { selectTopKey } = app;
  const [unreadMessageCount, setUnreadMessageCount] = useState<
    number | undefined
  >();
  const authApi = useAuthApi();
  const dicApi = useDicApi();
  const messageApi = useMessageApi();
  const navigate = useNavigate();

  const [messageTypes, setMessageTypes] = useState<Dic[]>([]);

  const authentication = useAuth();

  // 取depth = 0的菜单项进行渲染
  // const topMenus = userRoutes.filter((route) => route?.depth === 0);
  const topMenus = useMemo(() => {
    const depthOf = (
      routes: TurboRoute[] = [],
      depth: number,
    ): TurboRoute[] => {
      return routes.flatMap((route) => {
        if (route.depth === 0) {
          return [route];
        } else {
          return (route.children && depthOf(route.children, depth)) || [];
        }
      });
    };

    return depthOf(route.userRoutes, 0).filter((r) => r.code !== 'profile');
  }, [route.userRoutes]);

  useEffect(() => {
    authentication &&
      dicApi.tree({ entity: { code: 'message_type' } }).then((res) => {
        const { code, data } = res;
        if (code === 200 && data.length > 0) {
          const messageType = data[0].children as Dic[];
          setMessageTypes(messageType);
        }
      });
    authentication &&
      messageApi
        .currentUserMessageCount({ entity: { messageStatus: 'UNREAD' } })
        .then((res) => {
          const { code, data } = res;
          if (code === 200) {
            setUnreadMessageCount(data);
          }
        });
  }, []);

  return (
    <Header className="h-14 w-[100%]">
      <Nav
        mode="horizontal"
        selectedKeys={(selectTopKey && [selectTopKey]) || []}
        style={{ height: '100%' }}
      >
        <div
          onClick={() => {
            app.setSelectTopKey('home');
            navigate('/home');
          }}
          className="cursor-pointer"
        >
          <Nav.Header
            text="Turbo"
            logo={<img src={logo} height={24} width={24}></img>}
          />
        </div>
        <UserMenu routes={topMenus} source="top" />
        <Nav.Footer>
          <Dropdown
            key="message"
            trigger="hover"
            style={{ overflowY: 'hidden' }}
            render={
              <Message
                messageTypes={messageTypes}
                onReload={() => {
                  messageApi.currentUserMessageCount({
                    entity: { messageStatus: 'UNREAD' },
                  });
                }}
              />
            }
          >
            <Badge type="danger" count={unreadMessageCount}>
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
                <Dropdown.Item
                  active={app.theme === 'light'}
                  onClick={() => {
                    app.changeTheme('light');
                    changeTheme('light');
                  }}
                >
                  默认
                </Dropdown.Item>
                <Dropdown.Item
                  active={app.theme === 'dark'}
                  onClick={() => {
                    app.changeTheme('dark');
                    changeTheme('dark');
                  }}
                >
                  暗色
                </Dropdown.Item>
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
                {SUPPORT_LOCALES.map((local) => {
                  return (
                    <Dropdown.Item
                      type={
                        app.language === local.value ? 'primary' : 'tertiary'
                      }
                      active={app.language === local.value}
                      key={local.value}
                      onClick={(e) => {
                        app.changeLanguage(local.value);
                      }}
                    >
                      {local.label}
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
                <Dropdown.Item
                  onClick={() => {
                    const from = UniForm.open({
                      mode: 'simply',
                      title: '修改密码',
                      columns: changePasswordColumns,
                      modal: {
                        size: 'small',
                      },
                      immediateVisible: false,
                      onOk(formContext) {
                        const currentUser = user.currentUser;
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
                              Notification.success({
                                position: 'top',
                                content: message,
                              });
                              // 设置新token
                              auth.set(data.token?.tokenValue);
                            } else {
                              Notification.error({
                                position: 'top',
                                content: message,
                              });
                            }
                          });
                      },
                      onCancel() {
                        from.destroy();
                      },
                    });
                    from.open();
                  }}
                >
                  <TextWidget token={'headers.ChangePassword'} />
                </Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item
                  onClick={() => {
                    Modular.show({
                      title: '退出登录',
                      size: 'small',
                      content: '是否退出登陆❓',
                      onConfirm: () => {
                        authApi.logout().then((res) => {
                          if (res.code === 200 && res.data) {
                            // 1.清除token
                            auth.clear();
                            // 2.重定向s
                            navigate('/login');
                            // 3.清除用户路由
                            route.setRoutes([]);
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
            <Avatar
              color="orange"
              src={user.currentUser?.avatar}
              size="medium"
            />
          </Dropdown>
        </Nav.Footer>
      </Nav>
    </Header>
  );
};

export default observer(MotionHeader);
