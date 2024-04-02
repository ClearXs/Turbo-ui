import { IdEntity } from '@/api';
import { FormUserColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// user 组件
export type TableUserColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormUserColumnProps<T> & {};
