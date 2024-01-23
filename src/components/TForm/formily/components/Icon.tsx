import TurboIcon from '@/components/Icon/preview';
import { connect, mapProps } from '@formily/react';

export const Icon = connect(
  TurboIcon,
  mapProps({
    disabled: 'disabled',
    value: 'icon',
    onInput: 'onChooseIcon',
  }),
);

export default Icon;
