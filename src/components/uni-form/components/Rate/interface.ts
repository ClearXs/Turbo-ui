import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { RatingItemProps } from '@douyinfe/semi-ui/lib/es/rating';

// Rate 组件
export type FormRateColumnProps<T extends Entity> = FormColumnProps<T> &
  RatingItemProps;
