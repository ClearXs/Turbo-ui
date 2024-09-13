import { Entity } from '@/api';
import {
  BaseTableField,
  TableDateColumnProps,
  TableDateRangeColumnProps,
  TableTimeColumnProps,
  TableTimeRangeColumnProps,
} from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { PATTERN_TIME, parse } from '@/util/date';
import { ColumnType } from '@/components/tform/interface';
import { Form, Typography } from '@douyinfe/semi-ui';
import { isArray } from 'lodash';

export class DateTableField<T extends Entity> extends BaseTableField<
  T,
  TableDateColumnProps<T>
> {
  protected doWrap(column: TableDateColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      const value = record[column.field];
      return this.isEditing(column, record) ? (
        <Form.DatePicker
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        ></Form.DatePicker>
      ) : (
        <Typography.Text
          ellipsis={{
            showTooltip: column.ellipsis === undefined ? true : column.ellipsis,
          }}
          style={{ maxWidth: column.width }}
        >
          {parse(value)}
        </Typography.Text>
      );
    };

    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'date';
  }
}

export class DateRangeTableField<T extends Entity> extends BaseTableField<
  T,
  TableDateRangeColumnProps<T>
> {
  protected doWrap(column: TableDateRangeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      if (isArray(value)) {
        return value.map((v) => parse(v)).join('~');
      } else {
        return parse(value);
      }
    };

    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'dateRange';
  }
}

export class TimeTableField<T extends Entity> extends BaseTableField<
  T,
  TableTimeColumnProps<T>
> {
  protected doWrap(column: TableTimeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return parse(value, PATTERN_TIME);
    };

    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'time';
  }
}

// TODO: 无法正常显示time，解析失败
export class TimeRangeTableField<T extends Entity> extends BaseTableField<
  T,
  TableTimeRangeColumnProps<T>
> {
  protected doWrap(column: TableTimeRangeColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      if (isArray(value)) {
        return value.map((v) => parse(v, PATTERN_TIME)).join('~');
      } else {
        return parse(value, PATTERN_TIME);
      }
    };
    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'time';
  }
}
