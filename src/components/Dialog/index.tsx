import Modular from '../modular/Modular';
import SliderSide from '../slider-side';
import { DialogProps } from './interface';

export type DialogType = 'slider' | 'modular';

const Dialog = {
  open: <T extends DialogProps>(type: DialogType, props: T) => {
    if (type === 'modular') {
      return Modular.show(props);
    } else if (type === 'slider') {
      return SliderSide.show(props);
    }
  },
};

export default Dialog;
