import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTransferColumnProps } from '../../components';

const TransferSchema: SchemaColumn<FormTransferColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Transfer', 'string[]'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'transfer',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('transfer', TransferSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Transfer', 'transfer');
