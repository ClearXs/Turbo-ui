import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';
import { SwitchProps } from '@douyinfe/semi-ui/lib/es/switch';

// switch
export type FormSwitchColumnProps<T extends IdEntity> = FormColumnProps<T> &
  SwitchProps & {};
