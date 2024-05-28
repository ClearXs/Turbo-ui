import { GeneralApi, IdEntity, Order } from '@/api';
import {
  ColumnProps,
  SortOrder,
  TablePagination,
  TableProps,
} from '@douyinfe/semi-ui/lib/es/table';
import { FormColumnProps, FormContext, FormProps } from '../TForm/interface';
import { TableColumnDecorator } from './table';
import { PopoverProps } from '@douyinfe/semi-ui/lib/es/popover';

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

// 数据模式
export type DataMode = 'local' | 'remote';

export type Bar<T extends IdEntity> = {
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
    formContext: FormContext<T>,
  ) => void;
};

export type Toolbar<T extends IdEntity> = Bar<T> & {
  position: 'left' | 'right';
};

// 操作列类型
export type OperateToolbar<T extends IdEntity> = Omit<Bar<T>, 'onClick'> & {
  // 是否是内置提供的按钮
  internal?: boolean;
  // 点击操作
  onClick?: (
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    value: T,
  ) => void;
};

export type TableCrudProps<T extends IdEntity> = Omit<
  TableProps<T>,
  'columns' | 'pagination'
> & {
  // table row key标识，默认为id
  id?: string;
  // table 视图模式
  mode: ViewModel;
  height?: string | 'auto';
  // 数据源
  dataSource?: T[];
  // 数据字段
  columns: TableColumnProps<T>[];
  // 是否具有可操作（意味着能否用是否api进行crud、能否点击操作按钮进行操作...）
  operability?: boolean;
  // search参数
  search?: {
    // 是否显示search
    show?: boolean;
    // 是否禁用search字段，默认为false
    disabled?: boolean;
    // 是否显示search按钮，默认为true
    showSearch?: boolean;
    // 是否显示reset按钮，默认为true
    showReset?: boolean;
  };
  // table工具栏，组件中包含默认的工具栏，可以自定义添加
  toolbar?: {
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
  // 操作列
  operateBar?: {
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
  // 使用方传入，触发初始化的筛选
  params?: Partial<T>;
  // 卡片模式下生效
  card?: {
    // 卡片点击
    onClick?: (record: T) => void;
    // 渲染卡片标题，如果没有则为空
    renderTitle?: (record: T) => React.ReactNode;
    // 渲染卡片内容，如果没有则为空
    renderContent?: (record: T) => React.ReactNode;
    // 渲染卡片页脚，如果没有则为空
    renderFooter?: (record: T) => React.ReactNode;
  };
  modal?: FormProps<T>['modal'];
  // table使用的api
  useApi?: (() => GeneralApi<T>) | GeneralApi<T>;
  // 内置事件回调
  event?: {
    // 当删除成功后进行的回调
    onDeleteSuccess?: (ids: T['id'][]) => void;
    onQuerySuccess?: (
      tableContext: TableContext<T>,
      pageable?: TablePagination,
    ) => void;
  } & FormProps<T>['event'];
  // 获取table context实例
  getTableContext?: (tableContext: TableContext<T>) => void;
  // form reaction scope
  scope?: FormProps<T>['scope'];
};

// table column 属性
export type TableColumnProps<T extends IdEntity> = FormColumnProps<T> &
  ColumnProps<T> & {
    [x: string]: any;
    // ==================== 通用 ====================
    // 数据字段
    dataIndex?: string;
    // 当前column是否在table中显示，默认为true
    table?: boolean | ((tableContext: TableContext<T>) => boolean);
    // 是否支持搜索，如果true则把column展示在搜索栏中，默认false
    search?: boolean | ((tableContext: TableContext<T>) => boolean);
  };

// card column 属性
export type CardColumnProps<T extends IdEntity> = TableColumnProps<T> & {
  // 是否为card标题字段
  cardTitle?: boolean;
};

export type SortColumn = {
  property: string;
  order: SortOrder;
  sorted: boolean;
};

// ======================== operate ========================

// 联系Table crud组件，进行数据操作传输
export type TableContext<T extends IdEntity> = {
  // mark data source unique key, default is id
  idKey: string;
  // table props
  props: TableCrudProps<T>;
  // table 模式
  mode: TableCrudProps<T>['mode'];
  // entity api
  api?: GeneralApi<T>;
  // table api
  tableApi: TableApi<T>;
  // table columns
  tableColumns: TableColumnProps<T>[];
  // 表头搜索值
  search: {
    [key: string]: any;
  };
  table: {
    // table loading
    loading?: boolean;
    // table分页器
    pagination?: TablePagination;
    // 行选择keys
    selectedRowKeys: string[];
    // 排序
    orders?: Order[];
  };
  tree: {
    // 是否展开所有
    expandAllRows?: boolean;
  };
  // table 数据源
  dataSource: T[];
  // table columns decorator
  decorator: TableColumnDecorator<T>;
  // 刷新table，使其重新调用接口（TODO 可能会出现预想不到情况）
  refresh: () => void;

  /**
   * 内置对columns的二次处理的返回
   * @param exclusiveOperate 排序操作列
   * @param immediateFilter 是否使用{@code TableColumnProps#table}参数对返回结果进行过滤
   * @return 返回基于{@code TableColumnProps#index}排序后的columns
   */
  getTableColumns(
    exclusiveOperate?: boolean,
    immediateFilter?: boolean,
  ): TableColumnProps<T>[];

  // 设置columns
  setTableColumns(columns: TableColumnProps<T>[]): void;

  /**
   * get select row keys
   */
  getSelectedRowKeys(): string[];

  /**
   * get select rows
   */
  getSelectedRows(): T[];
};

export interface TableApi<T extends IdEntity> {
  // 移除table数据
  remove(tableContext: TableContext<T>, ids: string[]): void;
  // list table数据
  list(tableContext: TableContext<T>): void;
  // page table数据
  page(tableContext: TableContext<T>, pageable?: TablePagination): void;
  // tree table数据
  tree(tableContext: TableContext<T>): void;
  listOrPageOrTree(
    tableContext: TableContext<T>,
    pageable?: TablePagination,
  ): void;
  // 数据详情
  details(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void;
  // 编辑
  edit(
    tableContext: TableContext<T>,
    formContext: FormContext<T>,
    id: string,
  ): void;
  // sort 排序
  sort(tableContext: TableContext<T>, sortColumn: SortColumn): void;
}

export type RenderOperatorBarType<T extends IdEntity> = (
  record: T,
  operateBar?: TableCrudProps<T>['operateBar'],
  tableApi?: TableApi<T>,
) => OperateToolbar<T>[];

export type TableToolbarProps<T extends IdEntity> = {
  tableProps: TableCrudProps<T>;
};
