import { IdEntity } from '@/api';
import { BaseTableField, TableCheckboxColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { Form } from '@douyinfe/semi-ui';

export class CheckboxTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCheckboxColumnProps<T>
> {
  protected doWrap(column: TableCheckboxColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Checkbox
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        ></Form.Checkbox>
      ) : (
        text
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'checkbox';
  }
}
