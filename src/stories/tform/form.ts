import { FormContext, FormModal } from '../../components/uni-form';
import type { Property, Sample } from '../interface';

const formStatusOptions = ['add', 'edit', 'details'];
const modelSizeOptions = ['small', 'medium', 'large', 'full-width'];

export const formContextArgsType: Property<FormContext<Sample>> = {
  title: {
    name: 'title',
    description: '表单标题',
    type: 'string',
  },
  icon: {
    name: 'icon',
    description: '表单icon',
    table: {
      type: {
        summary: 'React.ReactNode',
      },
    },
  },
  type: {
    name: 'type',
    description: '表单类型',
    options: formStatusOptions,
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  visible: {
    name: 'visible',
    description: '是否显示',
    type: 'boolean',
  },
  loading: {
    name: 'loading',
    description: '是否加载',
    type: 'boolean',
  },
  columns: {
    name: 'columns',
    description: '表单字段集合',
    table: {
      type: {
        summary: 'FormColumnProps<T>[]',
      },
    },
  },
  values: {
    name: 'values',
    description: '表单绑定的值',
    table: {
      type: {
        summary: 'Partial<T>',
      },
    },
  },
  dataSet: {
    name: 'dataSet',
    description: 'dic或者remote远端数据的数据集',
    table: {
      type: {
        summary: 'Record<string, Constant[]>',
      },
    },
  },
  decorator: {
    name: 'decorator',
    description: '表单 decorator',
    table: {
      type: {
        summary: 'FormColumnDecorator<T>',
      },
    },
  },
  valid: {
    name: 'valid',
    description: '验证',
    type: 'boolean',
  },
  validating: {
    name: 'validating',
    description: '是否被验证',
    type: 'boolean',
  },
  validate: {
    name: 'validate',
    description: '进行验证',
    table: {
      type: {
        summary: 'pattern?: FormPathPattern) => any',
      },
    },
  },
  submit: {
    name: 'submit',
    description: '提交表单',
    table: {
      type: {
        summary:
          '(onSubmit?: (values: ValueType) => void | Promise<T>) => Promise<T>',
      },
    },
  },
  reset: {
    name: 'reset',
    description: '重置表单',
    table: {
      type: {
        summary:
          '(pattern?: FormPathPattern, options?: IFieldResetOptions) => Promise<void>',
      },
    },
  },
  open: {
    name: 'open',
    description: '打开表单弹窗如果是采用弹窗的话',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  close: {
    name: 'close',
    description: '关闭表单弹窗如果是采用弹窗的话',
    table: {
      type: {
        summary: '() => void',
      },
    },
  },
  getDefaultValues: {
    name: 'getDefaultValues',
    description: '获取字段绑定的默认值',
    table: {
      type: {
        summary: '() => Partial<T>',
      },
    },
  },
  getValue: {
    name: 'getValue',
    description: '获取表单绑定的值',
    table: {
      type: {
        summary: '(field: keyof T) => any',
      },
    },
  },
  getValues: {
    name: 'getValues',
    description: '获取表单的值',
    table: {
      type: {
        summary: '() => Partial<T>',
      },
    },
  },
  setValue: {
    name: 'setValue',
    description: '设置表单字段值',
    table: {
      type: {
        summary: '(field: keyof T, value: any) => void',
      },
    },
  },
  setValues: {
    name: 'setValues',
    description: '设置表单值',
    table: {
      type: {
        summary: '(values: Partial<T>) => void',
      },
    },
  },
  getColumn: {
    name: 'getColumn',
    description: '根据字段获取值具体信息',
    table: {
      type: {
        summary: '(field: keyof T) => FormColumnProps<T> | undefined',
      },
    },
  },
};

export const formModalArgsType: Property<FormModal<Sample>> = {
  abandon: {
    name: 'abandon',
    description: '是否抛弃使用弹窗方式打开表单',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'false',
      },
    },
  },
  size: {
    name: 'size',
    description: '弹出窗口的大小',
    options: modelSizeOptions,
    control: 'select',
    table: {
      type: {
        summary: 'stirng',
      },
      defaultValue: {
        summary: 'medium',
      },
    },
  },
  closeOnEsc: {
    name: 'closeOnEsc',
    description: 'close on esc',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showConfirm: {
    name: 'showConfirm',
    description: '是否显示确认按钮',
    table: {
      type: {
        summary: ' boolean | ((formContext: FormContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  showCancel: {
    name: 'showCancel',
    description: '是否显示关闭按钮',
    table: {
      type: {
        summary: 'boolean | ((formContext: FormContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'true',
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
          ' (| ModalButton<T>| ((formContext: FormContext<T>) => ModalButton<T> | undefined)  )[]',
      },
    },
  },
};
