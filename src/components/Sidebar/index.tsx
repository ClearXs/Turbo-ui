import { Nav } from '@douyinfe/semi-ui';
import Sider from '@douyinfe/semi-ui/lib/es/layout/Sider';
import { useRenderMenu } from '@/hook/menu';
import { useRecoilValue } from 'recoil';
import {
  CurrentUserSidebarSelectTabState,
  CurrentUserSidebarMenusState,
} from '@/store/menu';
import _ from 'lodash';

const Sidebar = () => {
  const selectSideTab = useRecoilValue(CurrentUserSidebarSelectTabState);
  const renderMenu = useRenderMenu();
  const side = useRecoilValue(CurrentUserSidebarMenusState);

  return (
    <Sider className="w-[15%]">
      <Nav
        style={{ height: '100%', alignItems: 'center', width: '100%' }}
        selectedKeys={(selectSideTab && [selectSideTab]) || []}
      >
        {side && renderMenu(side.sideMenus, 'side', side.topMenuKey)}
        <Nav.Footer collapseButton={true} />
      </Nav>
    </Sider>
  );
};

export default Sidebar;
