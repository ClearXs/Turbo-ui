import React from 'react';
import { ReactNode } from 'react';
import { ModularProps } from './interface';
import HookModal, { HookModalRef } from './HookModular';
import { ShowModular } from './useModular';

let uuid = 0;

function usePatchElement(): [ReactNode[], (element: ReactNode) => () => void] {
  const [elements, setElements] = React.useState<ReactNode[]>([]);

  function patchElement(element: ReactNode) {
    setElements((originElements) => [...originElements, element]);

    return () => {
      setElements((originElements) =>
        originElements.filter((ele) => ele !== element),
      );
    };
  }

  return [elements, patchElement];
}

export type HookModularProps = ModularProps & {
  autoClose?: boolean;
};

export default function useModularHolder(): [ShowModular, ReactNode] {
  const [elements, patchElement] = usePatchElement();
  function getShowFunc(withFunc: (config: HookModularProps) => ModularProps) {
    return function hookConfirm({
      autoClose = true,
      ...props
    }: HookModularProps) {
      uuid += 1;

      const modalRef = React.createRef<HookModalRef>();

      const hookRef: HookModalRef = {
        destroy: () => {
          if (modalRef.current) {
            modalRef.current.destroy();
          }
        },
      };

      if (autoClose) {
        const onCancel = props.onCancel;
        props.onCancel = () => {
          hookRef.destroy();
          onCancel?.();
        };
      }

      let closeFunc: () => void;
      const modal = (
        <HookModal
          key={`semi-modal-${uuid}`}
          config={withFunc(props)}
          ref={modalRef}
          afterClose={() => {
            closeFunc();
          }}
        />
      );
      closeFunc = patchElement(modal);
      return hookRef;
    };
  }

  return [
    {
      info: getShowFunc((config) => {
        return { ...config, type: 'info' };
      }),
      success: getShowFunc((config) => {
        return { ...config, type: 'success' };
      }),
      error: getShowFunc((config) => {
        return { ...config, type: 'error' };
      }),
      warning: getShowFunc((config) => {
        return { ...config, type: 'warning' };
      }),
      show: getShowFunc((config) => {
        return { ...config };
      }),
    },
    elements,
  ];
}
