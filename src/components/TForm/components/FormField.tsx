import { IdEntity } from '@/api';
import { ColumnType, FormColumnProps } from '../interface';
import { FormColumnDecorator } from '..';
import { ISchema } from '@formily/json-schema';
import { GlobalSchemaColumnRegistry } from '../formily/schema';
import { BoAttrSchema } from '@designable/core';

export interface FormField<T extends IdEntity, K extends FormColumnProps<T>> {
  /**
   * 通过把column渲染为Form组件
   * @param type 区分column是搜索还是表单渲染
   */
  render(column: K, type: 'search' | 'form'): React.ReactNode | undefined;
  schema(column: K, index: number): ISchema;
  from(index: number, schema: BoAttrSchema): FormColumnProps<T> | undefined;
  getDefaultSpan(): FormColumnProps<T>['span'];
}

export abstract class BaseFormField<
  T extends IdEntity,
  K extends FormColumnProps<T>,
> implements FormField<T, K>
{
  constructor(protected decorator: FormColumnDecorator<T>) {}

  private placeholderPrefix: Record<ColumnType, string> = {
    input: '请输入',
    number: '请输入',
    select: '请选择',
    selectGroup: '请选择',
    treeSelect: '请选择',
    cascade: '请选择',
    radio: '请选择',
    textarea: '请输入',
    icon: '',
    color: '',
    date: '请选择',
    undefined: '请输入',
    checkbox: '请选择',
    switch: '请选择',
    password: '请选择',
    rate: '请选择',
    slider: '请选择',
    transfer: '请选择',
    dateRange: '请选择',
    time: '请选择',
    timeRange: '请选择',
    upload: '请选择',
    uploadDrag: '请选择',
    jsonObject: '',
    jsonArray: '',
    user: '请选择',
    org: '请选择',
    post: '请选择',
    role: '请选择',
    codeEditor: '请输入',
    slot: '',
  };

  public schema(column: K, index: number): ISchema {
    const schema = GlobalSchemaColumnRegistry.getSchemaColumn(
      this.getType(),
    )?.adapt({ ...column, index }, this.decorator.getFormContext());
    if (schema) {
      const label = column.label;
      const placeholder = `${this.placeholderPrefix[column.type]}${label}!`;
      schema['x-component-props']['placeholder'] = placeholder;
      return schema;
    } else {
      return {};
    }
  }

  from(index: number, schema: BoAttrSchema): FormColumnProps<T> | undefined {
    const column = GlobalSchemaColumnRegistry.getSchemaColumn(
      this.getType(),
    )?.reverse(index, schema);
    return column;
  }

  public render(
    column: K,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    // 表单通用属性实现
    return this.doRender(column, type);
  }

  // 子类实现
  protected abstract doRender(
    column: K,
    type: 'search' | 'form',
  ): React.ReactNode | undefined;

  protected getGeneralProps(column: K, type: 'search' | 'form') {
    const field = column.field;
    const label = column.label;
    const placeholder = `${this.placeholderPrefix[column.type]}${label}!`;
    const rules = [
      ...(column.rules || []),
      {
        required: column.require && type === 'form',
        message: `${placeholder}`,
      },
    ];
    return {
      key: field,
      label,
      field,
      rules,
      placeholder,
      extraText: column.extraText,
      validate: column.validate,
      trigger: column.validateTrigger,
      disabled: column.disabled || false,
    };
  }

  /**
   * 获取字段类型
   */
  public abstract getType(): ColumnType;

  public abstract getDefaultSpan(): FormColumnProps<T>['span'];
}
