import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormSelectColumnProps } from '../../components';

// TODO dic remote 这些属性怎么处理
const SelectSchema: SchemaColumn<FormSelectColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(column, formContext, 'Select', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps, 'dic', 'remote']),
      },
    };
  },
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'select',
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

GlobalSchemaColumnRegistry.addSchemaColumn('select', SelectSchema);
