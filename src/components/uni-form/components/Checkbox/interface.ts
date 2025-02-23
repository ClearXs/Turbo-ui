import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { Constant } from '@/constant';

// checkbox
export type FormCheckboxColumnProps<T extends Entity> = FormColumnProps<T> & {
  options?: Constant[];
  extraText?: string;
};
