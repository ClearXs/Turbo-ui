import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormRateColumnProps } from '@/components/TForm/components';

// Rate 组件
export type TableRateColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormRateColumnProps<T>;
