import { PropsWithChildren } from 'react';
import { ModularProps } from './interface';
import React from 'react';
import Modular from './Modular';

interface HookModalProps {
  afterClose: (...args: any[]) => void;
  config: ModularProps;
}

export interface HookModalRef {
  destroy: () => void;
}

const HookModal = (
  { afterClose, config, ...props }: PropsWithChildren<HookModalProps>,
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
  return <Modular {...innerConfig} afterClose={mergeAfterClose} />;
};

export default React.forwardRef<HookModalRef, HookModalProps>(HookModal);
