import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormInputColumnProps } from '@/components/uni-form/components';

// Input 组件
export type TableInputColumnProps<T extends Entity> = CardColumnProps<T> &
  FormInputColumnProps<T>;
