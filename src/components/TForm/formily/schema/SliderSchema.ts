import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  createColumnSchema,
} from './SchemaColumn';
import { FormSliderColumnProps } from '../../components';

const SliderSchema: SchemaColumn<FormSliderColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...createColumnSchema(column, formContext, 'Slider', 'number'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (field, span, schema) => {
    return {
      field,
      index: schema['x-index'],
      type: 'slider',
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

GlobalSchemaColumnRegistry.addSchemaColumn('slider', SliderSchema);
