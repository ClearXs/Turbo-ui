import { TableColumnProps } from '@/components/table-crud/interface';
import type { Property, Sample } from '../interface';

export const columnArgsType: Property<TableColumnProps<Sample>> = {
  dataIndex: {
    name: 'dataIndex',
    description: '数据字段，该值优先级大于属性 field',
    type: 'string',
  },
  table: {
    name: 'table',
    description: '当前column是否在table中显示',
    type: 'boolean',
    table: {
      type: {
        summary: 'boolean | ((tableContext: TableContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  search: {
    name: 'search',
    description: '是否支持搜索，如果true则把column展示在搜索栏中',
    type: 'boolean',
    table: {
      type: {
        summary: 'boolean | ((tableContext: TableContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  editable: {
    name: 'editable',
    description: '该列是否可以编辑',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  render: {
    name: 'render',
    description: 'column的渲染函数',
    table: {
      type: {
        summary:
          '(text: string,record: T,index: number,      tableContext: TableContext<T>,) => React.ReactNode',
      },
    },
  },
  align: {
    name: 'align',
    description: '设置列的对齐方式，在 RTL 时会自动切换	',
    table: {
      type: {
        summary: 'left | right | center',
      },
    },
  },
  title: {
    name: 'title',
    description: '列标题',
  },
  width: {
    name: 'width',
    description: '列宽度',
    table: {
      type: {
        summary: 'number | string',
      },
    },
  },
  filterChildrenRecord: {
    name: 'filterChildrenRecord',
    description:
      '是否需要对子级数据进行本地过滤，开启该功能后如果子级符合过滤标准，父级即使不符合仍然会保留',
    type: 'boolean',
  },
  filterDropdown: {
    name: 'filterDropdown',
    description:
      '可以自定义筛选菜单，此函数只负责渲染图层，需要自行编写各种交互',
    type: 'boolean',
  },
  renderFilterDropdown: {
    name: 'renderFilterDropdown',
    description: '自定义筛选器 dropdown 面板',
    table: {
      type: {
        summary: '(props?: RenderFilterDropdownProps) => React.ReactNode',
      },
    },
  },
  filterDropdownProps: {
    name: 'filterDropdownProps',
    description: '透传给 Dropdown 的属性',
    table: {
      type: {
        summary: 'object',
      },
    },
  },
  filterDropdownVisible: {
    name: 'filterDropdownVisible',
    description: '控制 Dropdown 的 visible',
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
  filterIcon: {
    name: 'filterIcon',
    description: '自定义 filter 图标',
    table: {
      type: {
        summary: 'boolean | ReactNode | (filtered: boolean) => ReactNode',
      },
    },
  },
  filterMultiple: {
    name: 'filterMultiple',
    description: '是否多选',
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
  filteredValue: {
    name: 'filteredValue',
    description:
      '筛选的受控属性，外界可用此控制列的筛选状态，值为已筛选的 value 数组',
    table: {
      type: {
        summary: 'any[]',
      },
    },
  },
  renderFilterDropdownItem: {
    name: 'renderFilterDropdownItem',
    description: '自定义每个筛选项渲染方式',
    table: {
      type: {
        summary:
          '({ value: any, text: any, onChange: Function, level: number, ...otherProps }) => ReactNode',
      },
    },
  },
  sortOrder: {
    name: 'sortOrder',
    description: '排序的受控属性，外界可用此控制列的排序',
    table: {
      type: {
        summary: "'ascend' | 'descend' |false",
      },
    },
  },
  sorter: {
    name: 'sorter',
    description: '排序函数',
    table: {
      type: {
        summary:
          "boolean | (r1: RecordType, r2: RecordType, sortOrder: 'ascend' | 'descend') => number",
      },
    },
  },
  sortIcon: {
    name: 'sortIcon',
    description:
      '自定义 sort 图标，返回的节点控制了整个排序按钮，包含升序和降序。需根据 sortOrder 控制高亮行为.',
    table: {
      type: {
        summary: '(props: { sortOrder }) => ReactNode',
      },
    },
  },
  ellipsis: {
    name: 'ellipsis',
    description: '是否当字段超过最大宽度，做省略。',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
};
