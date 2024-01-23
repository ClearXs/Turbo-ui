import { IdEntity } from '@/api/interface';
import { FormColumnProps } from '../../interface';
import { RatingItemProps } from '@douyinfe/semi-ui/lib/es/rating';

// Rate 组件
export type FormRateColumnProps<T extends IdEntity> = FormColumnProps<T> &
  RatingItemProps & {};
