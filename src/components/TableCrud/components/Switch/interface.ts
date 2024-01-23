import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormSwitchColumnProps } from '@/components/TForm/components';

// switch 组件
export type TableSwitchColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormSwitchColumnProps<T> & {};
