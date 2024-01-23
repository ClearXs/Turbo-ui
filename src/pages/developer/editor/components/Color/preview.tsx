import React from 'react';
import {
  GlobalBOFieldProps,
  GlobalRegistry,
  createBehavior,
  createResource,
} from '@designable/core';
import { DnFC } from '@designable/react';
import { createFieldSchema } from '@designable/formily-semi';
import { Color as TurboColor } from '@/components/TForm/formily/components';
import Locales from '../../locales/color';
import Schema from '../../schema/color';

export const Color: DnFC<React.ComponentProps<typeof TurboColor>> = TurboColor;

Color.Behavior = createBehavior({
  name: 'Color',
  extends: ['Field'],
  selector: (node) => node.props['x-component'] === 'Color',
  designerProps: {
    propsSchema: createFieldSchema(Schema),
  },
  designerLocales: Locales,
});

Color.Resource = createResource({
  icon: 'ColorSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Color',
        'x-decorator': 'FormItem',
        'x-component': 'Color',
      },
    },
  ],
});

GlobalRegistry.registerBOTransfer({
  adaptive(node) {
    return node.props['x-component'] === 'Color';
  },
  transform(node, root) {
    return GlobalBOFieldProps.transform(node, root, {
      type: 'varchar',
      precision: 64,
    });
  },
});
