import { IdEntity } from '@/api/interface';
import { CardColumnProps } from '../../interface';
import { FormSliderColumnProps } from '@/components/TForm/components';

// Slider 组件
export type TableSliderColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormSliderColumnProps<T>;
