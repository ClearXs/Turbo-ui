import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTimeRangeColumnProps, defaults } from '../../components';

const TimeRangeSchema: SchemaColumn<FormTimeRangeColumnProps<any>> = {
  adapt: (column, formContext) => {
    const props = {
      ...defaults,
      ..._.omit(column, [...ExclusiveColumnKeyProps]),
      type: 'timeRange',
    };
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'TimePicker', 'string'),
      'x-component-props': props,
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
GlobalSchemaColumnRegistry.addComponentColumnMapping('TimePicker', 'timeRange');
