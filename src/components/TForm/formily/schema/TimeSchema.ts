import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTimeColumnProps } from '../../components';

const TimeSchema: SchemaColumn<FormTimeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'TimePicker', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'time' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('time', TimeSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('TimePicker', 'time');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('time', 'time');
