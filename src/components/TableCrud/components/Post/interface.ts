import { IdEntity } from '@/api';
import { FormPostColumnProps } from '@/components/TForm/components';
import { CardColumnProps } from '../../interface';

// post 组件
export type TablePostColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormPostColumnProps<T> & {};
