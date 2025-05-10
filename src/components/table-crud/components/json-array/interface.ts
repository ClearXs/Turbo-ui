import { Entity } from '@/api';
import { FormJsonArrayColumnProps } from '@/components/uni-form/components';

// Json 组件
export type TableJsonArrayColumnProps<T extends Entity> =
  FormJsonArrayColumnProps<T>;
