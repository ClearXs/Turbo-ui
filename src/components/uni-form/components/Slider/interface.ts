import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import { SliderProps } from '@douyinfe/semi-ui/lib/es/slider';

// Slider 组件
export type FormSliderColumnProps<T extends Entity> = FormColumnProps<T> &
  SliderProps;
