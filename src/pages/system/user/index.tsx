import useOrgApi, { Org } from '@/api/system/org';
import { UserApi, User as UserEntity } from '@/api/system/user';
import SliderSide from '@/components/slider-side';
import TableCrud from '@/components/table-crud';
import { TableContext } from '@/components/table-crud/interface';
import { Notification } from '@douyinfe/semi-ui';
import { useRef, useState } from 'react';
import UserHelper from './helper';
import OrgHelper from '../org/helper';
import { Role } from '@/api/system/role';
import { ListPanelApi } from '@/components/list/interface';
import { TreePanelApi } from '@/components/tree/interface';
import RoleList from '../role/RoleList';
import _ from 'lodash';
import PostList from '../post/PostList';
import Post from '../post';
import ChangePasswordForm from './ChangePassword';
import TreePanel from '@/components/tree/TreePanel';
import Binary from '@/components/binary';
import { tryGetIcon } from '@/components/icon';

export const UserPage = () => {
  const userApi = UserHelper.getApi();
  const [orgId, setOrgId] = useState<string>();
  const [showBindingRole, setShowBindingRole] = useState<boolean>(false);
  const [showBindingOrg, setShowBindingOrg] = useState<boolean>(false);
  const [showBindingPost, setShowBindingPost] = useState<boolean>(false);

  const [showChangePassword, setShowChangePassword] = useState<boolean>(false);

  const tableContextRef = useRef<TableContext<UserEntity>>();

  // 当前选中用户，用于更新用户组织、角色
  const selectUserRef = useRef<UserEntity>();

  const orgApi = useOrgApi();

  return (
    <>
      <Binary
        LeftComponent={
          <TreePanel<Org>
            columns={OrgHelper.getColumns()}
            useApi={orgApi}
            onSelectChange={setOrgId}
            toolbar={{ showAdd: false }}
            operateBar={{
              showEdit: false,
              showDelete: false,
              showAdd: false,
              showDetails: false,
            }}
            first={false}
            expandAll
            root="系统组织"
          />
        }
        RightComponent={
          <TableCrud<UserEntity>
            mode="page"
            columns={UserHelper.getColumns()}
            useApi={userApi}
            getTableContext={(tableContext) => {
              tableContextRef.current = tableContext;
            }}
            params={{ orgId }}
            operateBar={{
              append: [
                {
                  code: 'changPassword',
                  name: '修改密码',
                  type: 'primary',
                  icon: tryGetIcon('IconPassword'),
                  onClick(tableContext, formContext, value) {
                    selectUserRef.current = value;
                    setShowChangePassword(true);
                  },
                },
                (record) => {
                  if (record.status === 'LOCK') {
                    return {
                      code: 'enable',
                      name: '启用',
                      type: 'primary',
                      icon: tryGetIcon('IconEnable'),
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
                      code: 'lock',
                      name: '锁定',
                      type: 'primary',
                      icon: tryGetIcon('IconLock'),
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
                  code: 'bindingRole',
                  name: '绑定角色',
                  type: 'primary',
                  icon: tryGetIcon('IconRole'),
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingRole(true);
                    selectUserRef.current = record;
                  },
                },
                {
                  code: 'bindingPost',
                  name: '绑定岗位',
                  type: 'primary',
                  icon: tryGetIcon('IconPost'),
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingPost(true);
                    selectUserRef.current = record;
                  },
                },
                {
                  code: 'bindingOrg',
                  name: '绑定组织',
                  type: 'primary',
                  icon: tryGetIcon('IconOrg'),
                  onClick: (tableContext, formContext, record) => {
                    setShowBindingOrg(true);
                    selectUserRef.current = record;
                  },
                },
              ],
            }}
          />
        }
      />

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
    <SliderSide
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
    </SliderSide>
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
    <SliderSide
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
    </SliderSide>
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
  const orgApi = useOrgApi();

  return (
    <SliderSide
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
        useApi={orgApi}
        toolbar={{ showAdd: false }}
        initValue={user.orgId}
        operateBar={{
          showEdit: false,
          showDelete: false,
          showAdd: false,
          showDetails: false,
        }}
        expandAll
        getTreePanelApi={(treePanelApi) => {
          treeRef.current = treePanelApi;
        }}
      />
    </SliderSide>
  );
};

export default UserPage;
