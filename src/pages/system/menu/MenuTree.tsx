import useMenuApi, { MenuTree } from '@/api/system/menu';
import { Space, Tag } from '@douyinfe/semi-ui';
import Text from '@douyinfe/semi-ui/lib/es/typography/text';
import { MENU_TYPE } from '@/constant/menutype';
import { TreePanelApi } from '@/components/Tree/interface';
import { TreePanel } from '@/components/Tree';
import MenuHelper from './helper';
import useRoleMenuApi from '@/api/system/rolemenu';
import { useEffect, useState } from 'react';

const MenuTree: React.FC<{
  roleId?: string;
  getTreeApi: (api: TreePanelApi<MenuTree>) => void;
}> = ({ roleId, getTreeApi }) => {
  const roleMenuApi = useRoleMenuApi();
  const [menuIds, setMenuIds] = useState<string[]>([]);

  useEffect(() => {
    roleId &&
      roleMenuApi.list({ entity: { roleId } }).then((res) => {
        const { code, data } = res;
        if (code === 200) {
          setMenuIds(data.map((r) => r.menuId));
        }
      });
  }, []);

  return (
    <>
      <TreePanel
        columns={MenuHelper.getColumns()}
        initValues={menuIds}
        multiple
        first={false}
        useApi={useMenuApi}
        toolbar={{ showAdd: false }}
        operateBar={{ showEdit: false, showDelete: false }}
        expandAll
        getTreePanelApi={(treePanelApi) => {
          getTreeApi(treePanelApi);
        }}
        label={(tree) => {
          const type = MENU_TYPE.find((v) => v.value === tree.type);
          return (
            <Space>
              <Text>{tree.name}</Text>
              {type && <Tag color={type.tag}>{type.label}</Tag>}
            </Space>
          );
        }}
      />
    </>
  );
};

export default MenuTree;
