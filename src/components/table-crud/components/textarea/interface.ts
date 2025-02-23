import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormTextareaColumnProps } from '@/components/uni-form/components';

// textarea 组件
export type TableTextareaColumnProps<T extends Entity> = CardColumnProps<T> &
  FormTextareaColumnProps<T>;
