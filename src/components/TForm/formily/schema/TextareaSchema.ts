import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTextareaColumnProps } from '../../components';

const TextareaSchema: SchemaColumn<FormTextareaColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'Input.TextArea',
        'string',
      ),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'textarea',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('textarea', TextareaSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'Input.TextArea',
  'textarea',
);
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('text', 'textarea');
