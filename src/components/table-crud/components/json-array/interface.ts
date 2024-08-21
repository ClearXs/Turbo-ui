import { IdEntity } from '@/api';
import { FormJsonArrayColumnProps } from '@/components/tform/components';

// Json 组件
export type TableJsonArrayColumnProps<T extends IdEntity> =
  FormJsonArrayColumnProps<T> & {};
