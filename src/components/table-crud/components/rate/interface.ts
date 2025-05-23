import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormRateColumnProps } from '@/components/uni-form/components';

// Rate 组件
export type TableRateColumnProps<T extends Entity> = CardColumnProps<T> &
  FormRateColumnProps<T>;
