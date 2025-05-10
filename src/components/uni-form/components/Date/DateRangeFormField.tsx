import { Entity } from '@/api';
import { BaseFormField } from '../FormField';
import { FormDateRangeColumnProps } from './interface';
import { ColumnType, FormColumnProps } from '../..';
import { Form } from '@douyinfe/semi-ui';
import defaults from './default';

export class DateRangeFormField<T extends Entity> extends BaseFormField<
  T,
  FormDateRangeColumnProps<T>
> {
  protected doRender(
    column: FormDateRangeColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    return <Form.DatePicker {...props} {...defaults} type="dateRange" />;
  }

  public getType(): ColumnType {
    return 'dateRange';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
