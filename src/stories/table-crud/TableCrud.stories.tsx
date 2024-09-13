import TableCrud from '@/components/table-crud';
import type { Meta, StoryObj } from '@storybook/react';
import { Sample } from '../interface';
import { MockGeneralApi } from './mock';
import { Button } from '@douyinfe/semi-ui';
import { fn } from '@storybook/test';

const viewModelOption = ['list', 'page', 'tree', 'cardPage', 'scrollingList'];

const meta: Meta<typeof TableCrud<Sample>> = {
  title: 'Component/TableCrud',
  argTypes: {
    id: {
      description: 'table row key标识',
      type: 'string',
      table: {
        defaultValue: {
          summary: 'id',
        },
      },
    },
    mode: {
      description: 'table 视图模式',
      control: viewModelOption,
      table: {
        type: {
          summary: 'ViewModel',
        },
        defaultValue: {
          summary: 'list',
        },
      },
      type: {
        required: true,
      },
    },
    width: {
      description: 'table width',
      table: {
        type: {
          summary: 'string | number | auto',
        },
      },
    },
    height: {
      description: 'table height',
      table: {
        type: {
          summary: 'string | number | auto',
        },
      },
    },
    fixed: {
      description: 'table fixed',
      type: 'boolean',
    },
    dataSource: {
      description: 'table 数据源',
      table: {
        type: {
          summary: 'T[]',
        },
      },
    },
    columns: {
      description: '数据字段',
      table: {
        type: {
          summary: 'TableColumnProps<T>[]',
        },
      },
      type: {
        required: true,
      },
    },
    operability: {
      description:
        '是否具有可操作（意味着能否用api进行crud、能否点击操作按钮进行操作...）',
      type: 'boolean',
    },
    disableDefaultBehavior: {
      description: '是否禁止给字段分配值',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    search: {
      description: 'search 参数',
      table: {
        type: {
          summary: 'TableSearch',
        },
      },
    },
    toolbar: {
      description: 'table工具栏，组件中包含默认的工具栏，可以自定义添加',
      table: {
        type: {
          summary: 'TableToolbar',
        },
      },
    },
    operateBar: {
      description: '操作列参数',
      table: {
        type: {
          summary: 'TableOperateBar',
        },
      },
    },
    params: {
      description: '触发初始化的筛选',
      table: {
        type: {
          summary: 'Partial<T>',
        },
      },
    },
    card: {
      description: '当mode=cardPage时生效，自定义card配置参数',
      table: {
        type: {
          summary: 'TableCard<T>',
        },
      },
    },
    modal: {
      description: '表单弹窗配置',
      table: {
        type: {
          summary: "FormProps<T>['modal']",
        },
      },
    },
    useApi: {
      description: '传入的Api',
      table: {
        type: {
          summary: '(() => GeneralApi<T>) | GeneralApi<T>',
        },
      },
    },
    event: {
      description: '内置事件集',
      table: {
        type: {
          summary: 'TableEvent<T>',
        },
      },
    },
    scope: {
      description: '表单联动使用的域数据',
      table: {
        type: {
          summary: 'FormScope<T>',
        },
      },
    },
    getTableContext: {
      description: '获取table context实例',
      table: {
        type: {
          summary: '(tableContext: TableContext<T>) => void',
        },
      },
    },
    title: {
      description: 'table的标题',
      type: 'string',
    },
    bordered: {
      description: 'table是否有边框',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    expandAllRows: {
      description: '是否展开所有的数据，当mode=cardPage时生效',
      table: {
        type: {
          summary: 'boolean',
        },
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    mode: 'list',
    columns: [
      {
        label: 'name',
        type: 'input',
        field: 'name',
      },
    ],
    useApi: new MockGeneralApi(),
    getTableContext: fn(),
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Input: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'input',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ name: 'test' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Number: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'number',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ name: 1 }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Textarea: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'textarea',
        field: 'name',
        search: true,
        width: '10px',
      },
    ],
    useApi: new MockGeneralApi([
      { id: 1, name: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa' },
    ]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Password: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'password',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'aaaaaa' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Rate: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'rate',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 2 }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Slider: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'slider',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 2 }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Select: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'select',
        field: 'name',
        search: true,
        optionList: [{ value: 1, label: '分类' }],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 1 }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const TreeSelect: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'treeSelect',
        field: 'name',
        search: true,
        treeData: [
          {
            key: '0',
            label: '0',
            children: [{ key: '0-1', label: '0-1' }],
          },
        ],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '0-1' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Cascade: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'cascade',
        field: 'name',
        search: true,
        treeData: [
          {
            key: '0',
            label: '0',
            children: [{ key: '0-1', label: '0-1' }],
          },
        ],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '0-1' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Transfer: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'transfer',
        field: 'name',
        search: true,
        dataSource: [{ label: '分类', key: '1' }],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: ['1'] }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Radio: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'radio',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: true }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Switch: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'switch',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: true }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Checkbox: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'checkbox',
        field: 'name',
        search: true,
        options: [
          { value: '0', label: '分类1' },
          { value: '1', label: '分类2' },
        ],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: ['0', '1'] }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Date: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'date',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '2024-01-01' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const DateRange: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'dateRange',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([
      { id: 1, name: ['2024-01-01 10:01:01', '2024-01-01 10:01:01'] },
    ]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Time: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'time',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '10:01:01' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const TimeRange: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'timeRange',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: ['10:01:01', '10:01:01'] }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Upload: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'upload',
        field: 'name',
        search: true,
        action: 'https://api.semi.design/upload',
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '未实现' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const UploadDrag: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'uploadDrag',
        field: 'name',
        search: true,
        action: 'https://api.semi.design/upload',
        dragMainText: '点击上传文件或拖拽文件到这里',
        dragSubText: '支持任意类型文件',
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '未实现' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Icon: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'icon',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'IconAbsoluteStroked' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Color: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'color',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

// TODO 未实现
export const SelectGroup: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'selectGroup',
        field: 'name',
        search: true,
        optionList: [{ group: { value: '1', label: '分组' } }],
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: '1' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const JsonObject: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'jsonObject',
        field: 'name',
        search: true,
        columns: [
          {
            field: 'name',
            type: 'input',
            label: 'name',
          },
          {
            field: 'password',
            type: 'password',
            label: 'password',
          },
        ],
      },
    ],
    useApi: new MockGeneralApi([
      { id: 1, name: { name: 'name', password: 'password' } },
    ]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const JsonArray: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'jsonArray',
        field: 'name',
        search: true,
        columns: [
          {
            field: 'name',
            type: 'input',
            label: 'name',
          },
          {
            field: 'password',
            type: 'password',
            label: 'password',
          },
        ],
      },
    ],
    useApi: new MockGeneralApi([
      { id: 1, name: [{ name: 'name', password: 'password' }] },
    ]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const User: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'user',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Role: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'role',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Org: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'org',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Post: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'post',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const CodeEditor: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'codeEditor',
        field: 'name',
        search: true,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};

export const Slot: Story = {
  args: {
    columns: [
      {
        label: 'name',
        type: 'slot',
        field: 'name',
        search: true,
        component: <Button>测试slot</Button>,
      },
    ],
    useApi: new MockGeneralApi([{ id: 1, name: 'amber' }]),
  },
  render: (args) => {
    return <TableCrud {...args} />;
  },
};
