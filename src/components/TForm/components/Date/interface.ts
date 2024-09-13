import { Entity } from '@/api';
import { FormColumnProps } from '../../interface';
import {
  DateInputProps,
  DatePickerProps,
} from '@douyinfe/semi-ui/lib/es/datePicker';
import {
  TimeInputProps,
  TimePickerProps,
} from '@douyinfe/semi-ui/lib/es/timePicker';

// date 组件
export type FormDateColumnProps<T extends Entity> = FormColumnProps<T> &
  DateInputProps;

// dateRange
export type FormDateRangeColumnProps<T extends Entity> = FormColumnProps<T> &
  DatePickerProps;

// time 组件
export type FormTimeColumnProps<T extends Entity> = FormColumnProps<T> &
  TimeInputProps;

// time range
export type FormTimeRangeColumnProps<T extends Entity> = FormColumnProps<T> &
  TimePickerProps;
