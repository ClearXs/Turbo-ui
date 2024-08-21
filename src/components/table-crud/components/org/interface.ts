import { IdEntity } from '@/api';
import { FormOrgColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// org 组件
export type TableOrgColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormOrgColumnProps<T> & {};
