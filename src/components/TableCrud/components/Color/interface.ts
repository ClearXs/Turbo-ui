import { IdEntity } from '@/api/interface';
import { CardColumnProps, TableColumnProps } from '../../interface';

// color
export type TableColorColumnProps<T extends IdEntity> = CardColumnProps<T> &
  TableColumnProps<T> & {};
