import { IdEntity } from '@/api/interface';
import { FormDateColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { ReactNode } from 'react';

export class DateFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormDateColumnProps<T>
> {
  protected doRender(
    column: FormDateColumnProps<T>,
    type: 'form' | 'search',
  ): ReactNode {
    const props = this.getGeneralProps(column, type);
    if (type === 'form') {
      return (
        <Form.DatePicker
          {...props}
          type={column.dateType || 'dateTime'}
          format="yyyy-MM-dd HH:mm:ss"
          presets={[
            {
              text: '昨天',
              start: new Date(new Date().valueOf() - 1000 * 3600 * 24),
              end: new Date(new Date().valueOf() - 1000 * 3600 * 24),
            },
            {
              text: '当前时间',
              start: new Date(),
              end: new Date(),
            },
            {
              text: '明天',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24),
            },
            {
              text: '下周',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
            },
            {
              text: '15天后',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
            },
            {
              text: '1个月后',
              start: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
            },
          ]}
        />
      );
    } else if (type === 'search') {
      return (
        <Form.DatePicker
          {...props}
          type="dateRange"
          format="yyyy-MM-dd HH:mm:ss"
          presets={[
            {
              text: '昨天',
              start: new Date(new Date().valueOf() - 1000 * 3600 * 24),
              end: new Date(),
            },
            {
              text: '当前时间',
              start: new Date(),
              end: new Date(),
            },
            {
              text: '明天',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24),
            },
            {
              text: '下周',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 7),
            },
            {
              text: '15天后',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 15),
            },
            {
              text: '1个月后',
              start: new Date(),
              end: new Date(new Date().valueOf() + 1000 * 3600 * 24 * 30),
            },
          ]}
        />
      );
    }
  }

  public getType(): ColumnType {
    return 'date';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
