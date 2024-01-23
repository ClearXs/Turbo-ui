import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormTextareaColumnProps } from '@/components/TForm/components';

// textarea 组件
export type TableTextareaColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormTextareaColumnProps<T> & {};
