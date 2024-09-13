import TreePanel from '@/components/tree/TreePanel';
import type { Meta, StoryObj } from '@storybook/react';
import { MockTreeGeneralApi } from './mock';
import { fn } from '@storybook/test';

const meta: Meta<typeof TreePanel> = {
  title: 'Component/Tree',
  argTypes: {
    columns: {
      description: 'columns 集合',
      table: {
        type: {
          summary: 'FormColumnProps<T>[]',
        },
      },
      type: {
        required: true,
      },
    },
    params: {
      description: '用于初始化查询参数，如果存在的话',
      table: {
        type: {
          summary: 'Partial<T>',
        },
      },
    },
    addDefaultValue: {
      description: '用于在新增时的默认值',
      table: {
        type: {
          summary: 'Partial<T>',
        },
      },
    },
    toolbar: {
      description: '工具栏',
      table: {
        type: {
          summary: 'TreePanelToolbar<T>',
        },
      },
    },
    operateBar: {
      description: '操作栏',
      table: {
        type: {
          summary: 'TreePanelOperatorBar<T>',
        },
      },
    },
    expandAll: {
      description: '是否展开所有项',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    depth: {
      description: '需求展示的树结点深度，如果不传默认展示该树的所有数据',
      type: 'number',
    },
    multiple: {
      description: '是否允许多选，开启时将会出现checkbox',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    initValue: {
      description: '初始化值',
      table: {
        type: {
          summary: "Tree['id']",
        },
      },
    },
    initValues: {
      description: '初始值（list key值），开启multiple时生效',
      table: {
        type: {
          summary: 'string[]',
        },
      },
    },
    first: {
      description: '是否默认选择第一个',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    root: {
      description: '根结点名称，如果赋值将会创建一个ROOT的虚拟结点',
      table: {
        type: {
          summary: "Tree['name'] | TreePanelRoot<T>",
        },
      },
    },
    useApi: {
      description: '使用的api',
      table: {
        type: {
          summary: '(() => TreeGeneralApi<T>) | TreeGeneralApi<T>',
        },
      },
    },
    onSelectChange: {
      description: '当选中结点时回调',
      table: {
        type: {
          summary: '(value?: string) => void',
        },
      },
    },
    onChange: {
      description: '当发生改变时回调',
      table: {
        type: {
          summary: '(value?: T) => void',
        },
      },
    },
    label: {
      description: '渲染每个结点label的样式',
      table: {
        type: {
          summary: 'tree: T) => string | React.ReactNode',
        },
      },
    },
    getTreePanelApi: {
      description: '获取 TreePanelApi',
      table: {
        type: {
          summary: '(treePanelApi: TreePanelApi<T>) => void',
        },
      },
    },
    getTreePanelContext: {
      description: '获取 TreePanelContext',
      table: {
        type: {
          summary: '(context: TreePanelContext<T>) => void',
        },
      },
    },
  },
  args: {
    columns: [
      {
        label: 'name',
        type: 'input',
        field: 'name',
      },
    ],
    useApi: new MockTreeGeneralApi([{ id: 1, name: '123' }]),
    onChange: fn(),
    onSelectChange: fn(),
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <TreePanel {...args} />;
  },
};

export default meta;
