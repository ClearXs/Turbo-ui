import { createForm } from '@formily/core';
import { createSchemaField } from '@formily/react';
import { useMemo } from 'react';
import { transformToSchema } from '@designable/formily-transformer';
import {
  Form,
  FormItem,
  DatePicker,
  Checkbox,
  Cascader,
  Input,
  NumberPicker,
  Switch,
  Password,
  PreviewText,
  Radio,
  Reset,
  Select,
  Space,
  Submit,
  TimePicker,
  Transfer,
  TreeSelect,
  Upload,
  FormGrid,
  FormLayout,
  FormTab,
  FormCollapse,
  ArrayTable,
  Rate,
  Slider,
} from '@formily/semi';
import { TreeNode } from '@designable/core';
import { Icon } from '../components/Icon';
import { Color } from '../components/Color';

const SchemaField = createSchemaField({
  components: {
    Form,
    FormItem,
    DatePicker,
    Checkbox,
    Cascader,
    Input,
    NumberPicker,
    Switch,
    Password,
    PreviewText,
    Radio,
    Reset,
    Select,
    Space,
    Submit,
    TimePicker,
    Transfer,
    TreeSelect,
    Upload,
    FormGrid,
    FormLayout,
    FormTab,
    FormCollapse,
    ArrayTable,
    Rate,
    Slider,
    Icon,
    Color,
  },
});

export type IPreviewWidgetProps = {
  tree: TreeNode;
};

export const PreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
