import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormSelectGroupColumnProps } from '.';
import SelectGroup from '@/components/SelectGroup';

export class SelectGroupFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormSelectGroupColumnProps<T>
> {
  doRender(
    column: FormSelectGroupColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();

    return (
      <Form.Slot label={props.label}>
        <SelectGroup
          {...props}
          {...column}
          value={formContext?.getValue(props.field)}
          onChange={(v) => {
            formContext.setValue(props.field, v);
          }}
        />
      </Form.Slot>
    );
  }

  public getType(): ColumnType {
    return 'selectGroup';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
