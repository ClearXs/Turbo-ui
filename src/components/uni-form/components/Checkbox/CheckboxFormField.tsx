import { Entity } from '@/api';
import { FormCheckboxColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { ReactNode } from 'react';

export class CheckboxFormField<T extends Entity> extends BaseFormField<
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
          formContext.setValue(props.field, value);
        }}
      />
    );
  }
  public getType(): ColumnType {
    return 'checkbox';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
