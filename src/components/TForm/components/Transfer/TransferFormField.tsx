import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormTransferColumnProps } from '.';

export class TransferFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormTransferColumnProps<T>
> {
  doRender(
    column: FormTransferColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  public getType(): ColumnType {
    return 'slider';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
