import { Entity } from '@/api';
import { FormSlotColumnProps } from '@/components/uni-form/components';
import { TableColumnProps } from '../../interface';

// slot
export type TableSlotColumnProps<T extends Entity> = TableColumnProps<T> &
  FormSlotColumnProps<T>;
