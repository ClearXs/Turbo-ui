import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormRadioColumnProps } from '../../components';

const RadioSchema: SchemaColumn<FormRadioColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(column, formContext, 'Radio.Group', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'radio',
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

GlobalSchemaColumnRegistry.addSchemaColumn('radio', RadioSchema);
