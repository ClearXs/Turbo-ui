import React from 'react';
import {
  GlobalBOFieldProps,
  GlobalRegistry,
  createBehavior,
  createResource,
} from '@clearx/designable-core';
import { DnFC } from '@clearx/designable-react';
import { createFieldSchema } from '@clearx/designable-formily-semi';
import { Icon as TurboIcon } from '@/components/uni-form/formily/components';
import Locales from '../../locales/icon';
import Schema from '../../schema/icon';

export const Icon: DnFC<React.ComponentProps<typeof TurboIcon>> = TurboIcon;

Icon.Behavior = createBehavior({
  name: 'Icon',
  extends: ['Field'],
  selector: (node) => node.props?.['x-component'] === 'Icon',
  designerProps: {
    propsSchema: createFieldSchema(Schema),
  },
  designerLocales: Locales,
});

Icon.Resource = createResource({
  icon: 'IconSource',
  elements: [
    {
      componentName: 'Field',
      props: {
        title: 'Icon',
        'x-decorator': 'FormItem',
        'x-component': 'Icon',
      },
    },
  ],
});

GlobalRegistry.registerBOTransfer({
  adaptive(node) {
    return node.props?.['x-component'] === 'Icon';
  },
  transform(node, root) {
    return GlobalBOFieldProps.transform(node, root, {
      type: 'varchar',
      precision: 64,
    });
  },
});
