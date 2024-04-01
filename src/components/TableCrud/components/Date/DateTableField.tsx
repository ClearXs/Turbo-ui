import { IdEntity } from '@/api';
import {
  BaseTableField,
  TableDateColumnProps,
  TableDateRangeColumnProps,
  TableTimeColumnProps,
  TableTimeRangeColumnProps,
} from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { PATTERN_TIME, parse } from '@/util/date';
import { ColumnType } from '@/components/TForm/interface';

export class DateTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableDateColumnProps<T>
> {
  protected doWrap(column: TableDateColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value);
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'date';
  }
}

export class DateRangeTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableDateRangeColumnProps<T>
> {
  protected doWrap(column: TableDateRangeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value);
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'dateRange';
  }
}

export class TimeTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTimeColumnProps<T>
> {
  protected doWrap(column: TableTimeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value, PATTERN_TIME);
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'time';
  }
}

export class TimeRangeTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTimeRangeColumnProps<T>
> {
  protected doWrap(column: TableTimeRangeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value, PATTERN_TIME);
    };

    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'time';
  }
}
