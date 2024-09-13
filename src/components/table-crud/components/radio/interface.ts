import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormRadioColumnProps } from '@/components/tform/components';

// Radio 组件
export type TableRadioColumnProps<T extends Entity> = CardColumnProps<T> &
  FormRadioColumnProps<T>;
