import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormDateColumnProps, defaults } from '../../components';

const DateSchema: SchemaColumn<FormDateColumnProps<any>> = {
  adapt: (column, formContext) => {
    const props = {
      ...defaults,
      ..._.omit(column, [...ExclusiveColumnKeyProps]),
    };
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'DatePicker', 'string'),
      'x-component-props': props,
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
