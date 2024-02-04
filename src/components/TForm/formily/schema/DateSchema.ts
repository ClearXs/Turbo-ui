import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormDateColumnProps } from '../../components';

const DateSchema: SchemaColumn<FormDateColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'DatePicker', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'date' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('date', DateSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('DatePicker', 'date');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('timestamp', 'date');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('date', 'date');
