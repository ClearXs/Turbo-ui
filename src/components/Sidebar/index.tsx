import { TurboRouter } from '@/router/router';
import { Nav, Image } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import Brand from '../../../public/vite.svg';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { NavItemProps } from '@douyinfe/semi-ui/lib/es/navigation';
import { useRecoilState, useSetRecoilState } from 'recoil';
import {
  CurrentUserSelectTabState,
  CurrentUserTabsState,
  UserTab,
} from '@/store/menu';
import { newArray } from '@/util/utils';

/**
 * 把router渲染称组件
 * @param userRouters routers
 * @param render 函数
 * @returns tsx 组件
 */
function renderMenu<T>(
  userRouters: TurboRouter[],
  render: (router: TurboRouter) => T,
  sub: string = 'children',
): T[] {
  return userRouters.map((router) => {
    const r: T = render(router);
    if (router.children) {
      r[sub] = renderMenu(router.children as TurboRouter[], render);
    }
    return r;
  }) as T[];
}

const Sidebar: React.FC<{ routes: TurboRouter[] }> = ({ routes }) => {
  const naviage = useNavigate();
  useEffect(() => {
    naviage('/home');
  }, []);
  const [selectRoute, setSelectRoute] = useState<React.ReactText>('/home');
  const [userTabs, setCurrentUserTabs] = useRecoilState(CurrentUserTabsState);
  const setSelectTab = useSetRecoilState(CurrentUserSelectTabState);
  const navItems = renderMenu(
    routes,
    (router) => {
      return {
        itemKey: router.path,
        text: router.name,
        onClick: ({ itemKey }) => {
          // 跳转
          naviage(itemKey as string);
          // 设置用户选择的tab
          const hasTabIndex = userTabs.findIndex(
            (tab) => tab.itemKey === itemKey,
          );
          if (hasTabIndex < 0) {
            // 添加user tab
            const newTabs = newArray<UserTab>();
            userTabs.map((tab) => newTabs.push(tab));
            newTabs.push({
              itemKey: router.path,
              icon: router.icon,
              tab: router.name,
              closable: true,
            });
            setCurrentUserTabs(newTabs);
          }
          setSelectTab(itemKey as string);
        },
      } as NavItemProps;
    },
    'items',
  );
  return (
    <Sider>
      {navItems.length > 0 && (
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
