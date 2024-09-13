import { Entity } from '@/api';
import { CardColumnProps, TableColumnProps } from '../../interface';

// color
export type TableColorColumnProps<T extends Entity> = CardColumnProps<T> &
  TableColumnProps<T>;
