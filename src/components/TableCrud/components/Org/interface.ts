import { IdEntity } from '@/api';
import { FormOrgColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// org 组件
export type TableOrgColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormOrgColumnProps<T> & {};
