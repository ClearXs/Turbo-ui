import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormCheckboxColumnProps } from '../../components';

const CheckboxSchema: SchemaColumn<FormCheckboxColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'Checkbox.Group',
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
      type: 'checkbox',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('checkbox', CheckboxSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'Checkbox.Group',
  'checkbox',
);
