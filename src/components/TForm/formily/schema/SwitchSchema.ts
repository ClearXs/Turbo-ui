import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormSwitchColumnProps } from '../../components';

const SwitchSchema: SchemaColumn<FormSwitchColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Switch', 'boolean'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'switch' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('switch', SwitchSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Switch', 'switch');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('bool', 'switch');
