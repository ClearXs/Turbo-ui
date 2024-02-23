import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormInputColumnProps } from '../../components';

const InputSchema: SchemaColumn<FormInputColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Input', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    const column = baseOnBoAttrSchemaCreateColumn(index, schema);
    return { ...column, type: 'input' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('input', InputSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Input', 'input');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('varchar', 'input');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('char', 'input');
