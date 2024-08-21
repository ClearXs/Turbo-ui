import { GroupConstant } from '@/constant';
import { SelectProps } from '@douyinfe/semi-ui/lib/es/select';

export type SelectGroupProps = Omit<SelectProps, 'optionList' | 'remote'> & {
  optionList?: GroupConstant[];
};

export type Group<T> = T & {
  children: T[];
};
