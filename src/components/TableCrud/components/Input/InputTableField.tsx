import { IdEntity } from '@/api';
import { BaseTableField, TableInputColumnProps } from '..';
import { ColumnType } from '@/components/TForm/interface';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { Form, Typography } from '@douyinfe/semi-ui';

export class InputTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableInputColumnProps<T>
> {
  doWrap(column: TableInputColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Input
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        <Typography.Text ellipsis={{ showTooltip: true }}>
          {text}
        </Typography.Text>
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'input';
  }
}
