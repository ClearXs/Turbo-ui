import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormInputColumnProps } from '@/components/TForm/components';

// Input 组件
export type TableInputColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormInputColumnProps<T> & {};
