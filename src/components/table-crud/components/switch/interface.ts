import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormSwitchColumnProps } from '@/components/uni-form/components';

// switch 组件
export type TableSwitchColumnProps<T extends Entity> = CardColumnProps<T> &
  FormSwitchColumnProps<T>;
