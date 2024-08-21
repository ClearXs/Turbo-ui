import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField, FormSelectColumnProps } from '..';
import ConstantTag from '@/components/tag/ConstantTag';
import { ISchema } from '@formily/json-schema';
import { FormOrgColumnProps } from '.';

export class OrgFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormOrgColumnProps<T>
> {
  doRender(
    column: FormOrgColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    const collection = formContext?.dataSet['org'] || [];
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

  public schema(column: FormSelectColumnProps<T>, index: number): ISchema {
    const formContext = this.decorator.getFormContext();
    const schema = super.schema(column, index);
    schema['x-component-props']['optionList'] = formContext.dataSet['org'];
    return schema;
  }

  public getType(): ColumnType {
    return 'org';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
