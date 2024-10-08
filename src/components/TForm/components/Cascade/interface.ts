import { Entity } from '@/api';
import { FormColumnProps, FormContext } from '../../interface';
import { CascaderProps } from '@douyinfe/semi-ui/lib/es/cascader';
import { TreeConstant } from '@/constant';

// 集联选择 组件
export type FormCascadeColumnProps<T extends Entity> = FormColumnProps<T> &
  CascaderProps & {
    optionTree:
      | TreeConstant[]
      | ((formContext: FormContext<T>) => TreeConstant[]);
  };
