import useRequest from '@/hook/request';
import { GeneralApi, GeneralParams, IdEntity, Pagination, R } from '../api';

export interface UserRole extends IdEntity {
  /**
   * 用户id
   */
  userId: number;

  /**
   * 角色id
   */
  roleId: number;
}

const useUserRoleApi = (): GeneralApi<UserRole> => {
  const request = useRequest();

  const save = (entity: UserRole): Promise<R<boolean>> => {
    return request.post('/api/sys/user-role/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: UserRole): Promise<R<boolean>> => {
    return request.put('/api/sys/user-role/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: UserRole): Promise<R<boolean>> => {
    return request
      .put('/api/sys/user-role/save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/user-role/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<UserRole>> => {
    return request.get('/api/sys/user-role/details', { id }).then((res) => {
      return res.data;
    });
  };
  const list = (params: GeneralParams<UserRole>): Promise<R<UserRole[]>> => {
    return request
      .post('/api/sys/user-role/list', { ...params })
      .then((res) => {
        return res.data;
      });
  };
  const page = (
    page: Pagination<UserRole>,
    params: GeneralParams<UserRole>,
  ): Promise<R<Pagination<UserRole>>> => {
    return request
      .post('/api/sys/user-role/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
};

export default useUserRoleApi;
