import { Entity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormSelectColumnProps } from '.';
import ConstantTag from '@/components/tag/ConstantTag';
import { ISchema } from '@formily/json-schema';

export class SelectFormField<T extends Entity> extends BaseFormField<
  T,
  FormSelectColumnProps<T>
> {
  doRender(
    column: FormSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const formContext = this.decorator.getFormContext();
    const { dictionary, remote } = column;
    if (remote) {
      const collection = formContext?.dataSet[props.field] || [];
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
    } else if (dictionary) {
      const dics = formContext?.dataSet[dictionary] || [];
      return (
        <Form.Select {...props} multiple={column.multiple} filter>
          {dics.map((dic) => {
            return (
              <Form.Select.Option value={dic.value} showTick key={dic.value}>
                <ConstantTag constant={dic} />
              </Form.Select.Option>
            );
          })}
        </Form.Select>
      );
    } else {
      return (
        <Form.Select
          {...props}
          optionList={column.optionList}
          filter={column.filter || true}
          multiple={column.multiple}
        />
      );
    }
  }

  public schema(column: FormSelectColumnProps<T>, index: number): ISchema {
    const formContext = this.decorator.getFormContext();
    const schema = super.schema(column, index);
    const { optionList, dictionary, remote, field } = column;
    if (optionList) {
      schema['x-component-props']['optionList'] = optionList;
    } else if (dictionary) {
      schema['x-component-props']['optionList'] =
        formContext.dataSet[dictionary];
    } else if (remote) {
      schema['x-component-props']['optionList'] = formContext.dataSet[field];
    }
    return schema;
  }

  public getType(): ColumnType {
    return 'select';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 12;
  }
}
