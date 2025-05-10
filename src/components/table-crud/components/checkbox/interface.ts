import { Entity } from '@/api';
import { FormCheckboxColumnProps } from '@/components/uni-form/components';
import { CardColumnProps } from '../../interface';

// checkbox组件
export type TableCheckboxColumnProps<T extends Entity> = CardColumnProps<T> &
  FormCheckboxColumnProps<T>;
