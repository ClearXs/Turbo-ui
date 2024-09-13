import { Entity } from '@/api';
import { FormDateColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { ReactNode } from 'react';
import defaults from './default';

export class DateFormField<T extends Entity> extends BaseFormField<
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
          {...defaults}
          type={column.dateType || 'dateTime'}
        />
      );
    } else if (type === 'search') {
      return <Form.DatePicker {...props} {...defaults} type="date" />;
    }
  }

  public getType(): ColumnType {
    return 'date';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
