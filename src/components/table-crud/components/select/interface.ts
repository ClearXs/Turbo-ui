import { Entity } from '@/api';
import { FormSelectColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// Select 组件
export type TableSelectColumnProps<T extends Entity> = CardColumnProps<T> &
  FormSelectColumnProps<T>;
