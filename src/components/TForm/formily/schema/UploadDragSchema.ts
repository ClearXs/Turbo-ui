import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormUploadDragColumnProps } from '../../components';

const UploadDragSchema: SchemaColumn<FormUploadDragColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(
        column,
        formContext,
        'Upload.Dragger',
        'array',
      ),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return {
      ...baseOnBoAttrSchemaCreateColumn(index, schema),
      type: 'uploadDrag',
    };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('uploadDrag', UploadDragSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping(
  'Upload.Dragger',
  'uploadDrag',
);
