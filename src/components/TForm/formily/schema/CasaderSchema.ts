import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormCascadeColumnProps } from '../../components';

const CascadeSchema: SchemaColumn<FormCascadeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(column, formContext, 'Cascader', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'cascade',
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

GlobalSchemaColumnRegistry.addSchemaColumn('cascade', CascadeSchema);
