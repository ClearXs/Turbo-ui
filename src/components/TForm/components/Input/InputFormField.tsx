import { IdEntity } from '@/api/interface';
import { FormInputColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';

export class InputFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormInputColumnProps<T>
> {
  doRender(
    column: FormInputColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Input {...props} />;
  }

  public getType(): ColumnType {
    return 'input';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
