import { Entity } from '@/api';
import { FormRoleColumnProps } from '@/components/tform/components';
import { CardColumnProps } from '../../interface';

// role 组件
export type TableRoleColumnProps<T extends Entity> = CardColumnProps<T> &
  FormRoleColumnProps<T>;
