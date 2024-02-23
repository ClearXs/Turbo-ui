import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormSliderColumnProps } from '../../components';

const SliderSchema: SchemaColumn<FormSliderColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Slider', 'number'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'slider' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('slider', SliderSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Slider', 'slider');
