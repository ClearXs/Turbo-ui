import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';

// Transfer 组件
export type FormTransferColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {};
