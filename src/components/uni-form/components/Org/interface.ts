import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';

// org 组件
export type FormOrgColumnProps<T extends Entity> = FormColumnProps<T> &
  Omit<SelectProps, 'optionList'>;
