import { IdEntity } from '@/api';
import { BaseTableField, TableNumberColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { Form } from '@douyinfe/semi-ui';

export class NumberTableField<T extends IdEntity> extends BaseTableField<
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
        text
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'number';
  }
}
