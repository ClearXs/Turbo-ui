import { IdEntity } from '@/api/interface';
import {
  ColumnType,
  FormColumnProps,
  FormContext,
  FormProps,
} from './interface';
import { ReactNode } from 'react';
import _ from 'lodash';
import {
  InputFormField,
  NumberFormField,
  TextareaFormField,
  PasswordFormField,
  BaseFormField,
  FormField,
  SelectFormField,
  SelectGroupFormField,
  TreeSelectFormField,
  CascadeFormField,
  RadioFormField,
  IconFormField,
  ColorFormField,
  DateFormField,
  CheckboxFormField,
  SwitchFormField,
  RateFormField,
  SliderFormField,
  TransferFormField,
  UploadFormField,
  UploadDragFormField,
} from './components';
import { ISchema } from '@formily/json-schema';

export interface FormColumnDecorator<T extends IdEntity> {
  /**
   * 通过把column渲染为Form组件
   * @param column table字段实体
   * @param type 区分column是搜索还是表单渲染
   */
  render(column: FormColumnProps<T>, type: 'search' | 'form'): React.ReactNode;

  /**
   * 获取每一个column对应的formliy schema
   * @param column column
   */
  schema(column: FormColumnProps<T>, index: number): ISchema;

  /**
   * 获取默认span
   * @param column column
   */
  getDefaultSpan(column: FormColumnProps<T>): FormColumnProps<T>['span'];

  /**
   * 获取form context
   */
  getFormContext(): FormContext<T>;

  /**
   * 设置form context
   */
  setFormContext(formContext: FormContext<T>): void;
}

export class UndefinedFormField<T extends IdEntity> extends BaseFormField<
  T,
  any
> {
  doRender(column: FormProps<T>, type: 'search' | 'form'): React.ReactNode {
    return <></>;
  }

  public getType(): ColumnType {
    return 'undefined';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}

export class FormColumnFactory {
  public static get<T extends IdEntity, K extends FormColumnProps<T>>(
    type: ColumnType,
    decorator: FormColumnDecorator<T>,
  ): FormField<T, K> {
    switch (type) {
      case 'input':
        return new InputFormField<T>(decorator);
      case 'number':
        return new NumberFormField<T>(decorator);
      case 'password':
        return new PasswordFormField<T>(decorator);
      case 'select':
        return new SelectFormField<T>(decorator);
      case 'selectGroup':
        return new SelectGroupFormField<T>(decorator);
      case 'treeSelect':
        return new TreeSelectFormField<T>(decorator);
      case 'cascade':
        return new CascadeFormField<T>(decorator);
      case 'radio':
        return new RadioFormField<T>(decorator);
      case 'textarea':
        return new TextareaFormField<T>(decorator);
      case 'icon':
        return new IconFormField<T>(decorator);
      case 'color':
        return new ColorFormField<T>(decorator);
      case 'date':
        return new DateFormField<T>(decorator);
      case 'checkbox':
        return new CheckboxFormField<T>(decorator);
      case 'switch':
        return new SwitchFormField<T>(decorator);
      case 'rate':
        return new RateFormField<T>(decorator);
      case 'slider':
        return new SliderFormField<T>(decorator);
      case 'transfer':
        return new TransferFormField<T>(decorator);
      case 'dateRange':
      case 'time':
      case 'timeRange':
        return new DateFormField<T>(decorator);
      case 'upload':
        return new UploadFormField<T>(decorator);
      case 'uploadDrag':
        return new UploadDragFormField<T>(decorator);
      case 'undefined':
      default:
        return new UndefinedFormField<T>(decorator);
    }
  }
}

export class FormColumnDecoratorImpl<T extends IdEntity>
  implements FormColumnDecorator<T>
{
  constructor(private formContext?: FormContext<T>) {}

  schema(column: FormColumnProps<T>, index: number): ISchema {
    return FormColumnFactory.get<T, FormColumnProps<T>>(
      column.type,
      this,
    )?.schema(column, index);
  }

  render(column: FormColumnProps<T>, type: 'search' | 'form'): ReactNode {
    return FormColumnFactory.get<T, FormColumnProps<T>>(
      column.type,
      this,
    )?.render(column, type);
  }
  getFormContext(): FormContext<T> {
    return this.formContext;
  }
  setFormContext(formContext: FormContext<T>): void {
    this.formContext = formContext;
  }

  getDefaultSpan(column: FormColumnProps<T>): FormColumnProps<T>['span'] {
    return (
      FormColumnFactory.get<T, FormColumnProps<T>>(
        column.type,
        this,
      )?.getDefaultSpan() || 6
    );
  }
}

export function getFormColumnDecorator<T extends IdEntity>(
  formContext: FormContext<T>,
): FormColumnDecorator<T> {
  return new FormColumnDecoratorImpl<T>(formContext);
}
