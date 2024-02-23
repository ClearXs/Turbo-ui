import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTimeRangeColumnProps } from '../../components';

const TimeRangeSchema: SchemaColumn<FormTimeRangeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'TimePicker.RangePicker',
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
      type: 'timeRange',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('timeRange', TimeRangeSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'TimePicker.RangePicker',
  'timeRange',
);
