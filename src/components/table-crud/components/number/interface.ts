import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormNumberColumnProps } from '@/components/uni-form/components';

// InputNumber 组件
export type TableNumberColumnProps<T extends Entity> = CardColumnProps<T> &
  FormNumberColumnProps<T>;
