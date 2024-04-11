import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps, FormContext } from '../../interface';
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
          value={formContext?.values?.[props.field]}
          onChange={(v) => {
            const values = { ...formContext?.values } || {};
            values[props.field] = v;
            const newContext = {
              ...formContext,
              visible: true,
              values,
            };
            formContext?.newContext(newContext as FormContext<T>);
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
