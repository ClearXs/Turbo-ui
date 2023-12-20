import { IPreviewWidgetProps } from "@/pages/PreviewWidget";
import { createForm } from "@formily/core";
import { createSchemaField } from "@formily/react";
import { useMemo } from "react";
import { transformToSchema } from "@designable/formily-transformer";
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
} from "@formily/semi";

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
  },
});

export const SemiPreviewWidget: React.FC<IPreviewWidgetProps> = (props) => {
  const form = useMemo(() => createForm(), []);
  const { form: formProps, schema } = transformToSchema(props.tree);
  return (
    <Form {...formProps} form={form}>
      <SchemaField schema={schema} />
    </Form>
  );
};
