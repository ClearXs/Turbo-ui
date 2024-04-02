import { IdEntity } from '@/api';
import { FormJsonObjectColumnProps } from '@/components/TForm/components';

// Json 组件
export type TableJsonObjectColumnProps<T extends IdEntity> =
  FormJsonObjectColumnProps<T> & {};
