import useRequest from '@/hook/request';
import { GeneralApi, GeneralParams, Pagination, R } from '../api';

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

  const save = (entity: RoleMenu): Promise<R<boolean>> => {
    return request.post('/api/sys/role-menu/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: RoleMenu): Promise<R<boolean>> => {
    return request.put('/api/sys/role-menu/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: RoleMenu): Promise<R<boolean>> => {
    return request
      .put('/api/sys/role-menu/save-or-update', entity)
      .then((res) => {
        return res.data;
      });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/role-menu/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<RoleMenu>> => {
    return request.get('/api/sys/role-menu/details', { id }).then((res) => {
      return res.data;
    });
  };
  const list = (params: GeneralParams<RoleMenu>): Promise<R<RoleMenu[]>> => {
    return request
      .post('/api/sys/role-menu/list', { ...params })
      .then((res) => {
        return res.data;
      });
  };
  const page = (
    page: Pagination<RoleMenu>,
    params: GeneralParams<RoleMenu>,
  ): Promise<R<Pagination<RoleMenu>>> => {
    return request
      .post('/api/sys/role-menu/page', { page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
};

export default useRoleMenuApi;
