import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormRadioColumnProps } from '../../components';

const RadioSchema: SchemaColumn<FormRadioColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'Radio.Group',
        'string',
      ),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'radio' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('radio', RadioSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Radio.Group', 'radio');
