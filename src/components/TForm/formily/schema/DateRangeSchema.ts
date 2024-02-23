import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormDateRangeColumnProps } from '../../components';

const DateRangeSchema: SchemaColumn<FormDateRangeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'DatePicker.RangePicker',
        'string[]',
      ),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
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
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'DatePicker.RangePicker',
  'dateRange',
);
