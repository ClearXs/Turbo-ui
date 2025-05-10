import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { TextAreaProps } from '@douyinfe/semi-ui/lib/es/input';

// Textarea 组件
export type FormTextareaColumnProps<T extends Entity> = FormColumnProps<T> &
  TextAreaProps;
