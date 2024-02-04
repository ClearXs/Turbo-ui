import useRequest from '@/hook/request';
import { GeneralApi, GeneralApiImpl, IdEntity } from '../interface';

export interface UserRole extends IdEntity {
  /**
   * 用户id
   */
  userId: string;

  /**
   * 角色id
   */
  roleId: string;
}

interface UserRoleApi extends GeneralApi<UserRole> {}

const useUserRoleApi = (): UserRoleApi => {
  const request = useRequest();

  return new GeneralApiImpl<UserRole>('/api/sys/user-role', request);
};

export default useUserRoleApi;
