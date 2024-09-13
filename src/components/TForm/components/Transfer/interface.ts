import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { TransferProps } from '@douyinfe/semi-ui/lib/es/transfer';

// Transfer 组件
export type FormTransferColumnProps<T extends Entity> = FormColumnProps<T> &
  TransferProps;
