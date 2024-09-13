import ListPanel from '@/components/list';
import type { Meta, StoryObj } from '@storybook/react';
import { MockGeneralApi } from './mock';

const meta: Meta<typeof ListPanel> = {
  title: 'Component/List',
  argTypes: {
    columns: {
      description: 'column 集合',
      table: {
        type: {
          summary: 'FormColumnProps<T>[]',
        },
      },
    },
    toolbar: {
      description: 'list 工具栏',
      table: {
        type: {
          summary: 'ListPanelToolbar<T>',
        },
      },
    },
    operateBar: {
      description: 'list 操作栏',
      table: {
        type: {
          summary: 'ListPanelOperatorBar<T>',
        },
      },
    },
    multiple: {
      description: '是否多选',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
    initValue: {
      description:
        '当multiple = false时启用，如果该值为null，则取接口第一条数据 @see first',
      type: 'boolean',
    },
    initValues: {
      description: '初始值（list key值），开启multiple时生效',
      type: 'boolean',
    },
    first: {
      description: '是否自动选取第一条数据',
      type: 'boolean',
    },
    useApi: {
      description: 'api',
      table: {
        type: {
          summary: '(() => GeneralApi<T>) | GeneralApi<T>',
        },
      },
    },
    onChange: {
      description: '当选中结点时回调',
      table: {
        type: {
          summary: '(value?: string) => void',
        },
      },
    },
    wrap: {
      description: '每个实体转换为TreeNodeData',
      table: {
        type: {
          summary: '(entity: T) => TreeNodeData',
          detail:
            '(entity) => { return { key: entity.id, label: entity.name } }',
        },
      },
    },
    getListPanelApi: {
      description: 'ListApi',
      table: {
        type: {
          summary: '(api: ListPanelApi<T>) => void',
        },
      },
    },
    getListPanelContext: {
      description: 'ListPanelContext',
      table: {
        type: {
          summary: '(context: ListPanelContext<T>) => void',
        },
      },
    },
  },
  args: {
    wrap: (entity) => {
      return { key: entity.id, label: entity.name };
    },
    columns: [
      {
        label: 'name',
        type: 'input',
        field: 'name',
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '123' }]),
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <ListPanel {...args} />;
  },
};

export default meta;
