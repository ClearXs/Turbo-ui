import useOrgApi, { Org } from '@/api/system/org';
import useUserApi, { User as UserEntity } from '@/api/system/user';
import Sider from '@/components/Sider';
import TableCrud from '@/components/TableCrud';
import { TableContext } from '@/components/TableCrud/interface';
import { TreePanel } from '@/components/Tree';
import { Divider, Notification } from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import UserHelper from './helper';
import OrgHelper from '../org/helper';
import ListPanel from '@/components/List';
import RoleHelper from '../role/helper';
import useRoleApi, { Role } from '@/api/system/role';
import { ListPanelApi } from '@/components/List/interface';
import { TreePanelApi } from '@/components/Tree/interface';

export const User: React.FC = () => {
  const userApi = useUserApi();
  const [orgId, setOrgId] = useState<string>();
  const [showBindingRole, setShowBindingRole] = useState<boolean>(false);
  const [showBindingOrg, setShowBindingOrg] = useState<boolean>(false);
  const tableContextRef = useRef<TableContext<UserEntity>>();
  const roleListApiRef = useRef<ListPanelApi<Role>>();
  const orgTreeApiRef = useRef<TreePanelApi<Org>>();

  return (
    <>
      <div className="flex h-[100%]">
        <div className="w-[25%] p-2 overflow-auto">
          <TreePanel<Org>
            columns={OrgHelper.getColumns()}
            useApi={useOrgApi}
            onChange={setOrgId}
            toolbar={{ showAdd: false }}
            operateBar={{ showEdit: false, showDelete: false }}
            first={false}
            expandAll
          />
        </div>
        <Divider layout="vertical" style={{ height: '100%' }} />
        <div className="w-[70%] p-2 overflow-auto">
          <TableCrud<UserEntity>
            model="page"
            columns={UserHelper.getColumns()}
            useApi={useUserApi}
            getTableContext={(tableContext) => {
              tableContextRef.current = tableContext;
            }}
            params={orgId ? { orgId } : {}}
            operateBar={{
              append: [
                { name: '修改密码', type: 'primary' },
                (record) => {
                  if (record.status === 'LOCK') {
                    return {
                      name: '启用',
                      type: 'primary',
                      onClick: (tableContext) => {
                        userApi.active(record.id).then((res) => {
                          if (res.code === 200 && res.data) {
                            Notification.success({
                              position: 'top',
                              content: res.message,
                            });
                            tableContext?.refresh();
                          } else {
                            Notification.error({
                              position: 'top',
                              content: res.message,
                            });
                          }
                        });
                      },
                    };
                  }
                },
                (record) => {
                  if (record.status === 'ENABLE') {
                    return {
                      name: '禁用',
                      type: 'primary',
                      onClick: (tableContext) => {
                        userApi.lock(record.id).then((res) => {
                          if (res.code === 200 && res.data) {
                            Notification.success({
                              position: 'top',
                              content: res.message,
                            });
                            tableContext?.refresh();
                          } else {
                            Notification.error({
                              position: 'top',
                              content: res.message,
                            });
                          }
                        });
                      },
                    };
                  }
                },
                {
                  name: '绑定角色',
                  type: 'primary',
                  onClick: () => {
                    setShowBindingRole(true);
                  },
                },
                {
                  name: '绑定组织',
                  type: 'primary',
                  onClick: () => {
                    setShowBindingOrg(true);
                  },
                },
              ],
            }}
          />
        </div>
      </div>

      <Sider
        title="绑定角色"
        visible={showBindingRole}
        onCancel={() => setShowBindingRole(false)}
        onConfirm={() => {}}
      >
        <ListPanel
          columns={RoleHelper.getColumns()}
          useApi={useRoleApi}
          wrap={RoleHelper.wrap}
          multiple
          toolbar={{ showAdd: false }}
          operateBar={{ showEdit: false, showDelete: false }}
          getListPanelApi={(api) => {
            roleListApiRef.current = api;
          }}
        />
      </Sider>

      <Sider
        title="绑定组织"
        visible={showBindingOrg}
        onCancel={() => setShowBindingOrg(false)}
      >
        <TreePanel
          columns={OrgHelper.getColumns()}
          first={false}
          useApi={useOrgApi}
          toolbar={{ showAdd: false }}
          operateBar={{ showEdit: false, showDelete: false }}
          expandAll
          getTreePanelApi={(treePanelApi) => {
            orgTreeApiRef.current = treePanelApi;
          }}
        />
      </Sider>
    </>
  );
};

export default User;
