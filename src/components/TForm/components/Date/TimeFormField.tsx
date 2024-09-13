import { Entity } from '@/api';
import { BaseFormField } from '../FormField';
import { FormTimeColumnProps } from './interface';
import { ColumnType, FormColumnProps } from '../..';
import { Form } from '@douyinfe/semi-ui';
import defaults from './default';

export class TimeFormField<T extends Entity> extends BaseFormField<
  T,
  FormTimeColumnProps<T>
> {
  protected doRender(
    column: FormTimeColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    return <Form.TimePicker {...props} {...defaults} type="time" />;
  }

  public getType(): ColumnType {
    return 'time';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
