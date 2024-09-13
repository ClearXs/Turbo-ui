import {
  ContextTable,
  ContextTree,
  TableCard,
  TableContext,
  TableEvent,
  TableOperateBar,
  TableSearch,
  TableToolbar,
} from '@/components/table-crud/interface';
import type { Property, Sample } from '../interface';

export const tableSearchArgsType: Property<TableSearch> = {
  show: {
    name: 'show',
    description: '是否显示search',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  disabled: {
    name: 'disabled',
    description: '是否禁用search字段',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'false',
      },
    },
  },
  showSearch: {
    name: 'showSearch',
    description: '是否显示search按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showReset: {
    name: 'showReset',
    description: '是否显示reset按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
};

export const tableToolbarArgsType: Property<TableToolbar<Sample>> = {
  show: {
    name: 'show',
    description: '是否显示toolbar',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showAdd: {
    name: 'showAdd',
    description: '是否显示增加按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showBatchDelete: {
    name: 'showBatchDelete',
    description: '是否显示批量删除按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showRefresh: {
    name: 'showRefresh',
    description: '是否显示刷新按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showExport: {
    name: 'showExport',
    description: '是否显示导出按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showImport: {
    name: 'showImport',
    description: '是否显示导入按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showColumns: {
    name: 'showColumns',
    description: '是否显示列配置按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showOrdered: {
    name: 'showOrdered',
    description: '是否显示序号',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showModelSwitch: {
    name: 'showModelSwitch',
    description: '是否显示模式切换',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  append: {
    name: 'append',
    description: '自定义追加',
    table: {
      type: {
        summary: 'Toolbar<T>[]',
      },
    },
  },
};

export const tableOperateBarArgsType: Property<TableOperateBar<Sample>> = {
  showInlineEdit: {
    name: 'showInlineEdit',
    description: '是否行内编辑',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  showEdit: {
    name: 'showEdit',
    description: '是否显示编辑操作',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showDelete: {
    name: 'showDelete',
    description: '是否显示删除操作',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showDetails: {
    name: 'showDetails',
    description: '是否显示详情操作',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showCopy: {
    name: 'showCopy',
    description: '是否显示复制操作',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  append: {
    name: 'append',
    description:
      '自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加',
    table: {
      type: {
        summary:
          '(| OperateToolbar<T>| ((record: T) => OperateToolbar<T> | undefined))[]',
      },
    },
  },
};

export const tableCardArgsType: Property<TableCard<Sample>> = {
  onClick: {
    name: 'onClick',
    description: '卡片点击',
    table: {
      type: {
        summary: '(record: T) => void',
      },
    },
  },
  renderTitle: {
    name: 'renderTitle',
    description: '渲染卡片标题，如果没有则为空',
    table: {
      type: {
        summary: '(record: T) => React.ReactNode',
      },
    },
  },
  renderContent: {
    name: 'renderContent',
    description: '渲染卡片内容，如果没有则为空',
    table: {
      type: {
        summary: '(record: T) => React.ReactNode',
      },
    },
  },
  renderFooter: {
    name: 'renderFooter',
    description: '渲染卡片页脚，如果没有则为空',
    table: {
      type: {
        summary: '(record: T) => React.ReactNode',
      },
    },
  },
};

export const tableEventArgsType: Property<TableEvent<Sample>> = {
  onDeleteSuccess: {
    name: 'onDeleteSuccess',
    description: '当删除成功后进行的回调',
    table: {
      type: {
        summary: "(ids: T['id'][]) => void",
      },
    },
  },
  onQuerySuccess: {
    name: 'onQuerySuccess',
    description: '当查询成功后进行回调',
    table: {
      type: {
        summary:
          'onQuerySuccess?: (tableContext: TableContext<T>,pageable?: TablePagination,) => void;',
      },
    },
  },
};

export const tableContextArgsType: Property<TableContext<Sample>> = {
  idKey: {
    name: 'idKey',
    description: '标记数据源数据唯一key',
    table: {
      type: {
        summary: 'string',
      },
      defaultValue: {
        summary: 'id',
      },
    },
    type: {
      required: true,
    },
  },
  props: {
    name: 'props',
    description: '引用TableCrudProps的数据',
    table: {
      type: {
        summary: 'TableCrudProps',
      },
    },
    type: {
      required: true,
    },
  },
  inlineEditor: {
    name: 'inlineEditor',
    description: '行内编辑器实例',
    table: {
      type: {
        summary: 'InlineEditor<T>',
      },
    },
  },
  mode: {
    name: 'mode',
    description: 'table 模式',
    table: {
      type: {
        summary: 'list | page| tree  | cardPage| scrollingList',
      },
    },
    type: {
      required: true,
    },
  },
  api: {
    name: 'api',
    description: '实体api',
    table: {
      type: {
        summary: 'GeneralApi<T>',
      },
    },
  },
  tableApi: {
    name: 'tableApi',
    description: '内置使用相关api',
    table: {
      type: {
        summary: 'TableApi',
      },
    },
    type: {
      required: true,
    },
  },
  inlineEditorApi: {
    name: 'inlineEditorApi',
    description: '行内编辑器使用的api',
    table: {
      type: {
        summary: 'InlineEditorApi',
      },
    },
    type: {
      required: true,
    },
  },
  helperApi: {
    name: 'helperApi',
    description: '帮助api',
    table: {
      type: {
        summary: 'HelperApi',
      },
    },
    type: {
      required: true,
    },
  },
  tableColumns: {
    name: 'tableColumns',
    description: 'table column 字段集',
    table: {
      type: {
        summary: 'TableColumnProps<T>',
      },
    },
    type: {
      required: true,
    },
  },
  search: {
    name: 'search',
    description: '表头搜索值',
    table: {
      type: {
        summary: '{ [name in keyof T]?: T[name]  }',
      },
    },
  },
  table: {
    name: 'table',
    description: '上下文下使用的 table 有关参数',
    table: {
      type: {
        summary: 'ContextTable',
      },
    },
    type: {
      required: true,
    },
  },
  tree: {
    name: 'tree',
    description: '上下文下使用的 tree 有关参数',
    table: {
      type: {
        summary: 'ContextTree',
      },
    },
    type: {
      required: true,
    },
  },
  dataSource: {
    name: 'dataSource',
    description: 'table 数据源',
    table: {
      type: {
        summary: 'T[]',
      },
    },
  },
  decorator: {
    name: 'decorator',
    description: 'table columns decorator',
    table: {
      type: {
        summary: 'TableColumnDecorator<T>',
      },
    },
    type: {
      required: true,
    },
  },
  formContext: {
    name: 'formContext',
    description: 'the table used form context',
    table: {
      type: {
        summary: 'FormContext<T>',
      },
    },
  },
  refresh: {
    name: 'refresh',
    description: '刷新table，使其重新调用Api',
    table: {
      type: {
        summary: '() => void',
      },
    },
    type: {
      required: true,
    },
  },
  getTableColumns: {
    name: 'getTableColumns',
    description: '内置对columns的二次处理的返回',
    table: {
      type: {
        summary:
          '(exclusiveOperate?: boolean,immediateFilter?: boolean,) => TableColumnProps<T>[]',
      },
    },
    type: {
      required: true,
    },
  },
  setTableColumns: {
    name: 'setTableColumns',
    description: '设置columns',
    table: {
      type: {
        summary: '(columns: TableColumnProps<T>[]) => void',
      },
    },
    type: {
      required: true,
    },
  },
  getSelectedRowKeys: {
    name: 'getSelectedRowKeys',
    description: '获取选择行的Key集合',
    table: {
      type: {
        summary: '() => string[]',
      },
    },
    type: {
      required: true,
    },
  },
  getSelectedRows: {
    name: 'getSelectedRows',
    description: '获取选中行的集合',
    table: {
      type: {
        summary: '() => T[]',
      },
    },
  },
  setFormContext: {
    name: 'setFormContext',
    description: 'set table used form context',
    table: {
      type: {
        summary: '(formContext: FormContext<T>) => void',
      },
    },
    type: {
      required: true,
    },
  },
};

export const contextTableArgsType: Property<ContextTable> = {
  selectedRowKeys: {
    name: 'selectedRowKeys',
    description: '行选择keys',
    table: {
      type: {
        summary: 'string[]',
      },
    },
  },
  loading: {
    name: 'loading',
    description: 'table loading',
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
  pagination: {
    name: 'pagination',
    description: 'table分页',
    table: {
      type: {
        summary: 'TablePagination',
      },
    },
  },
  orders: {
    name: 'orders',
    description: 'table 排序',
    table: {
      type: {
        summary: 'Order[]',
      },
    },
  },
};

export const contextTreeArgsType: Property<ContextTree> = {
  expandAllRows: {
    name: 'expandAllRows',
    description: '是否展开所有',
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
};
