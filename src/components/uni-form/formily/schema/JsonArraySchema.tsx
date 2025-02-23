import _ from 'lodash';
import { SchemaColumn } from '../interface';
import { GlobalSchemaColumnRegistry } from './SchemaColumn';
import { observer } from 'mobx-react';
import { ISchema, Schema, SchemaContext, useField } from '@formily/react';
import { ArrayField } from '@formily/core';
import { FoldItem } from '@clearx/designable-react-settings-form';
import {
  FormColorColumnProps,
  FormJsonArrayColumnProps,
} from '../../components';
import { useContext } from 'react';
import { UniFormContext } from '../../context/form';
import './styles.scss';
import { ArrayItems } from '@clearx/formily-semi';
import { FormContext } from '../../interface';

const JsonArraySchema: SchemaColumn<FormJsonArrayColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      title: column.label,
      name: column.initValue,
      type: 'array',
      required: column.require as boolean,
      'x-decorator': 'FormItem',
      'x-component': JsonArraySetter,
      'x-validator': [],
      'x-reactions': column.reaction,
      'x-component-props': {},
    };
  },
  reverse: (index, schema) => {
    return {};
  },
};

type IJsonSetterProps = {
  value?: any;
  onChange?: (value: any) => void;
};

const JsonArraySetter: React.FC<IJsonSetterProps> = observer((props) => {
  const formContext = useContext(UniFormContext);
  const field = useField<ArrayField>();
  const fieldName = field.props.name;
  const jsonColumn = formContext.columns.find((c) => c.field === fieldName);
  const columns = (jsonColumn as FormJsonArrayColumnProps<any>).columns || [];
  const propertiesSchemas = toPropertiesSchema(columns, formContext);
  propertiesSchemas['remove'] = {
    type: 'void',
    'x-component': 'ArrayItems.Remove',
    'x-component-props': { style: { marginLeft: 5 } },
  };
  const jsonArraySchema: ISchema = {
    type: 'array',
    items: {
      type: 'object',
      'x-decorator': 'ArrayItems.Item',
      'x-decorator-props': {
        style: {
          alignItems: 'center',
          borderRadius: 3,
          paddingTop: 6,
          paddingBottom: 6,
        },
      },
      properties: propertiesSchemas,
    },
    properties: {
      addValidatorRules: {
        type: 'void',
        'x-component': 'ArrayItems.Addition',
        'x-component-props': {
          style: {
            marginBottom: 10,
          },
        },
      },
    },
  };

  return (
    <FoldItem>
      <FoldItem.Extra>
        <SchemaContext.Provider value={new Schema(jsonArraySchema)}>
          <ArrayItems />
        </SchemaContext.Provider>
      </FoldItem.Extra>
    </FoldItem>
  );
});

const toPropertiesSchema = (
  columns: FormColorColumnProps<any>[],
  formContext: FormContext<any>,
): Record<string, ISchema> => {
  const propertiesSchemas: Record<string, ISchema> = {};
  columns.forEach((col, index) => {
    const schema = formContext.decorator.schema(col, index);
    propertiesSchemas[col.field] = schema;
  });
  return propertiesSchemas;
};

GlobalSchemaColumnRegistry.addSchemaColumn('jsonArray', JsonArraySchema);
