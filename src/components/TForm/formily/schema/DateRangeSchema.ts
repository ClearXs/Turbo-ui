import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormDateRangeColumnProps, defaults } from '../../components';

const DateRangeSchema: SchemaColumn<FormDateRangeColumnProps<any>> = {
  adapt: (column, formContext) => {
    const props = {
      ...defaults.default,
      ..._.omit(column, [...ExclusiveColumnKeyProps]),
      type: 'dateRange',
    };
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'DatePicker',
        'string[]',
      ),
      'x-component-props': props,
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'dateRange',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('dateRange', DateRangeSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('DatePicker', 'dateRange');
