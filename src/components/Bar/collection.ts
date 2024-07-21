import { tryGetIcon } from '../Icon';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { ModalButton } from '../TForm/interface';

export const INLINE_EDIT_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'inlineEdit',
  name: '行内编辑',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconEdit'),
};

export const INLINE_SAVE_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'inlineSave',
  name: '保存',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconSave'),
};

export const INLINE_CANCEL_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'inlineCancel',
  name: '取消',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconClose'),
};

export const ADD_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'add',
  name: '新增',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconPlusCircleStroked'),
};

export const EDIT_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'edit',
  name: '编辑',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconEditStroked'),
};

export const DETAILS_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'details',
  name: '详情',
  type: 'primary',
  size: 'small',
  icon: tryGetIcon('IconBriefStroked'),
  internal: true,
};

export const DELETE_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'delete',
  name: '删除',
  type: 'danger',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconDeleteStroked'),
};

export const COPY_LITERAL_OPERATOR_BAR: OperateToolbar<any> = {
  code: 'copy',
  name: '复制',
  type: 'primary',
  size: 'small',
  internal: true,
  icon: tryGetIcon('IconCopy'),
};

export const ADD_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'add',
  name: '新增',
  position: 'left',
  type: 'primary',
  icon: tryGetIcon('IconCopyAdd'),
};

export const DELETE_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'delete',
  name: '删除',
  position: 'left',
  type: 'danger',
  icon: tryGetIcon('IconDelete'),
};

export const REFRESH_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'refresh',
  name: '刷新',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconRefresh'),
};

export const IMPORT_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'import',
  name: '导入',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconDescend2'),
};

export const EXPORT_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'export',
  name: '导出',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconDownloadStroked'),
};

export const SHOW_COLUMN_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'columns',
  name: '显示列',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconGridSquare'),
};

export const ORDERED_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'ordered',
  name: '排序',
  position: 'right',
  type: 'primary',
  icon: tryGetIcon('IconSortStroked'),
};

export const SELECT_ALL_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'selectAll',
  name: '全选',
  position: 'left',
  type: 'primary',
  icon: tryGetIcon('IconCheckList'),
};

export const DESELECT_ALL_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'unselectAll',
  name: '取消全选',
  position: 'left',
  type: 'primary',
  icon: tryGetIcon('IconCheckChoiceStroked'),
};

export const SET_CATEGORY_LITERAL_TOOLBAR: Toolbar<any> = {
  code: 'setCategory',
  name: '设置分类',
  position: 'left',
  type: 'primary',
  icon: tryGetIcon('IconGridView'),
};

export const CANCEL_MODAL_BUTTON: ModalButton<any> = {
  code: 'cancel',
  name: '取消',
  type: 'tertiary',
  size: 'default',
  icon: tryGetIcon('IconCrossCircleStroked'),
};

export const CONFIRM_MODAL_BUTTON: ModalButton<any> = {
  code: 'confirm',
  name: '确定',
  type: 'primary',
  loading: true,
  size: 'default',
  icon: tryGetIcon('IconCheckCircleStroked'),
};
