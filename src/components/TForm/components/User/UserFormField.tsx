import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import ConstantTag from '@/components/Tag/ConstantTag';
import { ISchema } from '@formily/json-schema';
import { FormUserColumnProps } from '.';

export class UserFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormUserColumnProps<T>
> {
  doRender(
    column: FormUserColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    const collection = formContext?.dataSet['user'] || [];
    return (
      <Form.Select {...props} multiple={column.multiple} filter>
        {collection.map((constant) => {
          return (
            <Form.Select.Option
              value={constant.value}
              showTick
              key={constant.value}
            >
              <ConstantTag constant={constant} />
            </Form.Select.Option>
          );
        })}
      </Form.Select>
    );
  }

  public schema(column: FormUserColumnProps<T>, index: number): ISchema {
    const formContext = this.decorator.getFormContext();
    const schema = super.schema(column, index);
    schema['x-component-props']['optionList'] = formContext.dataSet['user'];
    return schema;
  }

  public getType(): ColumnType {
    return 'user';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
