import TurboColor from '@/components/color/preview';
import { connect, mapProps } from '@formily/react';

export const Color = connect(
  TurboColor,
  mapProps({
    disabled: 'disabled',
    value: 'value',
    onInput: 'onChange',
  }),
);

export default Color;
