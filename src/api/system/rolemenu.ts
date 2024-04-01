import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl } from '..';

export interface RoleMenu {
  /**
   * 主键
   */
  id: string;

  /**
   * 角色id
   */
  roleId: string;

  /**
   * 菜单id
   */
  menuId: string;
}

interface RoleMenuApi extends GeneralApi<RoleMenu> {}

const useRoleMenuApi = (): RoleMenuApi => {
  const request = useRequest();
  return new GeneralApiImpl<RoleMenu>('/api/sys/role-menu', request);
};

export default useRoleMenuApi;
