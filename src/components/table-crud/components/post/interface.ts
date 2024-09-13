import { Entity } from '@/api';
import { FormPostColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// post 组件
export type TablePostColumnProps<T extends Entity> = CardColumnProps<T> &
  FormPostColumnProps<T>;
