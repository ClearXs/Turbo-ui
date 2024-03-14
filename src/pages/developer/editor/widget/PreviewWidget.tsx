import { createForm } from '@formily/core';
import { useMemo } from 'react';
import { transformToSchema } from '@designable/formily-transformer';
import { Form } from '@formily/semi';
import { TreeNode } from '@designable/core';
import { SchemaField } from '@/components/TForm/formily/FormilyForm';

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
