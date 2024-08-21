import { IdEntity } from '@/api';
import { FormUserColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// user 组件
export type TableUserColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormUserColumnProps<T> & {};
