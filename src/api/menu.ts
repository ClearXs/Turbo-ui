import useRequest from '@/hook/request';

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

export default function useMenuApi() {
  const request = useRequest();

  return {};
}
