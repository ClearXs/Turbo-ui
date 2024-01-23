import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormIconColumnProps } from '@/components/TForm/components';

// icon
export type TableIconColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormIconColumnProps<T> & {};
