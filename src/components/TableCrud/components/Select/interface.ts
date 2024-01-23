import { IdEntity } from '@/api/interface';
import { FormSelectColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// Select 组件
export type TableSelectColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormSelectColumnProps<T> & {};
