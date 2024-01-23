import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { CascaderProps } from '@douyinfe/semi-ui/lib/es/cascader';
import { TreeConstant } from '@/constant';

// 集联选择 组件
export type FormCascadeColumnProps<T extends IdEntity> = FormColumnProps<T> &
  CascaderProps & {
    optionTree: TreeConstant[];
  };
