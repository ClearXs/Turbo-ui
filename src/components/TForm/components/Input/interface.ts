import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { InputProps } from '@douyinfe/semi-ui/lib/es/input';

export type FormInputColumnProps<T extends IdEntity> = FormColumnProps<T> &
  InputProps & {};
