import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { InputNumberProps } from '@douyinfe/semi-ui/lib/es/inputNumber';

// InputNumber 组件
export type FormNumberColumnProps<T extends Entity> = FormColumnProps<T> &
  InputNumberProps;
