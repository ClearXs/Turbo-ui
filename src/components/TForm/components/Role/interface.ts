import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';

// org 组件
export type FormRoleColumnProps<T extends IdEntity> = FormColumnProps<T> &
  Omit<SelectProps, 'optionList'>;
