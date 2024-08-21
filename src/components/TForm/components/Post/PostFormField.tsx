import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import ConstantTag from '@/components/tag/ConstantTag';
import { ISchema } from '@formily/json-schema';
import { FormPostColumnProps } from '.';

export class PostFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormPostColumnProps<T>
> {
  doRender(
    column: FormPostColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    const collection = formContext?.dataSet['post'] || [];
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

  public schema(column: FormPostColumnProps<T>, index: number): ISchema {
    const formContext = this.decorator.getFormContext();
    const schema = super.schema(column, index);
    schema['x-component-props']['optionList'] = formContext.dataSet['post'];
    return schema;
  }

  public getType(): ColumnType {
    return 'post';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
