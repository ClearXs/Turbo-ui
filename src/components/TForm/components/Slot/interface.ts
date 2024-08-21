import { IdEntity } from '@/api';
import { FormColumnProps, FormContext } from '../../interface';
import { SliderSideProps } from '@/components/slider-side/interface';
import { ModularProps } from '@/components/modular/interface';
import { SliderSideReturnHooksType } from '@/components/slider-side/useSliderSide';
import { ModularReturnHooksType } from '@/components/modular/useModular';

export type Mode = 'modal' | 'slider';

// slot component
export type FormSlotColumnProps<T extends IdEntity> = FormColumnProps<T> & {
  // set slot display mode
  // have tow choose
  // 1.modal
  // 2.slider
  // default is slider
  mode?: Mode;
  // show to form component
  shown?: React.ReactNode | ((formContext: FormContext<T>) => React.ReactNode);
  // open a dialog render the component
  component?:
    | React.FC<SlotComponentProps>
    | ((formContext: FormContext<T>) => React.ReactNode);

  modal?: Omit<
    ModularProps,
    | 'onConfirm'
    | 'onCancel'
    | 'beforeConfirm'
    | 'beforeConfirm'
    | 'afterClose'
    | 'content'
  >;
  // set slider props
  slider?: Omit<
    SliderSideProps,
    | 'onConfirm'
    | 'onCancel'
    | 'beforeConfirm'
    | 'beforeConfirm'
    | 'afterClose'
    | 'content'
  >;
};

export type SlotComponentProps = {
  // get slot handler
  getHandler?: (handler: Handler) => void;
};

export type ModalInstance = {};

/**
 * slot handler in slot component confirm or cancel in callback
 */
export type Handler = {
  onOk?: (instance: ModularReturnHooksType | SliderSideReturnHooksType) => void;
  onCancel?: () => void;
};
