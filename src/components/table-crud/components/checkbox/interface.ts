import { IdEntity } from '@/api';
import { FormCheckboxColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// checkbox组件
export type TableCheckboxColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormCheckboxColumnProps<T> & {};
