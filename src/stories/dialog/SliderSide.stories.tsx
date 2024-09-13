import type { Meta, StoryObj } from '@storybook/react';
import SliderSide from '../../components/slider-side';
import useSliderSideHolder from '../../components/slider-side/useSliderSideHolder';
import useSliderSide from '../../components/slider-side/useSliderSide';
import SliderSideContext from '../../components/slider-side/context';
import { fn } from '@storybook/test';
import { useState } from 'react';
import { Button } from '@douyinfe/semi-ui';
import _ from 'lodash';

const type = ['success', 'info', 'error', 'warning'];
const size = ['small', 'medium', 'large', 'full-width'];

const meta: Meta<typeof SliderSide> = {
  title: 'Component/SliderSide',
  component: SliderSide,
  argTypes: {
    type: {
      control: 'select',
      table: {
        type: {
          summary: 'string',
        },
      },
      options: type,
      description: 'Modular默认类型',
    },
    title: {
      table: {
        type: {
          summary: 'string | ReactNode',
        },
      },
      description: '标题',
    },
    content: {
      table: {
        type: {
          summary: 'string | ReactNode;',
        },
      },
      description: '优先取content',
    },
    visible: {
      type: 'boolean',
      description: '是否可见',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
    },
    loading: {
      type: 'boolean',
      description: '是否加载',
    },
    icon: {
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      description: 'icon',
    },
    children: {
      table: {
        type: {
          summary: 'ReactNode',
        },
      },
      description: '内置元素',
    },
    closable: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
      description: '是否显示关闭按钮',
    },
    showConfirm: {
      table: {
        type: {
          summary: 'boolean | (() => boolean)',
        },
      },
      description: '是否显示确认操作',
    },
    showCancel: {
      table: {
        type: {
          summary: 'boolean | (() => boolean)',
        },
      },
      description: '是否显示取消操作',
    },
    append: {
      table: {
        type: {
          summary: 'DialogButtonProps[]',
        },
      },
      description:
        '自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加',
    },
    scrollY: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
      description: '是否显示Y轴滑动轮',
    },
    scrollX: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
      description: '是否显示X轴滑动轮',
    },
    closeOnEsc: {
      type: 'boolean',
      table: {
        defaultValue: {
          summary: 'true',
        },
      },
      description: 'closeOnEsc',
    },
    size: {
      type: 'string',
      control: 'select',
      options: size,
      table: {
        defaultValue: {
          summary: 'medium',
        },
      },
      description: '大小',
    },
    beforeConfirm: {
      type: 'function',
      description:
        'confirm before，当存在返回值时不会立即调用onConfirm，由使用方确定是否使用',
    },
    onConfirm: {
      type: 'function',
      description: '确认回调',
    },
    beforeCancel: {
      type: 'function',
      description:
        'cancel before，当存在返回值时不会立即调用onCancel，由使用方确定是否使用',
    },
    onCancel: {
      type: 'function',
      description: '取消回调',
    },
    afterClose: {
      type: 'function',
      description: '关闭后执行',
    },
  },
  args: {
    beforeConfirm: fn(),
    onConfirm: fn(),
    beforeCancel: fn(),
    onCancel: fn(),
    afterClose: fn(),
  },
};

type Store = StoryObj<typeof meta>;

export const Default: Store = {
  render: (args) => {
    console.log(args);
    const [visible, setVisible] = useState<boolean>(false);
    return (
      <>
        <Button onClick={() => setVisible(true)}>open slider side</Button>
        <SliderSide
          {...args}
          visible={visible}
          onCancel={() => setVisible(false)}
        />
      </>
    );
  },
};

export const Hook: Store = {
  render: (args) => {
    const [showSliderSide, sliderSideContextHolder] = useSliderSideHolder();
    const HookSliderSide = () => {
      const sliderSide = useSliderSide();
      return (
        <Button onClick={() => sliderSide.info({ ...args })}>
          open slider side
        </Button>
      );
    };
    return (
      <>
        <SliderSideContext.Provider value={showSliderSide}>
          <HookSliderSide />
        </SliderSideContext.Provider>
        {sliderSideContextHolder}
      </>
    );
  },
};

export const Static: Store = {
  render: (args) => {
    return (
      <>
        <Button onClick={() => SliderSide.info({ ...args })}>
          open slider side
        </Button>
      </>
    );
  },
};

export const Title: Store = {
  args: {
    title: '自定义标题1',
  },
  render: (args) => {
    return (
      <>
        <Button onClick={() => SliderSide.info({ ...args })}>
          open slider side
        </Button>
      </>
    );
  },
};

export const Footer: Store = {
  args: {
    append: [{ code: 'test1', name: 'test1', type: 'primary' }],
  },
  render: (args) => {
    return (
      <>
        <Button onClick={() => SliderSide.info({ ...args })}>
          open slider side
        </Button>
      </>
    );
  },
};

export default meta;
