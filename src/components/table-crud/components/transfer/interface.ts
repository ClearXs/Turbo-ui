import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormTransferColumnProps } from '@/components/uni-form/components';

// Transfer 组件
export type TableTransferColumnProps<T extends Entity> = CardColumnProps<T> &
  FormTransferColumnProps<T>;
