import { Entity } from '@/api';
import { BaseTableField, TableCheckboxColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { Checkbox, Form, Typography } from '@douyinfe/semi-ui';
import { isArray } from 'lodash';
import ConstantTag from '@/components/tag/ConstantTag';

export class CheckboxTableField<T extends Entity> extends BaseTableField<
  T,
  TableCheckboxColumnProps<T>
> {
  protected doWrap(column: TableCheckboxColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      const options = column.options;
      const Text = isArray(text) ? (
        options ? (
          <div className="flex gap-2">
            {text.map((v) => {
              const constant = options.find((c) => c.value === v);
              return constant ? <ConstantTag constant={constant} /> : text;
            })}
          </div>
        ) : (
          text
        )
      ) : (
        text
      );

      return this.isEditing(column, record) ? (
        <Form.Checkbox
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        ></Form.Checkbox>
      ) : (
        <Typography.Text
          ellipsis={{
            showTooltip: column.ellipsis === undefined ? true : column.ellipsis,
          }}
          style={{ maxWidth: column.width }}
        >
          {Text}
        </Typography.Text>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'checkbox';
  }
}
