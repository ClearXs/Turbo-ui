import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormSelectColumnProps } from '../../components';

const SelectSchema: SchemaColumn<FormSelectColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Select', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps, 'dic', 'remote']),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'select' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('select', SelectSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Select', 'select');
