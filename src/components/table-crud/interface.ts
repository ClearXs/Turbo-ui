import { GeneralApi, Entity, Order } from '@/api';
import {
  ColumnProps,
  SortOrder,
  TablePagination,
  TableProps,
} from '@douyinfe/semi-ui/lib/es/table';
import {
  FormColumnProps,
  FormContext,
  FormEvent,
  FormProps,
} from '../uni-form/interface';
import { TableColumnDecorator } from './table';
import { PopoverProps } from '@douyinfe/semi-ui/lib/es/popover';
import { FormApi } from '@douyinfe/semi-ui/lib/es/form';

export type ArgType<T extends Entity> = {
  [name in keyof T]?: T[name];
};

export type ViewModel =
  // 无分页列表
  | 'list'
  // 分页列表
  | 'page'
  // 树
  | 'tree'
  // 分页卡片
  | 'cardPage'
  // 无限滚动的列表
  | 'scrollingList';

export type Bar<T extends Entity> = {
  code:
    | 'add'
    | 'delete'
    | 'edit'
    | 'selectAll'
    | 'unselectAll'
    | 'import'
    | 'export'
    | 'refresh'
    | string;
  name: string;
  type: 'warning' | 'primary' | 'tertiary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
  icon?: React.ReactNode;
  // 当popoverContent存在时，该位置参数生效。
  popoverPosition?: PopoverProps['position'];
  // popover内容组件，如果存在的话则增加Popover组件在Bar的最外层
  popoverContent?: React.ReactNode;
  // 是否可用
  disabled?: boolean;
  onClick?: (
    tableContext: TableContext<T>,
    formContext?: FormContext<T>,
  ) => void;
};

export type Toolbar<T extends Entity> = Bar<T> & {
  position: 'left' | 'right';
};

// 操作列类型
export type OperateToolbar<T extends Entity> = Omit<Bar<T>, 'onClick'> & {
  // 是否是内置提供的按钮
  internal?: boolean;
  // 点击操作
  onClick?: (
    value: T,
    tableContext: TableContext<T>,
    formContext?: FormContext<T>,
  ) => void;
};

export type TableCrudProps<T extends Entity> = Pick<
  TableProps<T>,
  'title' | 'bordered'
> & {
  // table row key标识，默认为id
  id?: string;
  // table 视图模式
  mode: ViewModel;
  // table width
  width?: string | number | 'auto';
  // table height
  height?: string | number | 'auto';
  // fixed table
  fixed?: boolean;
  // 数据源
  dataSource?: T[];
  // 数据字段
  columns: TableColumnProps<T>[];
  // 是否具有可操作（意味着能否用是否api进行crud、能否点击操作按钮进行操作...）
  operability?: boolean;
  // whether disable assigned value in column
  // default is true
  disableDefaultBehavior?: boolean;
  // search参数
  search?: TableSearch;
  // table工具栏，组件中包含默认的工具栏，可以自定义添加
  toolbar?: TableToolbar<T>;
  // 操作列
  operateBar?: TableOperateBar<T>;
  // 使用方传入，触发初始化的筛选
  params?: ArgType<T>;
  // 卡片模式下生效
  card?: TableCard<T>;
  // form modal
  modal?: FormProps<T>['modal'];
  // table使用的curd api
  useApi: GeneralApi<T>;
  // 内置事件回调
  event?: TableEvent<T>;
  // 获取table context实例
  getTableContext?: (tableContext: TableContext<T>) => void;
  // form reaction scope
  scope?: FormProps<T>['scope'];
  // 是否展开所有的数据，当mode=cardPage时生效
  expandAllRows?: boolean;
};

export type TableSearch = {
  // 是否显示search
  show?: boolean;
  // 是否禁用search字段，默认为false
  disabled?: boolean;
  // 是否显示search按钮，默认为true
  showSearch?: boolean;
  // 是否显示reset按钮，默认为true
  showReset?: boolean;
};

export type TableToolbar<T extends Entity> = {
  // 是否显示toolbar
  show?: boolean;
  // 是否显示增加按钮
  showAdd?: boolean;
  // 是否显示批量删除按钮
  showBatchDelete?: boolean;
  // 是否显示刷新
  showRefresh?: boolean;
  // 是否显示导出按钮
  showExport?: boolean;
  // 是否显示导入按钮
  showImport?: boolean;
  // 是否展示显示列
  showColumns?: boolean;
  // 是否展示排序
  showOrdered?: boolean;
  // 是否显示模式切换
  showModelSwitch?: boolean;
  // 自定义追加
  append?: Toolbar<T>[];
};

export type TableOperateBar<T extends Entity> = {
  // 是否行内编辑
  showInlineEdit?: boolean | ((record: T) => boolean);
  // 是否显示编辑操作
  showEdit?: boolean | ((record: T) => boolean);
  // 是否显示删除操作
  showDelete?: boolean | ((record: T) => boolean);
  // 是否显示详情操作
  showDetails?: boolean | ((record: T) => boolean);
  // 是否显示复制操作
  showCopy?: boolean | ((record: T) => boolean);
  // 自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加
  append?: (
    | OperateToolbar<T>
    | ((record: T) => OperateToolbar<T> | undefined)
  )[];
};

export type TableCard<T extends Entity> = {
  // 卡片点击
  onClick?: (record: T) => void;
  // 渲染卡片标题，如果没有则为空
  renderTitle?: (record: T) => React.ReactNode;
  // 渲染卡片内容，如果没有则为空
  renderContent?: (record: T) => React.ReactNode;
  // 渲染卡片页脚，如果没有则为空
  renderFooter?: (record: T) => React.ReactNode;
};

export type TableEvent<T extends Entity> = FormEvent<T> & {
  // 当删除成功后进行的回调
  onDeleteSuccess?: (ids: T['id'][]) => void;
  onQuerySuccess?: (
    tableContext: TableContext<T>,
    pageable?: TablePagination,
  ) => void;
};

// table column 属性
export type TableColumnProps<T extends Entity> = FormColumnProps<T> &
  Pick<
    ColumnProps<T>,
    | 'align'
    | 'title'
    | 'width'
    | 'filterChildrenRecord'
    | 'filterDropdown'
    | 'renderFilterDropdown'
    | 'filterDropdownProps'
    | 'filterDropdownVisible'
    | 'filterIcon'
    | 'filterMultiple'
    | 'filteredValue'
    | 'filters'
    | 'renderFilterDropdownItem'
    | 'sortOrder'
    | 'sorter'
    | 'sortIcon'
  > & {
    // 数据字段
    dataIndex?: string;
    // 当前column是否在table中显示，默认为true
    table?: boolean | ((tableContext: TableContext<T>) => boolean);
    // 是否支持搜索，如果true则把column展示在搜索栏中，默认false
    search?: boolean | ((tableContext: TableContext<T>) => boolean);
    // whether column editable
    // default is true
    editable?: boolean;
    // column render
    render?: (
      text: string,
      record: T,
      index: number,
      tableContext: TableContext<T>,
    ) => React.ReactNode;
    // 是否当字段超过最大宽度，做省略，默认为true
    ellipsis?: boolean;
  };

// card column 属性
export type CardColumnProps<T extends Entity> = TableColumnProps<T> & {
  // 是否为card标题字段
  cardTitle?: boolean;
};

export type SortColumn = {
  property: string;
  order: SortOrder;
  sorted: boolean;
};

export type ContextTable = {
  // 行选择keys
  selectedRowKeys: string[];
  // table loading
  loading?: boolean;
  // table分页
  pagination?: TablePagination;
  // 排序
  orders?: Order[];
};

export type ContextTree = {
  // 是否展开所有
  expandAllRows?: boolean;
};

export type TableContext<T extends Entity> = {
  // mark data source unique key, default is id
  idKey: string;
  // table props
  props: TableCrudProps<T>;
  // inline editor props
  inlineEditor: InlineEditor<T>;
  // table 模式
  mode: TableCrudProps<T>['mode'];
  // entity api
  api?: GeneralApi<T>;
  // table api
  tableApi: TableApi<T>;
  // inline editor api
  inlineEditorApi: InlineEditorApi<T>;
  // table helper api
  helperApi: HelperApi<T>;
  // table columns
  tableColumns: TableColumnProps<T>[];
  // 表头搜索值
  search: ArgType<T>;
  // 上下文下使用的 table 有关参数
  table: ContextTable;
  // 上下文下使用的 tree 有关参数
  tree: ContextTree;
  // table 数据源
  dataSource: T[];
  // table columns decorator
  decorator: TableColumnDecorator<T>;
  // the table form context
  formContext?: FormContext<T>;
  // 刷新table，使其重新调用接口（TODO 可能会出现预想不到情况）
  refresh: () => void;
  /**
   * 内置对columns的二次处理的返回
   * @param exclusiveOperate 排序操作列
   * @param immediateFilter 是否使用{@code TableColumnProps#table}参数对返回结果进行过滤
   * @return 返回基于{@code TableColumnProps#index}排序后的columns
   */
  getTableColumns: (
    exclusiveOperate?: boolean,
    immediateFilter?: boolean,
  ) => TableColumnProps<T>[];
  // 设置columns
  setTableColumns: (columns: TableColumnProps<T>[]) => void;
  /**
   * get select row keys
   */
  getSelectedRowKeys: () => string[];
  /**
   * get select rows
   */
  getSelectedRows: () => T[];
  /**
   * set form context
   *
   * @param formContext the form context instance
   */
  setFormContext: (formContext: FormContext<T>) => void;
};

export interface TableApiEvent {
  // when invoke api success callback
  onSuccess?: (data?: any) => void;
  // when failed to invoke api callback
  onError?: (err: Error) => void;
}

export interface TableApiProps {
  showMessage?: boolean;
}

export interface TableApi<T extends Entity> {
  saveOrUpdate(entity: T, props?: TableApiProps, event?: TableApiEvent): void;
  // remove data
  remove(ids: string[], props?: TableApiProps, event?: TableApiEvent): void;
  // list table data
  list(props?: TableApiProps, event?: TableApiEvent): void;
  // page table data
  page(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void;
  // tree table data
  tree(props?: TableApiProps, event?: TableApiEvent): void;
  listOrPageOrTree(
    pageable?: TablePagination,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void;
  // data details
  details(id: string, props?: TableApiProps, event?: TableApiEvent): void;
  // edit data
  edit(id: string, props?: TableApiProps, event?: TableApiEvent): void;
  // inline edit
  inlineEdit(id: string, props?: TableApiProps, event?: TableApiEvent): void;
  // sort data
  sort(
    sortColumn: SortColumn,
    props?: TableApiProps,
    event?: TableApiEvent,
  ): void;
  setTableContext(tableContext: TableContext<T>): void;
  setFormContext(fromContext: FormContext<T>): void;
}

export type RenderOperatorBarType<T extends Entity> = (
  record: T,
  tableContext: TableContext<T>,
  operateBar?: TableCrudProps<T>['operateBar'],
) => OperateToolbar<T>[];

export type TableToolbarProps<T extends Entity> = {
  tableProps: TableCrudProps<T>;
};

export type ApiSet<T extends Entity> = {
  tableApi: TableApi<T>;
  inlineEditorApi: InlineEditorApi<T>;
  helperApi: HelperApi<T>;
};

export type InlineEditorApi<T extends Entity> = {
  open: (id: T['id']) => void;
  save: (id: T['id']) => void;
  isEditing: (id: T['id']) => boolean;
  contains: (id: T['id']) => boolean;
  finish: (id: T['id']) => void;
  clear: () => void;
  hasElement: () => boolean;
  setFormApi: (formApi: FormApi<{ data: T[] }>) => void;
};

export type InlineEditor<T extends Entity> = {
  modCount: number;
  editing: Map<T['id'], boolean>;
};

export type HelperApi<T extends Entity> = {
  getId: (entity: T) => T['id'];
  // entity in table dataSource index
  index: (id: T['id']) => number;
  indexOfEntity: (entity: T) => number;
};
