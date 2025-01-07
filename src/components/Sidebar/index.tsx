import { Nav } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import _ from 'lodash';
import { TurboRoute } from '@/route/AppRouter';
import useStore from '@/hook/useStore';
import UserMenu from '@/components/menu';
import { observer } from 'mobx-react';
import { find } from '@/route/shared';

const Sidebar = () => {
  const { route, app } = useStore();
  const { selectTopKey, selectSideKey } = app;

  const topMenu = find(route.userRoutes, (r) => r.code === selectTopKey);
  const sideMenus = (topMenu?.children || []) as TurboRoute[];
  return (
    <Sider>
      <Nav
        style={{ height: '100%', alignItems: 'center', maxWidth: 200 }}
        selectedKeys={(selectSideKey && [selectSideKey]) || []}
      >
        <UserMenu routes={sideMenus} source="side" topMenuKey={selectTopKey} />
        <Nav.Footer collapseButton={true} />
      </Nav>
    </Sider>
  );
};

export default observer(Sidebar);
