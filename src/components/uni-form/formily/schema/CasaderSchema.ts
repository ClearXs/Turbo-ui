import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormCascadeColumnProps } from '../../components';

const CascadeSchema: SchemaColumn<FormCascadeColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Cascader', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'cascade',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('cascade', CascadeSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Cascader', 'cascade');
