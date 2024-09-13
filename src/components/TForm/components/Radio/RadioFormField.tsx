import { Entity } from '@/api';
import { FormRadioColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';

export class RadioFormField<T extends Entity> extends BaseFormField<
  T,
  FormRadioColumnProps<T>
> {
  doRender(
    column: FormRadioColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Radio {...props} />;
  }

  public getType(): ColumnType {
    return 'radio';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
