import { IdEntity } from '@/api';
import { FormRoleColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// role 组件
export type TableRoleColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormRoleColumnProps<T> & {};
