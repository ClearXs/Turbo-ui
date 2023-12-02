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

const useUserRoleApi = (): GeneralApi<UserRole> => {
  const request = useRequest();

  return new GeneralApiImpl<UserRole>('/api/sys/user-role', request);
};

export default useUserRoleApi;
