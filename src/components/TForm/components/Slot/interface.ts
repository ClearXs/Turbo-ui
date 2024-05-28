import { IdEntity } from '@/api';
import { FormColumnProps, FormContext } from '../../interface';

// slot component
export type FormSlotColumnProps<T extends IdEntity> = FormColumnProps<T> & {
  // show to form component
  shown?: React.ReactNode | ((formContext: FormContext<T>) => React.ReactNode);
  // open a dialog render the component
  component?:
    | React.FC<SlotComponentProps>
    | ((formContext: FormContext<T>) => React.ReactNode);
};

export type SlotComponentProps = {
  // get slot handler
  getHandler?: (handler: Handler) => void;
};

/**
 * slot handler in slot component confirm or cancel in callback
 */
export type Handler = {
  onOk: () => void;
  onCancel: () => void;
};
