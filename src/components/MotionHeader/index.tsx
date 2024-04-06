import {
  Avatar,
  Badge,
  Button,
  Dropdown,
  Modal,
  Nav,
  Notification,
} from '@douyinfe/semi-ui';
import Header from '@douyinfe/semi-ui/lib/es/navigation/Header';
import { IconBell, IconLanguage } from '@douyinfe/semi-icons';
import { useNavigate } from 'react-router-dom';
import { useRenderMenu } from '@/hook/menu';
import { CurrentUserState } from '@/store/user';
import { useRecoilValue } from 'recoil';
import { useContext, useEffect, useState } from 'react';
import useAuthApi from '@/api/system/auth';
import * as local from '@/util/local';
import * as headers from '@/util/headers';
import { SUPPORT_LOCALES } from './Locales';
import { GlobalRegistry } from '@designable/core';
import { TextWidget } from '@designable/react';
import TForm from '../TForm/TForm';
import { AppContext } from '@/context';
import { observer } from '@formily/reactive-react';
import { changePasswordColumns } from '@/pages/system/user/ChangePassword';
import _ from 'lodash';
import { IconTheme } from '../Icon';
import Message from './MessageScrolling';
import useDicApi, { Dic } from '@/api/system/dic';
import useMessageApi from '@/api/message/message';
import './styles.less';

const MotionHeader = observer(() => {
  const app = useContext(AppContext);
  const { userRoutes, selectTopKey } = app;
  const [unreadMessageCount, setUnreadMessageCount] = useState<
    number | undefined
  >();
  const authApi = useAuthApi();
  const dicApi = useDicApi();
  const messageApi = useMessageApi();
  const currentUser = useRecoilValue(CurrentUserState);
  const navigate = useNavigate();

  const [messageTypes, setMessageTypes] = useState<Dic[]>([]);

  // 取depth = 0的菜单项进行渲染
  const topMenus = userRoutes.filter(
    (route) => route?.depth === 0 || route?.code === 'home',
  );
  const renderMenu = useRenderMenu();

  useEffect(() => {
    dicApi.tree({ entity: { code: 'message_type' } }).then((res) => {
      const { code, data } = res;
      if (code === 200 && data.length > 0) {
        const messageType = data[0].children as Dic[];
        setMessageTypes(messageType);
      }
    });
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
    <Header className="h-16 w-[100%]">
      <Nav
        mode="horizontal"
        selectedKeys={(selectTopKey && [selectTopKey]) || []}
        style={{ height: '100%' }}
      >
        <Nav.Header text="Turbo" />
        {renderMenu(topMenus, 'top', app)}
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
                <Dropdown.Item
                  onClick={() => {
                    const from = TForm.open({
                      mode: 'simply',
                      title: '修改密码',
                      columns: changePasswordColumns,
                      size: 'small',
                      immediateVisible: false,
                      onOk(formContext) {
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
                              local.set(
                                headers.Authentication,
                                data.token.tokenValue,
                              );
                            } else {
                              Notification.error({
                                position: 'top',
                                content: message,
                              });
                            }
                          });
                      },
                      onCancel(formContext) {
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
  );
});

export default MotionHeader;
