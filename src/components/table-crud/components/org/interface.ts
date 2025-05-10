import { Entity } from '@/api';
import { FormOrgColumnProps } from '@/components/uni-form/components';
import { CardColumnProps } from '../../interface';

// org 组件
export type TableOrgColumnProps<T extends Entity> = CardColumnProps<T> &
  FormOrgColumnProps<T>;
