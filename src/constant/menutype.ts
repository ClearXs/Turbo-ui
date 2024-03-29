import { Constant } from './interface';

export type MenuType = Constant;

export const MENU_TYPE: MenuType[] = [
  {
    value: 'MENU',
    label: '菜单',
    tag: 'blue',
  },
  {
    value: 'BUTTON',
    label: '按钮',
    tag: 'cyan',
  },
  {
    value: 'PAGE',
    label: '页面',
    tag: 'lime',
  },
];
