import { PropsWithChildren } from 'react';
import { SliderSideProps } from './interface';
import React from 'react';
import SliderSide from './SliderSide';

interface HookSliderSideProps {
  afterClose: (...args: any[]) => void;
  config: SliderSideProps;
}

export interface HookSliderSideRef {
  destroy: () => void;
}

const HookSliderSide = (
  { afterClose, config, ...props }: PropsWithChildren<HookSliderSideProps>,
  ref: React.Ref<any>,
) => {
  const [innerConfig, setInnerConfig] = React.useState(config);

  React.useImperativeHandle(ref, () => ({
    destroy: () => {
      setInnerConfig((originConfig) => ({
        ...originConfig,
        visible: false,
      }));
    },
  }));

  const mergeAfterClose = () => {
    config?.afterClose?.();
    afterClose();
  };
  return <SliderSide {...innerConfig} afterClose={mergeAfterClose} />;
};

export default React.forwardRef<HookSliderSideRef, HookSliderSideProps>(
  HookSliderSide,
);
