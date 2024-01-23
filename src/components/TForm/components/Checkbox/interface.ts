import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { Constant } from '@/constant';

// checkbox
export type FormCheckboxColumnProps<T extends IdEntity> = FormColumnProps<T> & {
  options?: Constant[];
  extraText?: string;
};
