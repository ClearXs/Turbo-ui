import { useRef, useState } from 'react';
import useRoleApi, { Role } from '@/api/system/role';
import TableCrud from '@/components/TableCrud';
import { Button, Modal, Notification, Space } from '@douyinfe/semi-ui';
import MenuTree, { MenuTreeApi } from '../menu/MenuTree';
import useRoleMenuApi from '@/api/system/rolemenu';
import { OperateToolbar } from '@/components/TableCrud/interface';
import RoleHelper from './helper';

const Role: React.FC = () => {
  const roleMenuApi = useRoleMenuApi();
  const roleApi = useRoleApi();
  const [showGrant, setShowGrant] = useState<boolean>(false);
  const [menuTreeApi, setMenuTreeApi] = useState<MenuTreeApi>();
  const [roleMenu, setRoleMenu] = useState<string[]>([]);
  const role = useRef<Role>();

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
                roleMenuApi.list({ roleId: record.id }).then((res) => {
                  if (res.code === 200) {
                    setRoleMenu(res.data.map((r) => r.menuId));
                  }
                });
                role.current = record;
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
          roleApi
            .grant({
              roleId: role.current?.id,
              menuId: menuTreeApi?.getSelected(),
            })
            .then((res) => {
              if (res.code === 200 && res.data) {
                Notification.success({ position: 'top', content: res.message });
              } else {
                Notification.error({ position: 'top', content: res.message });
              }
              setShowGrant(false);
            })
            .catch((err) => {
              setShowGrant(false);
            });
        }}
        onCancel={() => setShowGrant(false)}
        visible={showGrant}
      >
        <div className="max-h-96 overflow-auto">
          <Space className="ml-auto">
            <Button onClick={() => menuTreeApi?.selectAll()}>全选</Button>
            <Button onClick={() => menuTreeApi?.cancelSelectAll()}>
              取消全选
            </Button>
          </Space>
          <MenuTree initValue={roleMenu} getMenuTreeApi={setMenuTreeApi} />
        </div>
      </Modal>
    </>
  );
};

export default Role;
