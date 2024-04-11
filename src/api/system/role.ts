import useRequest from '@/hook/request';
import { BaseEntity, GeneralApi, GeneralApiImpl, R } from '..';

export interface Role extends BaseEntity {
  /**
   * 角色名称
   */
  name: string;

  /**
   * 角色名称
   */
  code: string;

  /**
   * 角色描述
   */
  des: string;

  /**
   * 排序
   */
  sort: number;
}

export interface RoleApi extends GeneralApi<Role> {
  grant: <P extends { roleId: string; menuId: string[] }>(
    params: P,
  ) => Promise<R<boolean>>;
}

class RoleApiImpl extends GeneralApiImpl<Role> implements RoleApi {
  grant<P extends { roleId: string; menuId: string[] }>(
    params: P,
  ): Promise<R<boolean>> {
    return this.request
      .post(this.apiPath + '/grant', params)
      .then((res) => res.data);
  }
}

const useRoleApi = (): RoleApi => {
  const request = useRequest();
  return new RoleApiImpl('/api/sys/role', request);
};

export default useRoleApi;
