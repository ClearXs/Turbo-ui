import useRequest from '@/hook/request';
import { GeneralApi, Pagination, R } from './api';

export interface Menu {
  id: number;
  /**
   * 菜单编码
   */
  code?: string;

  /**
   * 菜单名称
   */
  name: string;

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
  parentId?: number;

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

  /**
   * 菜单所在层级
   */
  depth?: number;
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

  const list = (entity: MenuTree): Promise<R<MenuTree[]>> => {
    return request.get('/api/sys/menu/tree', entity).then((res) => {
      return res.data;
    });
  };

  const page = (
    page: Pagination<MenuTree>,
    entity: MenuTree,
  ): Promise<R<Pagination<MenuTree>>> => {
    return request
      .get('/api/sys/menu/page', { ...page, ...entity })
      .then((res) => {
        return res.data;
      });
  };

  return { save, edit, saveOrUpdate, deleteEntity, details, list, page };
}
