import { Entity, GeneralApi } from '@/api';
import { Constant } from '@/constant/interface';
import { RuleItem } from '@douyinfe/semi-ui/lib/es/form';
import { FormColumnDecorator } from './form';
import { Method } from 'axios';
import { SchemaReactions } from '@formily/json-schema';
import { Form as FormType } from '@formily/core';
import { Helper } from '../interface';
import { IFormLayoutProps } from '@clearx/formily-semi';

export type Pair = {
  key: string;
  value: any;
};

export type ColumnType =
  // 文本输入
  | 'input'
  // 数字输入
  | 'number'
  // 多行输入
  | 'textarea'
  // 密码输入
  | 'password'
  // 评分器
  | 'rate'
  // 滑动条
  | 'slider'
  // 选择框
  | 'select'
  // 树选择
  | 'treeSelect'
  // 集联选择
  | 'cascade'
  // 穿梭框
  | 'transfer'
  // 单选框
  | 'radio'
  // 复选框
  | 'checkbox'
  // 开关
  | 'switch'
  // 日期选择
  | 'date'
  // 日期范围
  | 'dateRange'
  // 时间
  | 'time'
  // 时间反问
  | 'timeRange'
  // 上传
  | 'upload'
  // 拖拽上传
  | 'uploadDrag'
  // 图表
  | 'icon'
  // icon
  | 'color'
  // select group
  | 'selectGroup'
  // complex type
  // bridge to form
  | 'jsonObject'
  | 'jsonArray'
  // advanced type
  | 'user'
  | 'org'
  | 'post'
  | 'role'
  // code editor
  | 'codeEditor'
  // custom component
  | 'slot'
  | 'undefined';

export type FormStatus = 'add' | 'edit' | 'details';

export type ModalButton<T extends Entity> = {
  code: string;
  name: string;
  type: 'warning' | 'primary' | 'tertiary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
  icon?: React.ReactNode;
  // 按钮loading状态，如果不赋值默认为false
  loading?: boolean;
  onClick?: (formContext: FormContext<T>) => void;
};

export type FormModal<T extends Entity> = {
  // abandon modal dialog show form (default is false)
  abandon?: boolean;
  // 表单弹出框大小 (default is 'large')
  size?: 'small' | 'medium' | 'large' | 'full-width';
  // close on esc
  closeOnEsc?: boolean;
  // 是否显示确认操作
  showConfirm?: boolean | ((formContext: FormContext<T>) => boolean);
  // 是否显示取消操作
  showCancel?: boolean | ((formContext: FormContext<T>) => boolean);
  // 自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加
  append?: (
    | ModalButton<T>
    | ((formContext: FormContext<T>) => ModalButton<T> | undefined)
  )[];
};

export type FormEvent<T extends Entity> = {
  // 当保存或者更新成功后进行回调
  onSaveOrUpdateSuccess?: (entity: T) => void;
};

export type FormProps<T extends Entity> = IFormLayoutProps & {
  // 表单模型标识
  mode: 'tree' | 'table' | 'simply';
  // 表单标题
  title?: string;
  // 字段集合
  columns: FormColumnProps<T>[];
  // 表单类型
  type?: FormStatus;
  // form decorator
  decorator?: FormColumnDecorator<T>;
  // 父级传递
  params?: Partial<T>;
  // 是否立即显示
  immediateVisible?: boolean;
  // 是否显示表单验证提示消息
  showValidateErrorNotification?: boolean;
  // 内置事件回调
  event?: FormEvent<T>;
  // modal内容
  modal?: FormModal<T>;
  // slot to bottom form
  slotBottom?: React.ReactNode;
  // reaction scope
  scope?: Record<string, object>;
  // api
  useApi?: (() => GeneralApi<T>) | GeneralApi<T>;
  // 操作完成的回调
  onOk?: (formContext: FormContext<T>) => void;
  // 发生错误时回调
  onError?: (err: Error, formContext: FormContext<T>) => void;
  // 取消时回调
  onCancel?: (formContext: FormContext<T>) => void;
  // 获取表单上下文
  getFormContext?: (formContext: FormContext<T>) => void;
};

// 远程搜索
export type RemoteProps<T = Constant> = {
  // 请求url
  url: string;
  // 请求method，默认为post
  method?: Method;
  // 请求参数
  params?: Pair[];
  // 请求头
  headers?: Pair[];
  // 是否是内部接口，默认为true
  internal?: boolean;
  // 返回结果转换参数
  mapping?: Pair[];
  // 结果formatter
  formatter?: (result: object) => Record<string, T[]>;
};

export type KeyColumnProps<
  Column extends FormColumnProps<any> = FormColumnProps<any>,
> = keyof Column;

export type ColumnRelation<T extends Entity> = {
  title?: FormProps<T>['title'];
  helper: Helper<any, any>;
};

export type FormColumnProps<T extends Entity> = {
  // 字段标识
  field: string;
  // 字段位置索引
  index?: number;
  // 是否可用
  disabled?: boolean;
  // 字段类型
  type: ColumnType;
  // 字段名称
  label?: string;
  // 快捷的表单必填项，如果search = true，则默认 = false
  require?: boolean | ((record: T) => boolean);
  // 表格表单校验规则
  rules?: RuleItem[];
  // 表单字段初始值
  initValue?: T[FormColumnProps<T>['field']];
  // 表单文本拓展
  extraText?: string | React.ReactNode;
  // 行分割的数目，默认为12
  span?: 6 | 12 | 24;
  // 是否单独一行
  line?: boolean;
  // 当前column是否在form中显示，默认为true
  form?: boolean | ((formContext: FormContext<T>) => boolean);
  // 触发校验的时机 触发校验的时机，可选值:blur/change/custom/mount，或以上值的组合['blur','change']
  // 1、设置为 custom 时，仅会由 formApi/fieldApi 触发校验时被触发
  // 2、mount（挂载时即触发一次校验）
  validateTrigger?: 'blur' | 'change' | 'custom' | 'mount' | Array<string>;
  // 自定义校验
  validate?: (
    fieldValue: any,
    values: Record<string, any>,
  ) => string | Promise<string>;
  // 联动
  reaction?: SchemaReactions;
  // 关联
  relation?: ColumnRelation<T>;
};

export type FormContext<T extends Entity> = {
  // title
  title?: string;
  // form icon
  icon?: React.ReactNode;
  // 弹窗类型
  type: FormStatus;
  // Form props
  props: FormProps<T>;
  // 是否显示
  visible: boolean;
  // 表单加载
  loading: boolean;
  // 表单columns
  columns: FormColumnProps<T>[];
  // 表单绑定的值
  values?: Partial<T>;
  // dic或者remote远端数据的数据集
  dataSet: Record<string, Constant[]>;
  // 字段转换为semi props
  decorator: FormColumnDecorator<T>;
  valid: FormType['valid'];
  validating: FormType['validating'];
  validate?: FormType['validate'];
  submit?: FormType['submit'];
  reset?: FormType['reset'];
  // open form dialog
  open: () => void;
  // close form dialog
  close: () => void;
  // 获取字段绑定的默认值
  getDefaultValues: () => Partial<T>;
  // 获取表单绑定的值
  // according to field key obtain field value
  getValue: (field: keyof T) => any;
  getValues: () => Partial<T>;
  // set value by field
  setValue: (field: keyof T, value: any) => void;
  // set type T values
  setValues: (values: Partial<T>) => void;
  // get column
  // the field allowing a.b.c format
  getColumn: (field: keyof T) => FormColumnProps<T> | undefined;
};
