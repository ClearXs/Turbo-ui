import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormPasswordColumnProps } from '@/components/TForm/components';

// Password 组件
export type TablePasswordColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormPasswordColumnProps<T>;
