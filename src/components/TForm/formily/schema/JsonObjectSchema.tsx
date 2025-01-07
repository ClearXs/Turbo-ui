import _ from 'lodash';
import { SchemaColumn } from '../interface';
import { GlobalSchemaColumnRegistry, toSchema } from './SchemaColumn';
import { observer } from '@formily/reactive-react';
import { RecursionField, useField } from '@formily/react';
import { ObjectField } from '@formily/core';
import { FoldItem } from '@clearx/designable-react-settings-form';
import { FormJsonObjectColumnProps } from '../../components';
import { useContext } from 'react';
import { TFormContext } from '../../context/form';
import './styles.scss';

const JsonObjectSchema: SchemaColumn<FormJsonObjectColumnProps<any>> = {
  adapt: (column, formContext) => {
    return {
      title: column.label,
      name: column.initValue,
      type: 'object',
      required: column.require as boolean,
      'x-decorator': 'FormItem',
      'x-component': JsonObjectSetter,
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

const JsonObjectSetter: React.FC<IJsonSetterProps> = observer((props) => {
  const formContext = useContext(TFormContext);
  const field = useField<ObjectField>();
  const fieldName = field.props.name;
  const jsonColumn = formContext.columns.find((c) => c.field === fieldName);
  const columns = (jsonColumn as FormJsonObjectColumnProps<any>).columns || [];
  const schema = toSchema(columns, formContext, (column, index) =>
    formContext.decorator.schema(column, index),
  );

  return (
    <FoldItem>
      <FoldItem.Extra>
        <RecursionField schema={schema} />
      </FoldItem.Extra>
    </FoldItem>
  );
});

GlobalSchemaColumnRegistry.addSchemaColumn('jsonObject', JsonObjectSchema);
