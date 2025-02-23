import React from 'react';
import { motion } from 'motion/react';
import { Chat, Tooltip } from '@douyinfe/semi-ui';
import SliderSide from '@/components/slider-side';

const Component = React.forwardRef((props, ref) => {
  return (
    <Tooltip
      className="relative right-5 bottom-2"
      ref={ref}
      {...props}
      content="Ask me!! "
    ></Tooltip>
  );
});
const MotionComponent = motion.create(Component);

const ChatSuspend = () => {
  return (
    <MotionComponent
      initial={{ boxShadow: '0px 0px #000' }}
      animate={{ boxShadow: '10px 10px #000' }}
    >
      <div
        className="w-14 h-14 relative inline-flex overflow-hidden items-center justify-center whitespace-nowrap text-center rounded-[var(--semi-border-radius-circle)] bg-[var(--semi-color-bg-0)] hover:bg-[var(--semi-color-fill-1)] cursor-pointer"
        onClick={() => {
          SliderSide.show({
            size: 'medium',
            showCancel: false,
            showConfirm: false,
            content: <Chat mode="bubble" style={{ width: '100%' }} />,
          });
        }}
      >
        <span className="icon-[ri--robot-2-fill] w-8 h-8"></span>
      </div>
    </MotionComponent>
  );
};

export default ChatSuspend;
