import { IdEntity } from '@/api';
import { BaseTableField, TableRateColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { Form } from '@douyinfe/semi-ui';

export class RateTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableRateColumnProps<T>
> {
  doWrap(column: TableRateColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Rating
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        text
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'rate';
  }
}
