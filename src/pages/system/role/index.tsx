import { useRef, useState } from 'react';
import useRoleApi, { Role } from '@/api/system/role';
import TableCrud from '@/components/TableCrud';
import { Modal, Notification } from '@douyinfe/semi-ui';
import MenuTree from '../menu/MenuTree';
import { OperateToolbar } from '@/components/TableCrud/interface';
import RoleHelper from './helper';
import { TreePanelApi } from '@/components/Tree/interface';
import { MenuTree as MenuEntity } from '@/api/system/menu';
import _ from 'lodash';

const Role: React.FC = () => {
  const roleApi = useRoleApi();
  const [showGrant, setShowGrant] = useState<boolean>(false);
  const roleRef = useRef<Role>();
  const treeApiRef = useRef<TreePanelApi<MenuEntity>>();

  return (
    <>
      <TableCrud<Role>
        model="page"
        columns={RoleHelper.getColumns()}
        useApi={useRoleApi}
        operateBar={{
          append: [
            {
              name: '授权',
              type: 'primary',
              size: 'small',
              onClick: (tableContext, formContext, record) => {
                roleRef.current = record;
                setShowGrant(true);
              },
            },
          ] as OperateToolbar<Role>[],
        }}
      />

      <Modal
        title="授权"
        icon={null}
        size="medium"
        onOk={() => {
          if (!roleRef.current) {
            Notification.error({ position: 'top', content: '角色信息不存在!' });
            return;
          }
          const menuIds = treeApiRef.current?.getSelectKeys();
          if (_.isEmpty(menuIds)) {
            Notification.error({ position: 'top', content: '未选择任何数据!' });
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
        <MenuTree
          roleId={roleRef.current?.id}
          getTreeApi={(api) => (treeApiRef.current = api)}
        />
      </Modal>
    </>
  );
};

export default Role;
