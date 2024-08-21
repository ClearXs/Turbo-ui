import { IdEntity } from '@/api';
import { CardColumnProps } from '../../interface';
import {
  FormDateColumnProps,
  FormDateRangeColumnProps,
  FormTimeColumnProps,
  FormTimeRangeColumnProps,
} from '@/components/tform/components';

// date 组件
export type TableDateColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormDateColumnProps<T> & {};

// dateRange
export type TableDateRangeColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormDateRangeColumnProps<T>;

// time 组件
export type TableTimeColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormTimeColumnProps<T>;

// time range
export type TableTimeRangeColumnProps<T extends IdEntity> = CardColumnProps<T> &
  FormTimeRangeColumnProps<T>;
