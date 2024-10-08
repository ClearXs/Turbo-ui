import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';

export type FormInputColumnProps<T extends Entity> = FormColumnProps<T> &
  InputProps;
