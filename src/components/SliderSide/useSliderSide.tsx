import { useContext } from 'react';
import { SliderSideProps } from './interface';
import SliderSideContext from './context';

export type SliderSideReturnHooksType = {
  destroy: () => void;
};

type UseSliderSideReturnHooksType = (
  config: HookSliderSideProps,
) => SliderSideReturnHooksType;

export type ShowSliderSide = {
  info: UseSliderSideReturnHooksType;
  success: UseSliderSideReturnHooksType;
  error: UseSliderSideReturnHooksType;
  warning: UseSliderSideReturnHooksType;
  show: UseSliderSideReturnHooksType;
};

export type HookSliderSideProps = SliderSideProps & {
  autoClose?: boolean;
};

export default function useSliderSide(): ShowSliderSide {
  return useContext(SliderSideContext);
}
