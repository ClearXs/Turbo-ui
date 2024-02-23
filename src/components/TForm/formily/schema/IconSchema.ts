import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormIconColumnProps } from '../../components';

const IconSchema: SchemaColumn<FormIconColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Icon', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'icon' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('icon', IconSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Icon', 'icon');
