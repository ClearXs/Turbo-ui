import { Entity } from '@/api';
import { FormOrgColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// org 组件
export type TableOrgColumnProps<T extends Entity> = CardColumnProps<T> &
  FormOrgColumnProps<T>;
