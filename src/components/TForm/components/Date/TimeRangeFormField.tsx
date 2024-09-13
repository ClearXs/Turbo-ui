import { Entity } from '@/api';
import { BaseFormField } from '../FormField';
import { FormTimeRangeColumnProps } from './interface';
import { ColumnType, FormColumnProps } from '../..';
import { Form } from '@douyinfe/semi-ui';
import defaults from './default';

export class TimeRangeFormField<T extends Entity> extends BaseFormField<
  T,
  FormTimeRangeColumnProps<T>
> {
  protected doRender(
    column: FormTimeRangeColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    return <Form.TimePicker {...props} {...defaults} type="timeRange" />;
  }

  public getType(): ColumnType {
    return 'timeRange';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
