import useRequest from '@/hook/request';
import { BaseEntity, GeneralApi, Pagination, R } from './api';

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

const useRoleApi = (): GeneralApi<Role> => {
  const request = useRequest();

  const save = (entity: Role): Promise<R<boolean>> => {
    return request.post('/api/sys/role/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: Role): Promise<R<boolean>> => {
    return request.put('/api/sys/role/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: Role): Promise<R<boolean>> => {
    return request.put('/api/sys/role/save-or-update', entity).then((res) => {
      return res.data;
    });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/role/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<Role>> => {
    return request.get('/api/sys/role/details', { id }).then((res) => {
      return res.data;
    });
  };
  const list = (entity: Role): Promise<R<Role[]>> => {
    return request.get('/api/sys/role/list', entity).then((res) => {
      return res.data;
    });
  };
  const page = (
    page: Pagination<Role>,
    entity: Role,
  ): Promise<R<Pagination<Role>>> => {
    return request
      .get('/api/sys/role/page', { ...page, ...entity })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
};

export default useRoleApi;
