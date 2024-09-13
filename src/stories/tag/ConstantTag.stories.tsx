import type { Meta, StoryObj } from '@storybook/react';
import ConstantTag from '../../components/tag/ConstantTag';

const meta: Meta<typeof ConstantTag> = {
  title: 'Component/ConstantTag',
  component: ConstantTag,
  argTypes: {
    constant: {
      table: {
        type: {
          summary: 'Constant',
        },
      },
      description: 'Constant类型, 包含对颜色以及icon和label的定义',
    },
  },
};

type Store = StoryObj<typeof meta>;

export const Default: Store = {
  args: {
    constant: {
      tag: 'grey',
      label: 'label',
    },
  },
};

export default meta;
