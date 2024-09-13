import { Entity } from '@/api';
import { FormColumnProps, FormContext } from '../../interface';
import { SliderSideProps } from '@/components/slider-side/interface';
import { ModularProps } from '@/components/modular/interface';
import { SliderSideReturnHooksType } from '@/components/slider-side/useSliderSide';
import { ModularReturnHooksType } from '@/components/modular/useModular';

export type Mode = 'directly' | 'modal' | 'slider';

// slot component
export type FormSlotColumnProps<T extends Entity> = FormColumnProps<T> & {
  // set slot display mode
  // have three choose
  // 1.directly
  // 2.modal
  // 3.slider
  // default is directly
  mode?: Mode;
  // render component
  component?:
    | React.FC<SlotComponentProps>
    | ((formContext: FormContext<T>) => React.ReactNode);
  // show to component when mode is modal or slider
  // allow react or literal string (when wrapper Button for literal string )
  shown?:
    | React.ReactNode
    | ((formContext: FormContext<T>) => React.ReactNode)
    | string
    | ((formContext: FormContext<T>) => string);
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
