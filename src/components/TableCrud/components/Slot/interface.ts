import { IdEntity } from '@/api';
import { FormSlotColumnProps } from '@/components/TForm/components';
import { TableColumnProps } from '../../interface';

// slot
export type TableSlotColumnProps<T extends IdEntity> = TableColumnProps<T> &
  FormSlotColumnProps<T> & {};
