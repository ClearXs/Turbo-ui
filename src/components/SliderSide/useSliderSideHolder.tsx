import React from 'react';
import { ReactNode } from 'react';
import { HookSliderSideProps, ShowSliderSide } from './useSliderSide';
import { SliderSideProps } from './interface';
import HookSliderSide, { HookSliderSideRef } from './HookSliderSide';

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

export default function useSliderSideHolder(): [ShowSliderSide, ReactNode] {
  const [elements, patchElement] = usePatchElement();
  function getShowFunc(
    withFunc: (config: HookSliderSideProps) => SliderSideProps,
  ) {
    return function hookConfirm({
      autoClose = true,
      ...props
    }: HookSliderSideProps) {
      uuid += 1;

      const sliderSideRef = React.createRef<HookSliderSideRef>();

      const hookRef: HookSliderSideRef = {
        destroy: () => {
          if (sliderSideRef.current) {
            sliderSideRef.current.destroy();
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

      const closeFunc = patchElement(
        <HookSliderSide
          key={`semi-modal-${uuid}`}
          config={withFunc(props)}
          ref={sliderSideRef}
          afterClose={() => {
            closeFunc();
          }}
        />,
      );
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
