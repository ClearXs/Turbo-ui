import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormTextareaColumnProps } from '@/components/tform/components';

// textarea 组件
export type TableTextareaColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormTextareaColumnProps<T> & {};
