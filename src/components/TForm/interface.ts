import { GeneralApi, IdEntity, TreeGeneralApi } from '@/api/interface';
import { Constant } from '@/constant/interface';
import { FormApi, RuleItem } from '@douyinfe/semi-ui/lib/es/form';
import { FormColumnDecorator } from './form';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { Dic } from '@/api/system/dic';

export type ColumnType =
  | 'input'
  | 'number'
  | 'select'
  | 'treeSelect'
  | 'radio'
  | 'textarea'
  | 'icon'
  | 'color'
  | 'date'
  | 'undefined';

export type FormProps<T extends IdEntity> = {
  // 表单模型标识
  model: 'tree' | 'table' | string;
  // 字段集合
  columns: FormColumnProps<T>[];
  decorator?: FormColumnDecorator<T>;
  // 父级传递
  params?: T;
  // 是否立即显示
  immediateVisible?: boolean;
  // api
  useApi?: () => GeneralApi<T>;
  // 操作完成的回调
  onOk?: (formContext: FormContext<T>) => void;
  // 发生错误时回调
  onError?: (err: Error, formContext: FormContext<T>) => void;
  // 取消时回调
  onCancel?: (formContext: FormContext<T>) => void;
  // 获取表单上下文
  getFormContext?: (formContext?: FormContext<T>) => void;

  validateFields?: (values: Record<string, any>) => string;
};

export type FormColumnProps<T extends IdEntity> = {
  // 字段标识
  field: string;
  // 字段类型
  type: ColumnType;
  // 字段名称
  label?: string;
  // 快捷的表单必填项，如果search = true，则默认 = false
  require?: boolean | ((record: T) => boolean);
  // 表格表单校验规则
  rules?: RuleItem[];
  // 表单字段初始值
  initValue?: any;
  // 表单文本拓展
  extraText?: string;
  // 行分割的数目，默认为12
  span?: 6 | 12 | 24;
  // 是否单独一行
  line?: boolean;
  // 当前column是否在form中显示，默认为true
  form?: boolean | ((formContext: FormContext<T>) => boolean);
};

// Input 组件
export type FormInputColumnProps<T extends IdEntity> = FormColumnProps<T> & {};

// InputNumber 组件
export type FormNumberColumnProps<T extends IdEntity> = FormColumnProps<T> & {};

// Select 组件
export type FormSelectColumnProps<T extends IdEntity> = FormColumnProps<T> & {
  // 是否可搜索
  filter?: boolean;
  // 是否多选
  multiple?: boolean;
  optionList?: Constant[];
  // 字典项编码，如果开启则不使用optionList的值，并查询系统字典项接口进行渲染
  dic?: string;
};

// TreeSelect 组件
export type FormTreeSelectColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {
    treeData:
      | TreeNodeData[]
      | ((formContext?: FormContext<T>) => TreeNodeData[]);
    // 是否支持多选
    multiple?: boolean;
    // 是否根据输入项进行筛选
    filterTreeNode?: boolean;
    // 当值不为空时，trigger 是否展示清除按钮
    showClear?: boolean;
    // 是否显示搜索框的清除按钮
    showSearchClear?: boolean;
    // 设置是否默认展开所有节点
    expandAll?: boolean;
  };

// Radio 组件
export type FormRadioColumnProps<T extends IdEntity> = FormColumnProps<T> & {};

// textarea 组件
export type FormTextAreaColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {};

// date 组件
export type FormDateColumnProps<T extends IdEntity> = FormColumnProps<T> & {
  // 默认为datetime
  dateType?:
    | 'date'
    | 'dateRange'
    | 'year'
    | 'month'
    | 'dateTime'
    | 'dateTimeRange'
    | 'monthRange';
};

export type FormContext<T extends IdEntity> = {
  // 弹窗类型
  type: 'add' | 'edit' | 'details' | undefined;
  props: FormProps<T>;
  visible: boolean;
  // 表单加载
  loading: boolean;
  // 表单绑定的值
  values?: T;
  formApi?: FormApi;
  dicApi: TreeGeneralApi<Dic>;
  // 字典项值
  dicValues: Record<string, Constant[]>;
  // 字段转换为semi props
  decorator: FormColumnDecorator<T>;
  // 创建新上下文
  newContext: (context: FormContext<T>) => void;
  // 获取字段绑定的默认值
  getDefaultValues: () => Record<string, any>;
  // 开启form弹窗
  open: () => void;
  // 关闭form弹窗
  close: () => void;
};
