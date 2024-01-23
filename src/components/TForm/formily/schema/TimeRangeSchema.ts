import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormTimeRangeColumnProps } from '../../components';

const TimeRangeSchema: SchemaColumn<FormTimeRangeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(
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
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'timeRange',
      label: schema.title,
      require: schema.required,
      initValue: schema.default,
      span,
      line: span === 24,
      reaction: schema['x-reactions'],
      ...schema['x-component-props'],
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('timeRange', TimeRangeSchema);
