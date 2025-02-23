import { Entity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormSwitchColumnProps } from '.';

export class SwitchFormField<T extends Entity> extends BaseFormField<
  T,
  FormSwitchColumnProps<T>
> {
  doRender(
    column: FormSwitchColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Switch {...props} />;
  }

  public getType(): ColumnType {
    return 'switch';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
