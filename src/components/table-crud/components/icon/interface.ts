import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormIconColumnProps } from '@/components/uni-form/components';

// icon
export type TableIconColumnProps<T extends Entity> = CardColumnProps<T> &
  FormIconColumnProps<T>;
