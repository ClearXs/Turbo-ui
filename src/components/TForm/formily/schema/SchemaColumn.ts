import {
  ColumnType,
  FormColumnProps,
  FormContext,
  KeyColumnProps,
} from '../../interface';
import _ from 'lodash';
import { SchemaColumn, SchemaColumnRegistry } from '../interface';
import { IdEntity } from '@/api/interface';
import { ISchema, SchemaTypes } from '@formily/json-schema';
import { uid } from '@/util/utils';
import { chunk } from '../../util';

export const createColumnSchema = (
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
];

const SCHEMA_COLUMN_STORE: Record<ColumnType, SchemaColumn<any>> = {};

export const GlobalSchemaColumnRegistry: SchemaColumnRegistry = {
  addSchemaColumn: function (columnType, schemaColumn): void {
    SCHEMA_COLUMN_STORE[columnType] = schemaColumn;
  },
  getSchemaColumn: function (columnType: ColumnType): SchemaColumn<any> {
    return SCHEMA_COLUMN_STORE[columnType];
  },
};

export const toSchema = <T extends IdEntity>(
  columns: FormColumnProps<T>[],
  formContext: FormContext<T>,
  toSchema: (column: FormColumnProps<T>, index: number) => ISchema = (
    column,
    index,
  ) => {
    return GlobalSchemaColumnRegistry.getSchemaColumn(column.type).adapt(
      { ...column, index },
      formContext,
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
          const schema = toSchema(column, index);
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
