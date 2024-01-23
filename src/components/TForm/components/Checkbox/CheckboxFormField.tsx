import { IdEntity } from '@/api/interface';
import { FormCheckboxColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps, FormContext } from '../../interface';
import { BaseFormField } from '..';
import { ReactNode } from 'react';

export class CheckboxFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormCheckboxColumnProps<T>
> {
  protected doRender(
    column: FormCheckboxColumnProps<T>,
    type: 'search' | 'form',
  ): ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    return (
      <Form.CheckboxGroup
        {...props}
        direction="horizontal"
        extraText={column.extraText}
        options={column.options}
        onChange={(value) => {
          const values = { ...formContext?.values } || {};
          values[props.field] = value;
          const newContext = {
            ...formContext,
            visible: true,
            values,
          };
          formContext?.newContext(newContext as FormContext<T>);
          formContext?.formApi?.setValue(props.field, value);
        }}
      />
    );
  }
  public getType(): ColumnType {
    return 'checkbox';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
