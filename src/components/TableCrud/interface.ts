import { GeneralApi, IdEntity, Order } from '@/api/interface';
import {
  ColumnProps,
  TablePagination,
  TableProps,
} from '@douyinfe/semi-ui/lib/es/table';
import {
  FormColumnProps,
  FormContext,
  FormDateColumnProps,
  FormInputColumnProps,
  FormNumberColumnProps,
  FormRadioColumnProps,
  FormSelectColumnProps,
  FormTextAreaColumnProps,
  FormTreeSelectColumnProps,
} from '../TForm/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { TableColumnDecorator } from './table';

export type Bar<T extends IdEntity> = {
  name: string;
  type: 'warning' | 'primary' | 'tertiary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
  icon?: React.ReactNode;
  onClick?: (
    tableContext: TableContext<T> | undefined,
    formContext: FormContext<T> | undefined,
  ) => void;
};

export type Toolbar<T extends IdEntity> = Bar<T> & {
  position: 'left' | 'right';
};

// 操作列类型
export type OperateToolbar<T extends IdEntity> = Omit<Bar<T>, 'onClick'> & {
  onClick?: (
    tableContext: TableContext<T> | undefined,
    formContext: FormContext<T> | undefined,
    value: T,
  ) => void;
};

export type TableCrudProps<T extends IdEntity> = Omit<
  TableProps<T>,
  'columns' | 'pagination'
> & {
  // ⚠️表示当前crud关键标识
  // 具有三个可选项 list page tree。三个类型对应成为三种table的表现形式
  model: 'list' | 'page' | 'tree';
  columns: TableColumnProps<T>[];
  // table工具栏，组件中包含默认的工具栏，可以自定义添加
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean;
    // 是否显示批量删除按钮
    showBatchDelete?: boolean;
    // 是否显示导出按钮
    showExport?: boolean;
    // 是否显示导入按钮
    showImport?: boolean;
    // 自定义追加
    append?: Toolbar<T>[];
  };
  // 操作列
  operateBar?: {
    // 是否显示编辑操作
    showEdit?: boolean | ((record: T) => boolean);
    // 是否显示删除操作
    showDelete?: boolean | ((record: T) => boolean);
    // 自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加
    append?: (
      | OperateToolbar<T>
      | ((record: T) => OperateToolbar<T> | undefined)
    )[];
  };
  // 使用方传入，触发初始化的筛选
  params?: T;
  // table使用的api
  useApi: () => GeneralApi<T>;
  // 获取table context实例
  getTableContext?: (tableContext: TableContext<T>) => void;
};

export type TableColumnProps<T extends IdEntity> = FormColumnProps<T> &
  ColumnProps<T> & {
    [x: string]: any;
    // ==================== 通用 ====================
    dataIndex?: string;
    // 当前column是否在table中显示，默认为true
    table?: boolean | ((tableContext: TableContext<T>) => boolean);
    // 是否支持搜索，如果true则把column展示在搜索栏中，默认false
    search?: boolean | ((tableContext: TableContext<T>) => boolean);
  };

// Input 组件
export type TableInputColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormInputColumnProps<T> & {};

// InputNumber 组件
export type TableNumberColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormNumberColumnProps<T> & {};

// Select 组件
export type TableSelectColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormSelectColumnProps<T> & {};

// TreeSelect 组件
export type TableTreeSelectColumnProps<T extends IdEntity> =
  TableColumnProps<T> &
    Omit<FormTreeSelectColumnProps<T>, 'treeData'> & {
      treeData:
        | TreeNodeData[]
        | ((
            tableContext?: TableContext<T>,
            formContext?: FormContext<T>,
          ) => TreeNodeData[]);
    };

// Radio 组件
export type TableRadioColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormRadioColumnProps<T> & {};

// textarea 组件
export type TableTextAreaColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormTextAreaColumnProps<T> & {};

// date 组件
export type TableDateColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormDateColumnProps<T> & {};

// ======================== operate ========================

// 联系Table crud组件，进行数据操作传输
export type TableContext<T extends IdEntity> = {
  api: GeneralApi<T> | undefined;
  props: TableCrudProps<T>;
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
  // table 数据源
  dataSource: T[];
  decorator: TableColumnDecorator<T>;
  newContext: (newTableContext: TableContext<T>) => void;
  // 刷新table，使其重新调用接口（TODO 可能会出现预想不到情况）
  refresh: () => void;
};

export interface TableApi<T extends IdEntity> {
  remove(tableContext: TableContext<T> | undefined, ids: string[]): void;
  list(tableContext: TableContext<T> | undefined): void;
  page(
    tableContext: TableContext<T> | undefined,
    pageable?: TablePagination,
  ): void;
  tree(tableContext: TableContext<T> | undefined): void;
  listOrPageOrTree(
    tableContext: TableContext<T> | undefined,
    pageable?: TablePagination,
  ): void;
  details(
    tableContext: TableContext<T> | undefined,
    formContext: FormContext<T> | undefined,
    id: string,
  ): void;
  edit(
    tableContext: TableContext<T> | undefined,
    formContext: FormContext<T> | undefined,
    id: string,
  ): void;
}
