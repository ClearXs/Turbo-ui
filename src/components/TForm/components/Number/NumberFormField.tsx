import { IdEntity } from '@/api/interface';
import { FormNumberColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';

export class NumberFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormNumberColumnProps<T>
> {
  doRender(
    column: FormNumberColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    return <Form.InputNumber {...props} />;
  }

  public getType(): ColumnType {
    return 'number';
  }
  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
