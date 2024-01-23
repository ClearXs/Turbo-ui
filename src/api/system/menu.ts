import useRequest from '@/hook/request';
import { Tree, TreeGeneralApi, TreeGeneralApiImpl } from '../interface';

export interface Menu extends Tree {
  /**
   * 菜单域
   */
  scope: string;

  /**
   * 菜单序号
   */
  sort: number;

  /**
   * 菜单类型
   */
  type: string;

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
   * 菜单属性
   */
  attrs: string[];
}

export type MenuTree = Menu & {
  children: MenuTree[];
};

export default function useMenuApi(): TreeGeneralApi<MenuTree> {
  const request = useRequest();
  return new TreeGeneralApiImpl<MenuTree>('/api/sys/menu', request);
}
