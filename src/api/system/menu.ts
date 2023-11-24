import useRequest from '@/hook/request';
import { GeneralApi, GeneralParams, Pagination, R, Tree } from '../api';

export interface Menu extends Tree {
  /**
   * 菜单序号
   */
  sort: number;

  /**
   * 菜单类型
   */
  type: string;

  /**
   * 父级菜单
   */
  parentId?: string;

  /**
   * 别名
   */
  alias: string;

  /**
   * 路径
   */
  route: string;

  /**
   * icon
   */
  icon?: string;
}

export type MenuTree = Menu & {
  children: MenuTree[];
};

export default function useMenuApi(): GeneralApi<MenuTree> {
  const request = useRequest();
  const save = (entity: MenuTree): Promise<R<boolean>> => {
    return request.post('/api/sys/menu/save', entity).then((res) => {
      return res.data;
    });
  };

  const edit = (entity: MenuTree): Promise<R<boolean>> => {
    return request.put('/api/sys/menu/edit', entity).then((res) => {
      return res.data;
    });
  };

  const saveOrUpdate = (entity: MenuTree): Promise<R<boolean>> => {
    return request.put('/api/sys/menu/save-or-update', entity).then((res) => {
      return res.data;
    });
  };

  const deleteEntity = (ids: string[]): Promise<R<boolean>> => {
    return request.delete('/api/sys/menu/delete', ids).then((res) => {
      return res.data;
    });
  };
  const details = (id: string): Promise<R<MenuTree>> => {
    return request.get('/api/sys/menu/details', { id }).then((res) => {
      return res.data;
    });
  };

  const list = (params: GeneralParams<MenuTree>): Promise<R<MenuTree[]>> => {
    return request.get('/api/sys/menu/tree', params).then((res) => {
      return res.data;
    });
  };

  const page = (
    page: Pagination<MenuTree>,
    params: GeneralParams<MenuTree>,
  ): Promise<R<Pagination<MenuTree>>> => {
    return request
      .get('/api/sys/menu/page', { ...page, ...params })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
}
