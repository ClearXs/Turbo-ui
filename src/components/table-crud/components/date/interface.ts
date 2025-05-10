import { Entity } from '@/api';
import { CardColumnProps } from '../../interface';
import {
  FormDateColumnProps,
  FormDateRangeColumnProps,
  FormTimeColumnProps,
  FormTimeRangeColumnProps,
} from '@/components/uni-form/components';

// date 组件
export type TableDateColumnProps<T extends Entity> = CardColumnProps<T> &
  FormDateColumnProps<T>;

// dateRange
export type TableDateRangeColumnProps<T extends Entity> = CardColumnProps<T> &
  FormDateRangeColumnProps<T>;

// time 组件
export type TableTimeColumnProps<T extends Entity> = CardColumnProps<T> &
  FormTimeColumnProps<T>;

// time range
export type TableTimeRangeColumnProps<T extends Entity> = CardColumnProps<T> &
  FormTimeRangeColumnProps<T>;
