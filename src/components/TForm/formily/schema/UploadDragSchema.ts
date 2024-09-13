import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormUploadDragProps } from '../../components';

const UploadDragSchema: SchemaColumn<FormUploadDragProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Upload', 'array'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
        draggable: true,
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
GlobalSchemaColumnRegistry.addComponentColumnMapping('Upload', 'uploadDrag');
