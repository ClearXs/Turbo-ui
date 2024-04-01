import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormTextareaColumnProps } from '.';

export class TextareaFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormTextareaColumnProps<T>
> {
  doRender(
    column: FormTextareaColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  public getType(): ColumnType {
    return 'textarea';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
