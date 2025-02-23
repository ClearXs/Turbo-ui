import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormPasswordColumnProps } from '../../components';

const PasswordSchema: SchemaColumn<FormPasswordColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Password', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'password',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('password', PasswordSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Password', 'password');
