import {
  TreePanelApi,
  TreePanelContext,
  TreePanelOperatorBar,
  TreePanelToolbar,
} from '@/components/tree';
import type { Property, SampleTree } from '../interface';

export const treePanelToolbarArgsType: Property<TreePanelToolbar<SampleTree>> =
  {
    showAdd: {
      name: 'showAdd',
      description: '是否显示增加按钮',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showSelectAll: {
      name: 'showSelectAll',
      description: '是否显示全选',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    showDeSelectAll: {
      name: 'showDeSelectAll',
      description: '是否显示取消全选',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    append: {
      name: 'append',
      description: '自定义追加按钮',
      table: {
        type: {
          summary: 'Toolbar<T>[]',
        },
      },
    },
  };

export const treePanelOperatorBarArgsType: Property<
  TreePanelOperatorBar<SampleTree>
> = {
  showAdd: {
    name: 'showAdd',
    description: '是否显示增加操作',
    table: {
      type: {
        summary:
          'boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
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
        summary:
          'boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
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
        summary:
          'boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
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
        summary:
          ' boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showSubordinate: {
    name: 'showSubordinate',
    description: '是否显示添加下级',
    table: {
      type: {
        summary:
          'boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'false',
      },
    },
  },
  showPeer: {
    name: 'showPeer',
    description: '是否显示添加同级',
    table: {
      type: {
        summary:
          'boolean | ((record: T, treePanelContext: TreePanelContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'false',
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

export const treePanelApiArgsType: Property<TreePanelApi<SampleTree>> = {
  tree: {
    name: 'tree',
    description: '树查询',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  details: {
    name: 'details',
    description: '详细',
    table: {
      type: {
        summary: '(record: T) => void',
      },
    },
  },
  edit: {
    name: 'edit',
    description: '编辑',
    table: {
      type: {
        summary: '(record: T) => void',
      },
    },
  },
  remove: {
    name: 'remove',
    description: '删除',
    table: {
      type: {
        summary: '(ids: string[]) => void',
      },
    },
  },
  getSelectKey: {
    name: 'getSelectKey',
    description: '单选情况下获取选中的key',
    table: {
      type: {
        summary: '() => string',
      },
    },
  },
  getSelectKeys: {
    name: 'getSelectKeys',
    description: '多选情况下获取选中的所有值',
    table: {
      type: {
        summary: '() => string[]',
      },
    },
  },
  selectAll: {
    name: 'selectAll',
    description: '多选情况下，全选',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  unSelectAll: {
    name: 'unSelectAll',
    description: '多选情况下，取消全选',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
};

export const treePanelContextArgsType: Property<TreePanelContext<SampleTree>> =
  {
    props: {
      name: 'props',
      description: 'TreePanelProps',
      table: {
        type: {
          summary: 'TreePanelProps',
        },
      },
    },
    loading: {
      name: 'loading',
      description: '是否进行加载',
      type: 'boolean',
    },
    tree: {
      name: 'tree',
      description: '树数据源',
      table: {
        type: {
          summary: 'TreeNodeData[]',
        },
      },
    },
    dataSource: {
      name: 'dataSource',
      description: '数据源',
      table: {
        type: {
          summary: 'T[]',
        },
      },
    },
    selectKey: {
      name: 'selectKey',
      description: '选中的Key',
      type: 'string',
    },
    selectKeys: {
      name: 'selectKeys',
      description: '选中的Key的集合',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    allKeys: {
      name: 'allKeys',
      description: '树节点中所有的Key',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    formContext: {
      name: 'formContext',
      description: '树中使用的表单数据',
      table: {
        type: {
          summary: 'FormContext<T>',
        },
      },
    },
    setFormContext: {
      name: 'setFormContext',
      description: '设置树的表单',
      table: {
        type: {
          summary: '(formContext: FormContext<T>) => void',
        },
      },
    },
  };
