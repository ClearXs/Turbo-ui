import { Form } from '@formily/core';
import { ISchema } from '@formily/json-schema';
import {
  ColumnType,
  FormColumnProps,
  FormContext,
  FormProps,
} from '../interface';
import { IFormLayoutProps } from '@formily/semi';
import { BoAttrSchema, FieldType } from '@designable/core';
import { IdEntity } from '@/api';

export type FormilyFormContext<T extends IdEntity> = FormContext<T> & {
  coreForm?: Form<T>;
  setCoreForm(coreForm: Form<T>): void;
};

export type FormilyFormProps<T extends IdEntity = IdEntity> =
  IFormLayoutProps & {
    formProps: FormProps<T>;
    formContext: FormContext<T>;
    // reaction 作用域变量
    scope?: Record<string, object>;
    // 附加的schema component
    components?: Record<string, React.FC<any>>;
    // 副作用
    effects?: (form: Form) => void;
  };

export interface SchemaColumn<Column extends FormColumnProps<any>> {
  /**
   * 给定column转换Formliy Schema
   * @param column column
   * @returns
   */
  adapt: (column: Column, formContext: FormContext<any>) => ISchema;

  /**
   * 将BoAttrSchema转换为Column
   * @param field column field
   * @param span 栅栏间隔
   * @param schema schema
   * @returns
   */
  reverse: (index: number, schema: BoAttrSchema) => Column;
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
  getSchemaColumn: (columnType: ColumnType) => SchemaColumn<any> | undefined;

  /**
   * 添加表单组件与ColumnType的映射
   * @param component 表单组件
   * @param columnType column type
   */
  addComponentColumnMapping: (
    component: string,
    columnType: ColumnType,
  ) => void;

  /**
   * 根据表单组件获取Column Type
   * @param component 表单组件
   */
  getColumnTypeByComponent(component: string): ColumnType | undefined;

  /**
   * 添加字段类型与ColumnType的映射
   * @param component 表单组件
   * @param columnType column type
   */
  addFieldTypeColumnMapping: (field: FieldType, columnType: ColumnType) => void;

  /**
   * 根据字段获取Column Type
   * @param component 表单组件
   */
  getColumnTypeByFieldType(field: FieldType): ColumnType | undefined;
}
