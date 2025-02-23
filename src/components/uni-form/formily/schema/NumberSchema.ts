import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormNumberColumnProps } from '../../components';

const NumberSchema: SchemaColumn<FormNumberColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'NumberPicker',
        'number',
      ),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'number' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('number', NumberSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('NumberPicker', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('smallint', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('int', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('bigint', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('number', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('double', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('float', 'number');
GlobalSchemaColumnRegistry.addFieldTypeColumnMapping('decimal', 'number');
