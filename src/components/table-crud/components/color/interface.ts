import { IdEntity } from '@/api';
import { CardColumnProps, TableColumnProps } from '../../interface';

// color
export type TableColorColumnProps<T extends IdEntity> = CardColumnProps<T> &
  TableColumnProps<T> & {};
