import TForm from '@/components/tform/TForm';
import type { Meta, StoryObj } from '@storybook/react';
import { sampleColumns } from './column';
import { Sample } from '../interface';
import { useRef } from 'react';
import { FormColumnProps, FormContext } from '@/components/tform';
import { Button } from '@douyinfe/semi-ui';
import { fn } from '@storybook/test';
import { IconUpload } from '@douyinfe/semi-icons';

const modeOptions = ['tree', 'table', 'simply'];
const formStatusOptions = ['add', 'edit', 'details'];
const alignOptions = ['right', 'left'];
const sizeOptions = ['small', 'default', 'large'];
const layoutOptions = ['vertical', 'horizontal', 'inline'];
const directionOptions = ['rtl', 'ltr'];
const tooltipLayoutOptions = ['icon', 'text'];
const feedbackLayoutOptions = ['loose', 'terse', 'popover'];

const meta: Meta<typeof TForm<Sample>> = {
  title: 'Component/TForm',
  component: TForm,
  argTypes: {
    mode: {
      options: modeOptions,
      description: '表单模型标识',
      table: {
        type: {
          summary: 'string',
        },
      },
      control: 'select',
      type: {
        required: true,
      },
    },
    title: {
      type: 'string',
      description: '表单标题',
    },
    columns: {
      description: '字段集合',
      table: {
        type: {
          summary: 'FormColumnProps[]',
        },
      },
    },
    type: {
      description: '表单类型',
      options: formStatusOptions,
      table: {
        type: {
          summary: 'FormStatus',
        },
      },
    },
    decorator: {
      description: 'form decorator',
      table: {
        type: {
          summary: 'FormColumnDecorator',
        },
      },
    },
    params: {
      description: '表单初始化参数',
      table: {
        type: {
          summary: 'Partial<T>',
        },
      },
    },
    immediateVisible: {
      description: '是否立即显示',
      type: 'boolean',
    },
    showValidateErrorNotification: {
      description: '是否显示表单验证提示消息',
      type: 'boolean',
    },
    event: {
      description: '内置事件回调',
      table: {
        type: {
          summary: 'FormEvent<T>',
        },
      },
    },
    modal: {
      description: '弹窗表单配置',
      table: {
        type: {
          summary: 'FormModal<T>',
        },
      },
    },
    slotBottom: {
      description: '表单底的组件',
      table: {
        type: {
          summary: 'React.ReactNode',
        },
      },
    },
    scope: {
      description: '用于表单联动的scope数据',
      table: {
        type: {
          summary: 'Record<string, object>',
        },
      },
    },
    useApi: {
      description: '给表单提供的外部api数据',
      table: {
        type: {
          summary: '(() => GeneralApi<T>) | GeneralApi<T>',
        },
      },
    },
    onOk: {
      description: '当表单提交没有发生错误时回调.',
      table: {
        type: {
          summary: 'formContext: FormContext<T>) => void',
        },
      },
    },
    onCancel: {
      description: '当表单取消时回调',
      table: {
        type: {
          summary: '(formContext: FormContext<T>) => void',
        },
      },
    },
    onError: {
      description: '当表单提交发生错误时回调',
      table: {
        type: {
          summary: '(err: Error, formContext: FormContext<T>) => void',
        },
      },
    },
    getFormContext: {
      description: '获取表单上下文',
      table: {
        type: {
          summary: 'getFormContext?: (formContext: FormContext<T>) => void',
        },
      },
    },
    colon: {
      description: '是否有冒号',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
    labelAlign: {
      description: '统一配置label 的 text-align 值',
      options: alignOptions,
      control: 'select',
      table: {
        defaultValue: {
          summary: 'right',
        },
      },
    },
    wrapperAlign: {
      description: '包装 align 值',
      options: alignOptions,
      control: 'select',
      table: {
        defaultValue: {
          summary: 'left',
        },
      },
    },
    labelWrap: {
      description: 'label wrapper',
      type: 'number',
      table: {},
    },
    labelWidth: {
      description: 'label width',
      type: 'number',
      table: {
        defaultValue: {
          summary: '120',
        },
      },
    },
    wrapperWidth: {
      description: 'wrapper width',
      type: 'number',
    },
    wrapperWrap: {
      description: 'wrapper wrap',
      type: 'boolean',
    },
    labelCol: {
      description: '每个 Field 的 label 标签布局',
      type: 'number',
    },
    wrapperCol: {
      description: 'wrapper 布局',
      type: 'number',
    },
    fullness: {
      description: '表单是否充满',
      type: 'boolean',
    },
    size: {
      description: '表单大小',
      options: sizeOptions,
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'default',
        },
      },
    },
    layout: {
      description: '表单布局',
      options: layoutOptions,
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'horizontal',
        },
      },
    },
    direction: {
      description: '表单方向',
      options: directionOptions,
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'ltr',
        },
      },
    },
    inset: {
      description: '是否是嵌入的',
      type: 'boolean',
    },
    shallow: {
      type: 'boolean',
    },
    tooltipLayout: {
      description: 'tooltip layout',
      options: tooltipLayoutOptions,
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
        defaultValue: {
          summary: 'text',
        },
      },
    },
    feedbackLayout: {
      description: 'feedback layout',
      options: feedbackLayoutOptions,
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
      },
    },
    bordered: {
      description: '是否有边框',
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'false',
        },
      },
    },
  },
  args: {
    title: 'Test',
    mode: 'simply',
    columns: sampleColumns,
    modal: {
      abandon: true,
    },
    getFormContext: fn(),
    onCancel: fn(),
    onOk: fn(),
    onError: fn(),
  },
};

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Input: Story = {
  args: {
    columns: [{ field: 'id', type: 'input', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Number: Story = {
  args: {
    columns: [{ field: 'id', type: 'number', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Textarea: Story = {
  args: {
    columns: [{ field: 'id', type: 'textarea', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Password: Story = {
  args: {
    columns: [{ field: 'id', type: 'password', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Rate: Story = {
  args: {
    columns: [{ field: 'id', type: 'rate', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Slider: Story = {
  args: {
    columns: [{ field: 'id', type: 'slider', label: 'id' }],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Select: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'select',
        label: 'id',
        optionList: [{ value: 1, label: '1' }],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const TreeSelect: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'treeSelect',
        label: 'id',
        treeData: [
          {
            key: '0',
            label: '0',
            children: [{ key: '0-1', label: '0-1' }],
          },
        ],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Cascade: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'cascade',
        label: 'id',
        treeData: [
          {
            key: '0',
            label: '0',
            children: [{ key: '0-1', label: '0-1' }],
          },
        ],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Transfer: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'transfer',
        label: 'id',
        dataSource: [{ label: '1', key: '1' }],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Radio: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'radio',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Switch: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'switch',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Checkbox: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'checkbox',
        label: 'id',
        options: [{ value: '0', label: '0' }],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Date: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'date',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const DateRange: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'dateRange',
        label: 'id',
        dateType: 'dateRange',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Time: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'time',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const TimeRange: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'timeRange',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Upload: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'upload',
        label: 'id',
        action: 'https://api.semi.design/upload',
        children: (
          <Button icon={<IconUpload />} theme="light">
            上传
          </Button>
        ),
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const UploadDrag: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'uploadDrag',
        label: 'id',
        action: 'https://api.semi.design/upload',
        dragMainText: '点击上传文件或拖拽文件到这里',
        dragSubText: '支持任意类型文件',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Icon: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'icon',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Color: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'color',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const SelectGroup: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'selectGroup',
        label: 'id',
        optionList: [{ group: { value: '分组', label: '分组' } }],
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const JsonObject: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'jsonObject',
        label: 'id',
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
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const JsonArray: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'jsonArray',
        label: 'id',
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
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const User: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'user',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Role: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'role',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Org: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'org',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Post: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'post',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const CodeEditor: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'codeEditor',
        label: 'id',
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Slot: Story = {
  args: {
    columns: [
      {
        field: 'id',
        type: 'slot',
        label: 'id',
        component: <Button>测试slot</Button>,
      },
    ],
  },
  render: (args) => {
    return <TForm<Sample> {...args}></TForm>;
  },
};

export const Dialog: Story = {
  args: {
    columns: [{ field: 'id', type: 'input', label: 'id' }],
    modal: {
      abandon: false,
    },
  },
  render: (args) => {
    const formContextRef = useRef<FormContext<Sample>>();
    return (
      <>
        <TForm<Sample>
          {...args}
          getFormContext={(context) => {
            formContextRef.current = context;
            args.getFormContext?.(context);
          }}
          onCancel={(context) => {
            context.close();
            args.onCancel?.(context);
          }}
          onOk={(context) => {
            context.close();
            args.onOk?.(context);
          }}
        ></TForm>
        <Button onClick={() => formContextRef.current?.open()}>打开</Button>
      </>
    );
  },
};

const columns: FormColumnProps<Sample>[] = [];

for (let index = 0; index < 100; index++) {
  columns.push({ field: 'id' + index, type: 'input', label: 'id' + index });
}

export const Performance: Story = {
  args: {
    columns: columns,
    modal: {
      abandon: false,
    },
  },
  render: (args) => {
    const formContextRef = useRef<FormContext<Sample>>();
    return (
      <>
        <TForm<Sample>
          {...args}
          getFormContext={(context) => {
            formContextRef.current = context;
            args.getFormContext?.(context);
          }}
          onCancel={(context) => {
            context.close();
            args.onCancel?.(context);
          }}
          onOk={(context) => {
            context.close();
            args.onOk?.(context);
          }}
        ></TForm>
        <Button onClick={() => formContextRef.current?.open()}>打开</Button>
      </>
    );
  },
};

export default meta;
