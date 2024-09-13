import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormTransferColumnProps } from '@/components/tform/components';

// Transfer 组件
export type TableTransferColumnProps<T extends Entity> = CardColumnProps<T> &
  FormTransferColumnProps<T>;
