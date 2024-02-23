import { useRef, useState } from 'react';
import useRoleApi, { Role } from '@/api/system/role';
import TableCrud from '@/components/TableCrud';
import { Notification } from '@douyinfe/semi-ui';
import MenuTreeComponent from '../menu/MenuTree';
import { OperateToolbar } from '@/components/TableCrud/interface';
import RoleHelper from './helper';
import { TreePanelApi } from '@/components/Tree/interface';
import { MenuTree as MenuEntity } from '@/api/system/menu';
import _ from 'lodash';
import useRoleMenuApi from '@/api/system/rolemenu';
import Modular from '@/components/Modular/Modular';

const Role: React.FC = () => {
  const roleApi = useRoleApi();
  const [showGrant, setShowGrant] = useState<boolean>(false);
  const roleRef = useRef<Role>();
  const treeApiRef = useRef<TreePanelApi<MenuEntity>>();
  const [menuIds, setMenuIds] = useState<string[]>([]);
  const roleMenuApi = useRoleMenuApi();

  return (
    <>
      <TableCrud<Role>
        mode="page"
        columns={RoleHelper.getColumns()}
        useApi={RoleHelper.getApi}
        operateBar={{
          append: [
            {
              code: 'grant',
              name: '授权',
              type: 'primary',
              size: 'small',
              onClick: (tableContext, formContext, record) => {
                roleRef.current = record;
                roleMenuApi
                  .list({ entity: { roleId: record.id } })
                  .then((res) => {
                    const { code, data } = res;
                    if (code === 200) {
                      setMenuIds(data.map((r) => r.menuId));
                    }
                  });
                setShowGrant(true);
              },
            },
          ] as OperateToolbar<Role>[],
        }}
      />

      <Modular
        title="授权"
        size="medium"
        onConfirm={() => {
          if (!roleRef.current) {
            Notification.error({ position: 'top', content: '角色信息不存在!' });
            return;
          }
          roleApi
            .grant({
              roleId: roleRef.current.id,
              menuId: treeApiRef.current?.getSelectKeys() || [],
            })
            .then((res) => {
              if (res.code === 200 && res.data) {
                Notification.success({ position: 'top', content: res.message });
                setShowGrant(false);
              } else {
                Notification.error({ position: 'top', content: res.message });
              }
            })
            .catch((err) => {
              setShowGrant(false);
            });
        }}
        onCancel={() => setShowGrant(false)}
        visible={showGrant}
      >
        <MenuTreeComponent
          menuIds={menuIds}
          getTreeApi={(api) => (treeApiRef.current = api)}
        />
      </Modular>
    </>
  );
};

export default Role;
