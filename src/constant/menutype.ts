import { Constant } from './interface';

export type MenuType = Constant;

export const MENU_TYPE: MenuType[] = [
  {
    value: 'MENU',
    label: '菜单',
  },
  {
    value: 'BUTTON',
    label: '按钮',
  },
];
