import { IdEntity } from '@/api';
import { FormColumnProps } from '../../interface';

// json 组件
export type FormJsonObjectColumnProps<T extends IdEntity> =
  FormColumnProps<T> & {
    // definition json columns
    columns: FormColumnProps<T>[];
  };
