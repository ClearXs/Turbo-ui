import { Form } from '@formily/core';
import { ISchema } from '@formily/json-schema';
import {
  ColumnType,
  FormColumnProps,
  FormContext,
  FormProps,
} from '../interface';
import { IFormLayoutProps } from '@formily/semi';

export type FormilyFormProps = IFormLayoutProps & {
  formProps: FormProps<any>;
  formContext: FormContext<any>;
  // reaction 作用域变量
  scope?: any;
  // 附加的schema component
  components?: Record<string, React.FC<any>>;
  // 副作用
  effects?: (form: Form) => void;
};

export interface SchemaColumn<Column extends FormColumnProps<any>> {
  /**
   * 给定column转换Schema
   * @param column column
   * @returns
   */
  adapt: (column: Column, formContext: FormContext<any>) => ISchema;

  /**
   * 给定schema转换为Column
   * @param field column field
   * @param span 栅栏间隔
   * @param schema schema
   * @returns
   */
  reverse: (field: string, span: number, schema: ISchema) => Column;
}

export interface SchemaColumnRegistry {
  /**
   * 添加schema column
   * @param schemaColumn schema column
   * @returns
   */
  addSchemaColumn: (
    columnType: ColumnType,
    schemaColumn: SchemaColumn<any>,
  ) => void;

  /**
   * 根据column type获取SchemaColumn
   * @param columnType column
   * @returns
   */
  getSchemaColumn: (columnType: ColumnType) => SchemaColumn<any>;
}
