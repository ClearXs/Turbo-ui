import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTimeColumnProps, defaults } from '../../components';

const TimeSchema: SchemaColumn<FormTimeColumnProps<any>> = {
  adapt: (column, formContext) => {
    const props = {
      ...defaults,
      ..._.omit(column, [...ExclusiveColumnKeyProps]),
      type: 'time',
    };
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'TimePicker', 'string'),
      'x-component-props': props,
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'time' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('time', TimeSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('TimePicker', 'time');
