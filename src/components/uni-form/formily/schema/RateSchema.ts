import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormRateColumnProps } from '../../components';

const RateSchema: SchemaColumn<FormRateColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Rate', 'number'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'rate' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('rate', RateSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Rate', 'rate');
