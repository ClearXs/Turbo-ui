import {
  ColumnType,
  FormColumnProps,
  FormContext,
  KeyColumnProps,
} from '../../interface';
import _ from 'lodash';
import { SchemaColumn, SchemaColumnRegistry } from '../interface';
import { IdEntity } from '@/api';
import { ISchema, SchemaTypes } from '@formily/json-schema';
import { uid } from '@/util/utils';
import { chunk } from '../../util';
import { BoAttrSchema, BoSchema, FieldType } from '@designable/core';

/**
 * 基于Column实例创建ISchema
 * @param column form column
 * @param formContext form context
 * @param component 组件名称
 * @param type 组件类型
 * @returns  ISchema instance
 */
export const baseOnColumnCreateISchema = (
  column: FormColumnProps<any>,
  formContext: FormContext<any>,
  component: string,
  type: SchemaTypes,
): ISchema => {
  const schema: ISchema = {
    title: column.label,
    name: column.initValue,
    type: type,
    required: column.require as boolean,
    default: column.initValue,
    'x-decorator': 'FormItem',
    'x-component': component,
    'x-validator': [],
    'x-reactions': column.reaction,
  };
  if (formContext.type === 'details') {
    schema['x-pattern'] = 'disabled';
  }
  return schema;
};

/**
 * 基于BoAttrSchema创建Column实例
 * @param index column index
 * @param schema bo attr schema
 */
export const baseOnBoAttrSchemaCreateColumn = <
  Column extends FormColumnProps<any>,
>(
  index: number,
  schema: BoAttrSchema,
): Column => {
  const { binding, defaulted } = schema;

  return {
    field: schema.key,
    require: binding ? schema['props']?.['required'] ?? false : false,
    label: schema.name,
    index,
    span: schema.span || 12,
    line: schema.span === 24,
    // 1.表单上是否显示根据表单设计器是否绑定
    // 2.或者是非默认的字段
    form: binding === true ? true : !defaulted,
    table: binding === true ? true : !defaulted,
    search: binding === true ? true : !defaulted,
    reaction: schema['props']?.['x-reactions'],
    ...(schema['props']?.['x-component-props'] || {}),
  };
};

// 排出基本属性项
export const ExclusiveColumnKeyProps: KeyColumnProps[] = [
  'field',
  'index',
  'type',
  'label',
  'require',
  'rules',
  'initValue',
  'extraText',
  'span',
  'line',
  'form',
  'validate',
  'validateTrigger',
  'reaction',
  'ellipsis',
  'search',
  'table',
];

const SCHEMA_COLUMN_STORE: Map<ColumnType, SchemaColumn<any>> = new Map();
// 表单组件与Column Type的映射
const COMPONENT_COLUMN_TYPE_STORE: Map<string, ColumnType> = new Map();
// 数据类型与Column Type的映射
const FIELD_TYPE_COLUMN_TYPE_STORE: Map<FieldType, ColumnType> = new Map();

export const GlobalSchemaColumnRegistry: SchemaColumnRegistry = {
  addSchemaColumn: function (columnType, schemaColumn): void {
    SCHEMA_COLUMN_STORE.set(columnType, schemaColumn);
  },
  getSchemaColumn: function (
    columnType: ColumnType,
  ): SchemaColumn<any> | undefined {
    return SCHEMA_COLUMN_STORE.get(columnType);
  },
  addComponentColumnMapping: function (
    component: string,
    columnType: ColumnType,
  ): void {
    COMPONENT_COLUMN_TYPE_STORE.set(component, columnType);
  },
  getColumnTypeByComponent: function (
    component: string,
  ): ColumnType | undefined {
    return COMPONENT_COLUMN_TYPE_STORE.get(component);
  },
  addFieldTypeColumnMapping: function (
    field: FieldType,
    columnType: ColumnType,
  ): void {
    FIELD_TYPE_COLUMN_TYPE_STORE.set(field, columnType);
  },
  getColumnTypeByFieldType: function (
    field: FieldType,
  ): ColumnType | undefined {
    return FIELD_TYPE_COLUMN_TYPE_STORE.get(field);
  },
};

export const toSchema = <T extends IdEntity>(
  columns: FormColumnProps<T>[],
  formContext: FormContext<T>,
  mapping: (column: FormColumnProps<T>, index: number) => ISchema = (
    column,
    index,
  ) => {
    // 如果表单中存在于当前为进行映射处理的SchemaColumn那么默认返回{}
    return (
      GlobalSchemaColumnRegistry.getSchemaColumn(column.type)?.adapt(
        { ...column, index },
        formContext,
      ) || {}
    );
  },
): ISchema => {
  const chunkColumns = chunk(columns);
  const aggregateSchema = chunkColumns
    .map((barrier) => {
      // 以formGrid聚合columns
      const formGridId = uid();
      const formGridSchema: Record<string, ISchema> = {};
      const schemas = barrier.columns
        .map((column, index) => {
          const columnSchema: Record<string, ISchema> = {};
          const schema = mapping(column, index);
          columnSchema[column.field] = schema;
          return columnSchema;
        })
        .reduce((pre, cur) => {
          return { ...pre, ...cur };
        }, {});

      formGridSchema[formGridId] = {
        type: 'void',
        'x-component': 'FormGrid',
        'x-component-props': {
          // 栅栏数量
          maxColumns: barrier.maxColumns,
        },
        properties: schemas,
      };
      return formGridSchema;
    })
    .reduce((pre, cur) => {
      return { ...pre, ...cur };
    }, {});

  return {
    type: 'object',
    properties: aggregateSchema,
  };
};

/**
 * 从boSchema转换为Column实例数组
 * 1.取root的第一个元素（此元素一定为table），其造成的后果就是不能对多表进行创建
 * 2.基于该元素调用SchemaColumn进行转换
 * 3.如果包含子表则有TableSchemaColumn进行转换，子表的深度只能是1
 * @param boSchema bo schema
 * @param map column 转换关系
 */
export const from = <Column extends FormColumnProps<any>>(
  boSchema: BoSchema,
  mapping: (index: number, attrSchema: BoAttrSchema) => Column | undefined = (
    index,
    attrSchema,
  ) => {
    const component = attrSchema['props']?.['x-component'];
    const type = attrSchema.type;
    const columnType =
      GlobalSchemaColumnRegistry.getColumnTypeByComponent(component) ||
      GlobalSchemaColumnRegistry.getColumnTypeByFieldType(type);
    return (
      (columnType &&
        GlobalSchemaColumnRegistry.getSchemaColumn(columnType)?.reverse(
          index,
          attrSchema,
        )) ||
      undefined
    );
  },
): Column[] => {
  const attrSchemas = boSchema.attrs;
  if (attrSchemas.length > 0) {
    const rootSchema = attrSchemas[0];
    if (rootSchema.attrType !== 'table') return [];
    const schemas = rootSchema.children || [];
    const columns = schemas
      .map((schema, index) => mapping(index, schema))
      .filter((column) => !_.isEmpty(column));
    return columns;
  }
  return [];
};
