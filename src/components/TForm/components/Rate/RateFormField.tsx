import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormRateColumnProps } from '.';

export class RateFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormRateColumnProps<T>
> {
  doRender(
    column: FormRateColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.TextArea {...props} />;
  }

  public getType(): ColumnType {
    return 'rate';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
