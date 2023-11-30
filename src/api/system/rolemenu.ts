import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl } from '../interface';

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

const useRoleMenuApi = (): GeneralApi<RoleMenu> => {
  const request = useRequest();
  return new GeneralApiImpl<RoleMenu>('/api/sys/role-menu', request);
};

export default useRoleMenuApi;
