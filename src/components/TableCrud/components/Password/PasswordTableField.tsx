import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { TablePasswordColumnProps } from '.';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { Form, Typography } from '@douyinfe/semi-ui';

export class PasswordTableField<T extends IdEntity> extends BaseTableField<
  T,
  TablePasswordColumnProps<T>
> {
  doWrap(column: TablePasswordColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Input
          {...props}
          mode="password"
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
    return 'password';
  }
}
