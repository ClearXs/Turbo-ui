import { Nav } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import { useRenderMenu } from '@/hook/menu';
import _ from 'lodash';
import { TurboRoute } from '@/route/AppRouter';
import { useContext } from 'react';
import { AppContext } from '@/context';
import { observer } from '@formily/reactive-react';
import { useLoaderData } from 'react-router-dom';

const Sidebar = observer(() => {
  const app = useContext(AppContext);
  const { selectTopKey, selectSideKey } = app;

  const routes = useLoaderData() as TurboRoute[];
  const topMenu = routes.find((route) => route.code === selectTopKey);
  const sideMenus = (topMenu?.children || []) as TurboRoute[];
  const renderMenu = useRenderMenu();

  return (
    <Sider>
      <Nav
        style={{ height: '100%', alignItems: 'center', maxWidth: 200 }}
        selectedKeys={(selectSideKey && [selectSideKey]) || []}
      >
        {renderMenu(sideMenus, 'side', app, selectTopKey)}
        <Nav.Footer collapseButton={true} />
      </Nav>
    </Sider>
  );
});

export default Sidebar;
