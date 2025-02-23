import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormTreeSelectColumnProps } from '../../components';

// TODO treeData remote 这些属性怎么处理
const TreeSelectSchema: SchemaColumn<FormTreeSelectColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'TreeSelect', 'string'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps, 'treeData', 'remote']),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'treeSelect',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('treeSelect', TreeSelectSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'TreeSelect',
  'treeSelect',
);
