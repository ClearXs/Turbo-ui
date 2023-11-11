import { Nav, Image } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import Brand from '../../../public/vite.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItemProps } from '@douyinfe/semi-ui/lib/es/navigation';
import { TurboRoute } from '@/router/router';
import { useAddUserMenu } from '@/hook/menu';

/**
 * 把router渲染称组件
 * @param userRouters routers
 * @param render 函数
 * @returns tsx 组件
 */
function renderMenu<T>(
  userRouters: TurboRoute[],
  render: (router: TurboRoute) => T,
  sub: string = 'children',
): T[] {
  // 过滤router中属性为'hide'的路由
  return userRouters
    .filter((router) => {
      // 过滤router.attribute属性中存在hide数据
      return (router.attribute || []).findIndex((attr) => attr === 'hide') < 0;
    })
    .map((router) => {
      const r: T = render(router);
      if (router.children) {
        r[sub] = renderMenu(router.children as TurboRoute[], render);
      }
      return r;
    }) as T[];
}

function allowRenderNav(navItems: NavItemProps[]): boolean {
  return (
    navItems.filter((item) => {
      return item.route?.type !== 'system';
    }).length > 0
  );
}

const Sidebar: React.FC<{ routes: TurboRoute[] }> = ({ routes }) => {
  const navigate = useNavigate();
  const addUserMenuTab = useAddUserMenu();
  useEffect(() => {
    navigate('/home');
  }, []);
  const [selectRoute, setSelectRoute] = useState<React.ReactText>('/home');
  let navItems = renderMenu(
    routes,
    (route) => {
      return {
        itemKey: route.code,
        text: route.name,
        route,
        onClick: ({ itemKey }) => {
          navigate(itemKey as string);
          addUserMenuTab(route);
        },
      } as NavItemProps;
    },
    'items',
  );
  return (
    <Sider>
      {allowRenderNav(navItems) && (
        <Nav
          style={{ height: '100%', alignItems: 'center' }}
          items={navItems}
          defaultSelectedKeys={[selectRoute]}
          onSelect={(data) => {
            setSelectRoute(data.itemKey);
          }}
          header={{
            logo: <Image src={Brand} className="h-6 w-6" />,
            text: 'ClearX',
          }}
          footer={{
            collapseButton: true,
          }}
        />
      )}
    </Sider>
  );
};

export default Sidebar;
