import ListPanel from '@/components/list';
import RoleHelper from './helper';
import useRoleApi, { Role } from '@/api/system/role';
import useUserRoleApi from '@/api/system/userrole';
import { useEffect, useState } from 'react';
import { ListPanelProps } from '@/components/list/interface';

export type RoleListProps = {
  userId?: string;
  getListPanelApi?: ListPanelProps<Role>['getListPanelApi'];
};

const RoleList: React.FC<RoleListProps> = (props: RoleListProps) => {
  const roleApi = useRoleApi();
  const userRoleApi = useUserRoleApi();
  const [roleIds, setRoleIds] = useState<string[]>([]);

  useEffect(() => {
    const { userId } = props;
    if (userId) {
      userRoleApi.list({ entity: { userId } }).then((res) => {
        if (res.code === 200) {
          setRoleIds(res.data.map((r) => r.roleId));
        }
      });
    }
  }, [props.userId]);

  return (
    <ListPanel
      columns={RoleHelper.getColumns()}
      useApi={roleApi}
      wrap={RoleHelper.wrap}
      initValues={roleIds}
      multiple
      toolbar={{ showAdd: false }}
      operateBar={{ showEdit: false, showDelete: false }}
      getListPanelApi={(api) => {
        props.getListPanelApi?.(api);
      }}
    />
  );
};

export default RoleList;
