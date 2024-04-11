import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormTransferColumnProps } from '@/components/TForm/components';

// Transfer 组件
export type TableTransferColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormTransferColumnProps<T>;
