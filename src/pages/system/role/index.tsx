import { useMemo, useRef, useState } from 'react';
import useRoleApi, { Role } from '@/api/system/role';
import TableCrud from '@/components/TableCrud';
import {
  OperateToolbar,
  TableColumnProps,
} from '@/components/TableCrud/TableCrud';
import { Button, Modal, Notification, Space } from '@douyinfe/semi-ui';
import MenuTree, { MenuTreeApi } from '../menu/MenuTree';
import useRoleMenuApi from '@/api/system/rolemenu';

const Role: React.FC = () => {
  const roleMenuApi = useRoleMenuApi();
  const roleApi = useRoleApi();
  const [showGrant, setShowGrant] = useState<boolean>(false);
  const [menuTreeApi, setMenuTreeApi] = useState<MenuTreeApi>();
  const [roleMenu, setRoleMenu] = useState<string[]>([]);
  const role = useRef<Role>();

  const roleColumns: TableColumnProps<Role>[] = useMemo(() => {
    return [
      {
        title: '角色名称',
        dataIndex: 'name',
        ellipsis: true,
        align: 'center',
        search: true,
        type: 'input',
        require: true,
      },
      {
        title: '角色编码',
        dataIndex: 'code',
        ellipsis: true,
        align: 'center',
        type: 'input',
        require: true,
      },
      {
        title: '角色描述',
        dataIndex: 'des',
        ellipsis: true,
        align: 'center',
        type: 'textarea',
        form: true,
        line: true,
      },
    ];
  }, []);

  return (
    <>
      <TableCrud<Role>
        model="role"
        columns={roleColumns}
        useApi={useRoleApi}
        page={true}
        operateBar={
          [
            {
              name: '授权',
              type: 'primary',
              size: 'small',
              onClick: (tableContext, record) => {
                roleMenuApi.list({ roleId: record.id }).then((res) => {
                  if (res.code === 200) {
                    setRoleMenu(res.data.map((r) => r.menuId));
                  }
                });
                role.current = record;
                setShowGrant(true);
              },
            },
          ] as OperateToolbar<Role>[]
        }
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
