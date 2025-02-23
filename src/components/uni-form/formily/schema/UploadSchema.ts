import _ from 'lodash';
import { SchemaColumn } from '../interface';
import {
  ExclusiveColumnKeyProps,
  GlobalSchemaColumnRegistry,
  baseOnColumnCreateISchema,
  baseOnBoAttrSchemaCreateColumn,
} from './SchemaColumn';
import { FormUploadProps } from '../../components';

const UploadSchema: SchemaColumn<FormUploadProps<any>> = {
  adapt: (column, formContext) => {
    return {
      ...baseOnColumnCreateISchema(column, formContext, 'Upload', 'array'),
      'x-component-props': {
        ..._.omit(column, [...ExclusiveColumnKeyProps]),
      },
    };
  },
  reverse: (index, schema) => {
    return { ...baseOnBoAttrSchemaCreateColumn(index, schema), type: 'upload' };
  },
};

GlobalSchemaColumnRegistry.addSchemaColumn('upload', UploadSchema);
GlobalSchemaColumnRegistry.addComponentColumnMapping('Upload', 'upload');
