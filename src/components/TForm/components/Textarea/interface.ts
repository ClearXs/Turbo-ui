import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';
import { TextAreaProps } from '@douyinfe/semi-ui/lib/es/input';

// Textarea 组件
export type FormTextareaColumnProps<T extends IdEntity> = FormColumnProps<T> &
  TextAreaProps & {};
