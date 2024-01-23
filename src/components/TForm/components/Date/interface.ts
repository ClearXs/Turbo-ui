import { IdEntity } from '@/api/interface';
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
export type FormDateColumnProps<T extends IdEntity> = FormColumnProps<T> &
  DateInputProps & {
    // 默认为datetime
    dateType?:
      | 'date'
      | 'dateRange'
      | 'year'
      | 'month'
      | 'dateTime'
      | 'dateTimeRange'
      | 'monthRange';
  };

// dateRange
export type FormDateRangeColumnProps<T extends IdEntity> = FormColumnProps<T> &
  DatePickerProps & {
    // 默认为datetime
    dateType?:
      | 'date'
      | 'dateRange'
      | 'year'
      | 'month'
      | 'dateTime'
      | 'dateTimeRange'
      | 'monthRange';
  };

// time 组件
export type FormTimeColumnProps<T extends IdEntity> = FormColumnProps<T> &
  TimeInputProps & {
    // 默认为datetime
    dateType?:
      | 'date'
      | 'dateRange'
      | 'year'
      | 'month'
      | 'dateTime'
      | 'dateTimeRange'
      | 'monthRange';
  };

// time range
export type FormTimeRangeColumnProps<T extends IdEntity> = FormColumnProps<T> &
  TimePickerProps & {
    // 默认为datetime
    dateType?:
      | 'date'
      | 'dateRange'
      | 'year'
      | 'month'
      | 'dateTime'
      | 'dateTimeRange'
      | 'monthRange';
  };
