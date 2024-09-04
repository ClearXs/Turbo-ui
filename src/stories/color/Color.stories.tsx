import type { Meta, StoryObj } from '@storybook/react';
import Color from '../../components/color/preview';
import { fn } from '@storybook/test';

const colorList = [
  'amber',
  'blue',
  'cyan',
  'green',
  'grey',
  'indigo',
  'light-blue',
  'light-green',
  'lime',
  'orange',
  'pink',
  'purple',
  'red',
  'teal',
  'violet',
  'yellow',
  'white',
];

const meta: Meta<typeof Color> = {
  title: 'Component/Color',
  component: Color,
  argTypes: {
    disabled: {
      type: 'boolean',
      description: '是否禁用',
    },
    value: {
      control: 'select',
      options: colorList,
      table: {
        type: {
          summary: 'string',
        },
      },
      description: '颜色值',
    },
    onChange: {
      type: 'function',
      description: '值变化回调',
    },
  },
  args: {
    onChange: fn(),
  },
};

type Store = StoryObj<typeof meta>;

export const Default: Store = {
  args: {
    value: 'amber',
  },
};

export default meta;
