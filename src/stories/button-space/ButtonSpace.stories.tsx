import type { Meta, StoryObj } from '@storybook/react';
import ButtonSpace from '../../components/button-space/ButtonSpace';
import { Button } from '@douyinfe/semi-ui';
import React from 'react';

const align = ['start', 'end', 'center', 'baseline'];

const meta: Meta<typeof ButtonSpace> = {
  title: 'Component/ButtonSpace',
  component: ButtonSpace,
  argTypes: {
    align: {
      options: align,
      type: 'string',
      control: 'select',
      description: '对齐方式,支持 start、end、center、baseline',
    },
    wrap: {
      type: 'boolean',
      description: '是否自动换行',
    },
    spacing: {
      type: 'string',
      description: '间距尺寸, 支持 loose、medium、tight 或 number、array',
    },
    vertical: {
      type: 'boolean',
      description: '是否为垂直间距',
    },
  },
};

export default meta;

type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    wrap: false,
    align: 'baseline',
    vertical: false,
    children: (
      <>
        <Button>1</Button> <Button>2</Button>
      </>
    ),
  },
};
