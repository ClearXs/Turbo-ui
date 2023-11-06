import { R } from './api.interface';

export interface Menu {
  id: number;
  /**
   * 菜单编码
   */
  code: string;

  /**
   * 菜单名称
   */
  name: string;

  /**
   * 菜单序号
   */
  sort: number;

  /**
   * 父级菜单
   */
  parentId: number;

  /**
   * 别名
   */
  alias: string;

  /**
   * 路径
   */
  path: string;

  /**
   * icon
   */
  icon: string;

  /**
   * 菜单所在层级
   */
  level: number;
}

export type MenuTree = Menu & {
  children: MenuTree[];
};

/**
 * 获取当前用户菜单
 */
export const getCurrentUserMenuApi = (): Promise<R<MenuTree[]>> => {
  // mock
  return Promise.resolve({
    code: 200,
    data: [
      { id: 1, code: 1, name: '首页', path: '/home', level: 1 },
      { id: 2, code: 2, name: '用户管理', path: '/user', level: 1 },
      { id: 2, code: 2, name: '角色管理', path: '/role', level: 1 },
      { id: 2, code: 2, name: '图标管理', path: '/icon', level: 1 },
    ],
    message: '',
  });
};
