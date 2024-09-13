import { Entity } from '@/api';
import { BaseTableField, TableNumberColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { Form, Typography } from '@douyinfe/semi-ui';

export class NumberTableField<T extends Entity> extends BaseTableField<
  T,
  TableNumberColumnProps<T>
> {
  doWrap(column: TableNumberColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.InputNumber
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        ></Form.InputNumber>
      ) : (
        <Typography.Text
          ellipsis={{
            showTooltip: column.ellipsis === undefined ? true : column.ellipsis,
          }}
          style={{ maxWidth: column.width }}
        >
          {text}
        </Typography.Text>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'number';
  }
}
