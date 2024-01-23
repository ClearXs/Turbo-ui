import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { InputNumberProps } from '@douyinfe/semi-ui/lib/es/inputNumber';

// InputNumber 组件
export type FormNumberColumnProps<T extends IdEntity> = FormColumnProps<T> &
  InputNumberProps & {};
