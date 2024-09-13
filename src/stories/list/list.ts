import {
  ListPanelApi,
  ListPanelContext,
  ListPanelOperatorBar,
  ListPanelToolbar,
} from '@/components/list/interface';
import type { Property, Sample } from '../interface';

export const listPanelToolbarArgsType: Property<ListPanelToolbar<Sample>> = {
  showAdd: {
    name: 'showAdd',
    description: '是否显示增加按钮',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'false',
      },
    },
  },
  showSelectAll: {
    name: 'showSelectAll',
    description: '是否显示全选按钮，当属性multiple = true时生效',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showDeselectAll: {
    name: 'showDeselectAll',
    description: '是否显示取消全选按钮，当属性multiple = true时生效',
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
        summary: 'Toolbar<T>[];',
      },
    },
  },
};

export const listPanelOperatorBarArgsType: Property<
  ListPanelOperatorBar<Sample>
> = {
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
  append: {
    name: 'append',
    description: '自定义追加',
    table: {
      type: {
        summary: 'OperateToolbar<T> | ((record: T) => OperateToolbar<T>))[]',
      },
    },
  },
};

export const listPanelApiArgsType: Property<ListPanelApi<Sample>> = {
  list: {
    name: 'list',
    description: '列表查询操作',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  details: {
    name: 'details',
    description: '列表详情操作',
    table: {
      type: {
        summary: '(record: T) => void',
      },
    },
  },
  edit: {
    name: 'edit',
    description: '列表编辑操作',
    table: {
      type: {
        summary: '(record: T) => void',
      },
    },
  },
  remove: {
    name: 'remove',
    description: '列表删除操作',
    table: {
      type: {
        summary: '(ids: string[]) => void',
      },
    },
  },
  selectAll: {
    name: 'selectAll',
    description: '列表全选操作',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  unSelectAll: {
    name: 'unSelectAll',
    description: '列表取消全选操作',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  getSelectKey: {
    name: 'getSelectKey',
    description: '单选情况下获取选中的Key',
    table: {
      type: {
        summary: '() => string',
      },
    },
  },
  getSelectKeys: {
    name: 'getSelectKeys',
    description: '多选情况下获取选中的实体id列表',
    table: {
      type: {
        summary: '() => string[]',
      },
    },
  },
};

export const listPanelContextArgsType: Property<ListPanelContext<Sample>> = {
  props: {
    name: 'props',
    description: 'ListPanelProps',
    table: {
      type: {
        summary: 'ListPanelProps<T>',
      },
    },
  },
  loading: {
    name: 'loading',
    description: '是否进行加载',
    type: 'boolean',
  },
  list: {
    name: 'list',
    description: 'the wrap original data source to list',
    table: {
      type: {
        summary: 'TreeNodeData[]',
      },
    },
  },
  dataSource: {
    name: 'dataSource',
    description: 'the original list panel data source',
    table: {
      type: {
        summary: 'T[]',
      },
    },
  },
  selectKey: {
    name: 'selectKey',
    description: 'the list select key',
    type: 'string',
  },
  selectKeys: {
    name: 'selectKeys',
    description: 'the list select keys',
    table: {
      type: {
        summary: 'string[]',
      },
    },
  },
  formContext: {
    name: 'formContext',
    description: 'list form context',
    table: {
      type: {
        summary: 'FormContext<T>;',
      },
    },
  },
  setFormContext: {
    name: 'setFormContext',
    description: 'set form context',
    table: {
      type: {
        summary: '(formContext: FormContext<T>) => void',
      },
    },
  },
};
