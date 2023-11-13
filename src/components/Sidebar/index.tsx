import { Nav, Image, Notification } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import Brand from '../../../public/vite.svg';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TurboRoute } from '@/router/router';
import { useContentMenu } from '@/hook/menu';
import { useSetRecoilState } from 'recoil';
import { CurrentUserSelectTabState } from '@/store/menu';
import _ from 'lodash';

const Sidebar: React.FC<{ routes: TurboRoute[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const [selectRoute, setSelectRoute] = useState<React.ReactText>('home');
  const [addUserContentTab] = useContentMenu();
  const setSelectContentTab = useSetRecoilState(CurrentUserSelectTabState);

  /**
   * 把router渲染称组件
   * @param userRouters routers
   * @param render 函数
   * @returns tsx 组件
   */
  const renderMenu = (userRouters: TurboRoute[]): React.ReactNode[] => {
    // 过滤router中属性为'hide'的路由
    return userRouters
      .filter((router) => {
        // 过滤router.attribute属性中存在hide数据
        return (
          (router.attribute || []).findIndex((attr) => attr === 'hide') < 0
        );
      })
      .map((route) => {
        if (_.isEmpty(route.children)) {
          return (
            <Nav.Item
              itemKey={route.code}
              text={route.name}
              icon={route.icon}
              onClick={() => {
                if (!_.isEmpty(route.path)) {
                  navigate(route.path as string);
                  addUserContentTab(route);
                  setSelectContentTab(route.code as string);
                } else {
                  Notification.error({
                    position: 'top',
                    content: `菜单'${route.name}'未配置路由!`,
                  });
                }
              }}
            />
          );
        } else {
          return (
            <Nav.Sub itemKey={route.code} text={route.name} icon={route.icon}>
              {renderMenu(route.children as TurboRoute[])}
            </Nav.Sub>
          );
        }
      });
  };
  return (
    <Sider>
      <Nav
        style={{ height: '100%', alignItems: 'center' }}
        defaultSelectedKeys={[selectRoute]}
        onSelect={(data) => {
          setSelectRoute(data.itemKey);
        }}
      >
        <Nav.Header
          logo={<Image src={Brand} className="h-6 w-6" />}
          text="ClearX"
        />
        {renderMenu(routes)}
        <Nav.Footer collapseButton={true} />
      </Nav>
    </Sider>
  );
};

export default Sidebar;
