import { createForm } from '@formily/core';
import { useMemo } from 'react';
import { transformToSchema } from '@clearx/designable-formily-transformer';
import { Form } from '@clearx/formily-semi';
import { TreeNode } from '@clearx/designable-core';
import { SchemaField } from '@/components/uni-form/formily/FormilyForm';

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
