import {
  FormCascadeColumnProps,
  FormCheckboxColumnProps,
  FormInputColumnProps,
  FormJsonArrayColumnProps,
  FormJsonObjectColumnProps,
  FormSelectColumnProps,
  FormSelectGroupColumnProps,
  FormSlotColumnProps,
  FormTreeSelectColumnProps,
} from '@/components/tform/components';
import { FormColumnProps, RemoteProps } from '../../components/tform';
import type { Property, Sample } from '../interface';
import { Tree } from '@/api';

export const columnArgsType: Property<FormColumnProps<Sample>> = {
  field: {
    name: 'field',
    description: '字段标识',
    type: {
      name: 'string',
      required: true,
    },
  },
  type: {
    name: 'type',
    description: '字段类型',
    options: [],
    table: {
      type: {
        summary: 'ColumnType',
        detail:
          'input: 文本输入\nnumber: 数字输入\ntextarea: 多行输入\npassword: 密码输入\nrate: 评分器\nslider: 滑动条\nselect: 选择框\ntreeSelect: 树选择\ncascade: 集联选择\ntransfer: 穿梭框\nradio: 单选框\ncheckbox: 复选框\nswitch: 开关\ndate: 日期选择\ndateRange: 日期范围\ntime: 时间\ntimeRange: 时间范围\nupload: 上传\nuploadDrag: 拖拽上传\nicon: 图表\ncolor: 色彩选择\nselectGroup: 选择组\njsonObject: JSON对象\njsonArray: JSON数组\nuser: 用户选择\norg: 组织选择\npost: 岗位选择\nrole: 角色选择\ncodeEditor: 代码编辑器\nslot: 自定义组件\nundefined: 未定义\n',
      },
      defaultValue: {
        summary: 'input',
      },
    },
    type: {
      required: true,
    },
  },
  index: {
    name: 'index',
    description: '字段位置索引',
    type: 'number',
    table: {
      defaultValue: {
        summary: '所在数组的位置',
      },
    },
  },
  disabled: {
    name: 'disabled',
    description: '是否可用',
    type: 'number',
    table: {
      defaultValue: {
        summary: 'true',
      },
    },
  },
  label: {
    name: 'label',
    description: '字段名称',
    type: {
      name: 'string',
    },
  },
  require: {
    name: 'require',
    table: {
      type: {
        summary: 'boolean | ((record: T) => boolean)',
      },
      defaultValue: {
        summary: 'false',
      },
    },
    description: '快捷的表单必填项，如果search = true，则默认 = false',
  },
  rules: {
    name: 'rules',
    description: '表格表单校验规则',
    table: {
      type: {
        summary: 'RuleItem',
        detail: '详细看semi https://semi.design/zh-CN/input/form',
      },
    },
  },
  initValue: {
    name: 'initValue',
    description: '表单字段初始值',
    table: {
      type: {
        summary: "T[FormColumnProps<T>['field']]",
      },
    },
  },
  extraText: {
    name: 'extraText',
    description: '表单文本拓展',
    table: {
      type: {
        summary: 'string | React.ReactNode',
      },
    },
  },
  span: {
    name: 'span',
    description: '行分割的数目，默认为12',
    table: {
      defaultValue: {
        summary: '12',
      },
      type: {
        summary: 'number',
        detail: '6\n12\n24',
      },
    },
  },
  line: {
    name: 'line',
    description: '是否单独一行',
    type: 'boolean',
    table: {
      defaultValue: {
        summary: 'false',
      },
    },
  },
  form: {
    name: 'form',
    description: '当前column是否在form中显示，默认为true',
    table: {
      type: {
        summary: 'boolean | ((formContext: FormContext<T>) => boolean)',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  validateTrigger: {
    name: 'validateTrigger',
    description:
      "触发校验的时机 触发校验的时机，可选值:blur/change/custom/mount，或以上值的组合['blur','change']\n1、设置为 custom 时，仅会由 formApi/fieldApi 触发校验时被触发\n2、mount（挂载时即触发一次校验",
    table: {
      type: {
        summary: "'blur' | 'change' | 'custom' | 'mount' | Array<string>",
      },
    },
  },
  reaction: {
    name: 'reaction',
    description: '基于Formily的联动',
    table: {
      type: {
        summary: 'SchemaReactions<any>',
      },
    },
  },
  relation: {
    name: 'relation',
    description: '表单联动',
  },
};

export const inputColumnArgsType: Property<FormInputColumnProps<Sample>> = {};

export const selectColumnArgsType: Property<FormSelectColumnProps<Sample>> = {
  optionList: {
    name: 'optionList',
    description: '可选项列表',
    table: {
      type: {
        summary: 'Constant[]',
        detail: '比如：[{ value: 1, label: ”1“ }]',
      },
    },
  },
  dictionary: {
    name: 'dictionary',
    description:
      '字典项Key，如果开启则不使用optionList的值，并查询系统字典项接口进行渲染',
    table: {
      type: {
        summary: 'string',
      },
    },
  },
  remote: {
    name: 'remote',
    description: '远程接口调用属性，如果开启则不适用optionList与dic',
    table: {
      type: {
        summary: 'RemoteProps',
      },
    },
  },
};

export const treeSelectColumnArgsType: Property<
  FormTreeSelectColumnProps<Tree>
> = {
  self: {
    name: 'self',
    description:
      '如果数据视图是tree panel，则该参数意义则是把当前树型视图的数据放入到treeData上',
    table: {
      type: {
        summary: 'boolean',
      },
    },
  },
  treeTransform: {
    name: 'treeTransform',
    description: 'tree转换',
    table: {
      type: {
        summary:
          '(tree: T[], labelRender?: (tree: T) => React.ReactNode) => TreeNodeData[]',
      },
    },
  },
  treeData: {
    name: 'treeData',
    description: '树数据',
    table: {
      type: {
        summary:
          'TreeNodeData[]| ((formContext?: FormContext<T>) => TreeNodeData[])',
      },
    },
  },
  remote: {
    name: 'remote',
    description: '远程接口调用属性',
    table: {
      type: {
        summary: 'RemoteProps<TreeConstant>',
      },
    },
  },
};

export const cascadeColumnArgsType: Property<FormCascadeColumnProps<Sample>> = {
  optionTree: {
    name: 'optionTree',
    description: '数据',
    table: {
      type: {
        summary:
          'TreeConstant[] | ((formContext: FormContext<T>) => TreeConstant[])',
      },
    },
  },
};

export const checkboxArgsType: Property<FormCheckboxColumnProps<Sample>> = {
  options: {
    name: 'options',
    description: '选项',
    table: {
      type: {
        summary: 'Constant[]',
      },
    },
  },
  extraText: {
    name: 'extraText',
    description: '额外的内容',
    type: 'string',
  },
};

export const selectGroupArgsType: Property<FormSelectGroupColumnProps<Sample>> =
  {
    filter: {
      name: 'filter',
      description: '是否可搜索',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    multiple: {
      name: 'multiple',
      description: '是否多选',
      table: {
        type: {
          summary: 'boolean',
        },
      },
    },
    optionList: {
      name: 'optionList',
      description: '值，这是一个分组的Constant值',
      table: {
        type: {
          summary: 'GroupConstant[]',
        },
      },
    },
    remote: {
      name: 'remote',
      description: '远程接口调用属性',
      table: {
        type: {
          summary: 'RemoteProps',
        },
      },
    },
  };

export const jsonObjectArgsType: Property<FormJsonObjectColumnProps<Sample>> = {
  columns: {
    name: 'columns',
    description: 'json 字段配置的 column 集合',
    table: {
      type: {
        summary: 'FormColumnProps<T>[]',
      },
    },
  },
};

export const jsonArrayArgsType: Property<FormJsonArrayColumnProps<Sample>> = {
  columns: {
    name: 'columns',
    description: 'json 字段配置的 column 集合',
    table: {
      type: {
        summary: 'FormColumnProps<T>[]',
      },
    },
  },
};

export const slotArgsType: Property<FormSlotColumnProps<Sample>> = {
  mode: {
    name: 'mode',
    description: 'slot 组件的展示方式',
    table: {
      type: {
        summary: 'directly | modal | slider',
      },
      defaultValue: {
        summary: 'directly',
      },
    },
  },
  component: {
    name: 'component',
    description: '渲染的 Component',
    table: {
      type: {
        summary:
          'React.FC<SlotComponentProps> | ((formContext: FormContext<T>) => React.ReactNode)',
      },
    },
  },
  shown: {
    name: 'shown',
    description:
      'slot 组件确定该如何展示，如果 slot 组件的值是 modal 或者 slider时有用，他允许react 组件以及字面量 string',
    table: {
      type: {
        summary:
          'React.ReactNode | ((formContext: FormContext<T>) => React.ReactNode) | string| ((formContext: FormContext<T>) => string)',
      },
    },
  },
  modal: {
    name: 'modal',
    description:
      '当mode=modal 时需要配置的弹窗属性，详细可以看系统的 Modular 组件',
    table: {
      type: {
        summary:
          "Omit<ModularProps, 'onConfirm' | 'onCancel' | 'beforeConfirm' | 'beforeConfirm'| 'afterClose'| 'content'>",
      },
    },
  },
  slider: {
    name: 'slider',
    description:
      '当mode=slider 时需要配置的侧边栏属性，详细可以看系统的 Slider 组件',
    table: {
      type: {
        summary:
          "Omit<SliderSideProps, 'onConfirm'| 'onCancel' | 'beforeConfirm'| 'beforeConfirm'| 'afterClose'| 'content'>",
      },
    },
  },
};

const MethodOption = [
  'GET',
  'DELETE',
  'HEAD',
  'OPTIONS',
  'POST',
  'PUT',
  'PATCH',
  'PURGE',
  'LINK',
  'UNLINK',
];

export const remotePropsType: Property<RemoteProps> = {
  url: {
    name: 'url',
    description: '请求url',
    table: {
      type: {
        summary: 'stirng',
      },
    },
    type: {
      required: true,
    },
  },
  method: {
    name: 'method',
    description: '请求method，默认为post',
    options: MethodOption,
    table: {
      type: {
        summary:
          'GET | DELETE | HEAD | OPTIONS | POST | PUT | PATCH | PURGE | LINK | UNLINK',
      },
    },
  },
  params: {
    name: 'params',
    description: '请求参数',
    table: {
      type: {
        summary: 'Pair[]',
      },
    },
  },
  headers: {
    name: 'headers',
    description: '请求头',
    table: {
      type: {
        summary: 'Pair[]',
      },
    },
  },
  internal: {
    name: 'internal',
    description: '是否是内部接口，默认为true',
    table: {
      type: {
        summary: 'boolean',
      },
      defaultValue: {
        summary: 'true',
      },
    },
  },
  mapping: {
    name: 'mapping',
    description: '返回结果转换参数',
    table: {
      type: {
        summary: 'Pair[]',
      },
    },
  },
  formatter: {
    name: 'formatter',
    description: '返回结果转换器，该值存在时，mapping属性将会失效',
    table: {
      type: {
        summary: '(result: object) => Record<string, T[]>',
      },
    },
  },
};

export const sampleColumns: FormColumnProps<Sample>[] = [
  {
    field: 'id',
    type: 'input',
    label: 'id',
  },
];
