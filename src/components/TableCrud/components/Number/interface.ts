import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormNumberColumnProps } from '@/components/TForm/components';

// InputNumber 组件
export type TableNumberColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormNumberColumnProps<T> & {};
