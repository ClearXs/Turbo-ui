import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormTreeSelectColumnProps } from '../../components';

// TODO treeData remote 这些属性怎么处理
const TreeSelectSchema: SchemaColumn<FormTreeSelectColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(column, formContext, 'TreeSelect', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps, 'treeData', 'remote']),
      },
    };
  },
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'treeSelect',
      label: schema.title,
      require: schema.required,
      initValue: schema.default,
      span,
      line: span === 24,
      reaction: schema['x-reactions'],
      ...schema['x-component-props'],
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('treeSelect', TreeSelectSchema);
