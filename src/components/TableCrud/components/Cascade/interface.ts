import { IdEntity } from '@/api';
import { FormCascadeColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// Cascade 组件
export type TableCascadeColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormCascadeColumnProps<T> & {};
