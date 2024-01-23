import { Constant } from './interface';

export type MenuAttr = Constant;

export const NEW_WINDOW = 'NEW_WINDOW';

export const HIDE = 'HIDE';

export const EMBEDDED = 'EMBEDDED';

export const MENU_ATTR: MenuAttr[] = [
  {
    value: NEW_WINDOW,
    label: '新窗口',
    extra: '当菜单具有该属性时，菜单将会以新的窗口进行打开',
  },
  {
    value: HIDE,
    label: '隐藏',
    extra: '当菜单具有该属性时，菜单将会隐藏（即使有这个菜单权限）',
  },
  {
    value: EMBEDDED,
    label: '内嵌',
    extra: '当菜单具有该属性时，内容区将会拿着填写的路径把资源进行内嵌',
  },
];
