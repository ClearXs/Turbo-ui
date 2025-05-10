import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { RadioProps } from '@douyinfe/semi-ui/lib/es/radio';

// Radio 组件
export type FormRadioColumnProps<T extends Entity> = FormColumnProps<T> &
  RadioProps;
