import { Entity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormTransferColumnProps } from '.';

export class TransferFormField<T extends Entity> extends BaseFormField<
  T,
  FormTransferColumnProps<T>
> {
  doRender(
    column: FormTransferColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.Input {...props} />;
  }

  public getType(): ColumnType {
    return 'transfer';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
