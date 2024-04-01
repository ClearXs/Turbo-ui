import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';

// Password 组件
export type FormPasswordColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {};
