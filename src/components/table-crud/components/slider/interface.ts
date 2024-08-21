import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import { FormSliderColumnProps } from '@/components/tform/components';

// Slider 组件
export type TableSliderColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormSliderColumnProps<T>;
