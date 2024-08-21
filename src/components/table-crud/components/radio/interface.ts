import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormRadioColumnProps } from '@/components/tform/components';

// Radio 组件
export type TableRadioColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormRadioColumnProps<T> & {};
