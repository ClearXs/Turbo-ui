import React from 'react';
import { BusinessObject, BoSchema, TreeNode } from '@designable/core';
import { MonacoInput } from '@designable/react-settings-form';

export interface IBoSchemaWidgetProps {
  bo: BusinessObject;
  onChange?: (tree?: TreeNode, boSchema?: BoSchema) => void;
}

export const BoSchemaEditorWidget: React.FC<IBoSchemaWidgetProps> = (props) => {
  return (
    <MonacoInput
      {...props}
      value={JSON.stringify(props.bo.toBoSchema(), null, 2)}
      onChange={(value) => {
        props.onChange?.(undefined, JSON.parse(value));
      }}
      language="json"
    />
  );
};
