import { Entity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormPasswordColumnProps } from '.';

export class PasswordFormField<T extends Entity> extends BaseFormField<
  T,
  FormPasswordColumnProps<T>
> {
  doRender(
    column: FormPasswordColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Input mode="password" {...props} />;
  }

  public getType(): ColumnType {
    return 'password';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
