import { Entity } from '@/api';
import { FormJsonObjectColumnProps } from '@/components/tform/components';

// Json 组件
export type TableJsonObjectColumnProps<T extends Entity> =
  FormJsonObjectColumnProps<T>;
