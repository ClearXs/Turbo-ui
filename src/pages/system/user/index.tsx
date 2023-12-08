import useOrgApi, { Org } from '@/api/system/org';
import useUserApi, { UserApi, User as UserEntity } from '@/api/system/user';
import Sider from '@/components/Sider';
import TableCrud from '@/components/TableCrud';
import { TableContext } from '@/components/TableCrud/interface';
import { TreePanel } from '@/components/Tree';
import { Divider, Notification } from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import UserHelper from './helper';
import OrgHelper from '../org/helper';
import { Role } from '@/api/system/role';
import { ListPanelApi } from '@/components/List/interface';
import { TreePanelApi } from '@/components/Tree/interface';
import RoleList from '../role/RoleList';
import _ from 'lodash';
import PostList from '../post/PostList';
import Post from '../post';
import ChangePasswordForm from './ChangePassword';

export const User: React.FC = () => {
  const userApi = useUserApi();
  const [orgId, setOrgId] = useState<string>();
  const [showBindingRole, setShowBindingRole] = useState<boolean>(false);
  const [showBindingOrg, setShowBindingOrg] = useState<boolean>(false);
  const [showBindingPost, setShowBindingPost] = useState<boolean>(false);

  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const tableContextRef = useRef<TableContext<UserEntity>>();

  // 当前选中用户，用于更新用户组织、角色
  const selectUserRef = useRef<UserEntity>();

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
        <div className="w-[75%] p-2 overflow-auto">
          <TableCrud<UserEntity>
            model="page"
            columns={UserHelper.getColumns()}
            useApi={useUserApi}
            getTableContext={(tableContext) => {
              tableContextRef.current = tableContext;
            }}
            params={orgId ? { orgId } : null}
            operateBar={{
              append: [
                {
                  name: '修改密码',
                  type: 'primary',
                  onClick(tableContext, formContext, value) {
                    selectUserRef.current = value;
                    setShowChangePassword(true);
                  },
                },
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
                      name: '锁定',
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
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingRole(true);
                    selectUserRef.current = record;
                  },
                },
                {
                  name: '绑定岗位',
                  type: 'primary',
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingPost(true);
                    selectUserRef.current = record;
                  },
                },
                {
                  name: '绑定组织',
                  type: 'primary',
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingOrg(true);
                    selectUserRef.current = record;
                  },
                },
              ],
            }}
          />
        </div>
      </div>

      {selectUserRef.current && (
        <RoleListSider
          visible={showBindingRole}
          user={selectUserRef.current}
          userApi={userApi}
          onClose={() => setShowBindingRole(false)}
        />
      )}
      {selectUserRef.current && (
        <PostListSider
          visible={showBindingPost}
          user={selectUserRef.current}
          userApi={userApi}
          onClose={() => setShowBindingPost(false)}
        />
      )}
      {selectUserRef.current && (
        <OrgTreeSider
          visible={showBindingOrg}
          user={selectUserRef.current}
          userApi={userApi}
          onClose={() => setShowBindingOrg(false)}
        />
      )}
      {showChangePassword && (
        <ChangePasswordForm
          onOk={(formContext) => {
            if (!selectUserRef.current) {
              Notification.error({ position: 'top', content: '未选择用户' });
              return;
            }
            const changePassword = formContext.getValues();
            userApi
              .changePassword(
                selectUserRef.current.id,
                changePassword.rawPassword,
                changePassword.newPassword,
              )
              .then((res) => {
                const { code, data, message } = res;
                if (code === 200) {
                  Notification.success({ position: 'top', content: message });
                  setShowChangePassword(false);
                } else {
                  Notification.error({ position: 'top', content: message });
                }
              });
          }}
          onCancel={() => {
            setShowChangePassword(false);
          }}
          hiddenRawPassword
        />
      )}
    </>
  );
};

const RoleListSider: React.FC<{
  visible: boolean;
  user: UserEntity;
  userApi: UserApi;
  onClose: () => void;
}> = ({ visible, user, userApi, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<ListPanelApi<Role>>();
  return (
    <Sider
      title="绑定角色"
      visible={visible}
      loading={loading}
      onCancel={() => onClose()}
      onConfirm={() => {
        const roleIds = listRef.current?.getSelectKeys();
        if (_.isEmpty(roleIds)) {
          Notification.error({ position: 'top', content: '请选择角色' });
          return;
        }
        setLoading(true);
        userApi
          .bindingRole(user.id, listRef.current?.getSelectKeys() || [])
          .then((res) => {
            const { code, data, message } = res;
            if (code === 200 && data) {
              Notification.success({ position: 'top', content: message });
              onClose();
            } else {
              Notification.error({ position: 'top', content: message });
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }}
    >
      <RoleList
        userId={user.id}
        getListPanelApi={(api) => (listRef.current = api)}
      />
    </Sider>
  );
};

const PostListSider: React.FC<{
  visible: boolean;
  user: UserEntity;
  userApi: UserApi;
  onClose: () => void;
}> = ({ visible, user, userApi, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const listRef = useRef<ListPanelApi<Post>>();
  return (
    <Sider
      title="绑定岗位"
      visible={visible}
      loading={loading}
      onCancel={() => onClose()}
      onConfirm={() => {
        const roleIds = listRef.current?.getSelectKeys();
        if (_.isEmpty(roleIds)) {
          Notification.error({ position: 'top', content: '请选择岗位' });
          return;
        }
        setLoading(true);
        userApi
          .bindingPost(user.id, listRef.current?.getSelectKeys() || [])
          .then((res) => {
            const { code, data, message } = res;
            if (code === 200 && data) {
              Notification.success({ position: 'top', content: message });
              onClose();
            } else {
              Notification.error({ position: 'top', content: message });
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }}
    >
      <PostList
        userId={user.id}
        getListPanelApi={(api) => (listRef.current = api)}
      />
    </Sider>
  );
};

const OrgTreeSider: React.FC<{
  visible: boolean;
  user: UserEntity;
  userApi: UserApi;
  onClose: () => void;
}> = ({ visible, user, userApi, onClose }) => {
  const [loading, setLoading] = useState<boolean>(false);
  const treeRef = useRef<TreePanelApi<Org>>();

  return (
    <Sider
      title="绑定组织"
      visible={visible}
      loading={loading}
      onCancel={() => onClose()}
      onConfirm={() => {
        const orgId = treeRef.current?.getSelectKey();
        if (_.isEmpty(orgId)) {
          Notification.error({ position: 'top', content: '请选择组织' });
          return;
        }
        setLoading(false);
        userApi
          .bindingOrg(user.id, orgId)
          .then((res) => {
            const { code, data, message } = res;
            if (code === 200 && data) {
              Notification.success({ position: 'top', content: message });
              onClose();
            } else {
              Notification.error({ position: 'top', content: message });
            }
            setLoading(false);
          })
          .catch((err) => {
            setLoading(false);
          });
      }}
    >
      <TreePanel
        columns={OrgHelper.getColumns()}
        first={false}
        useApi={useOrgApi}
        toolbar={{ showAdd: false }}
        initValue={user.orgId}
        operateBar={{ showEdit: false, showDelete: false }}
        expandAll
        getTreePanelApi={(treePanelApi) => {
          treeRef.current = treePanelApi;
        }}
      />
    </Sider>
  );
};

export default User;
