import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormPasswordColumnProps } from '@/components/tform/components';

// Password 组件
export type TablePasswordColumnProps<T extends Entity> = CardColumnProps<T> &
  FormPasswordColumnProps<T>;
