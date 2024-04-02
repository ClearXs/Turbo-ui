import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';

// user 组件
export type FormUserColumnProps<T extends IdEntity> = FormColumnProps<T> &
  Omit<SelectProps, 'optionList'>;
