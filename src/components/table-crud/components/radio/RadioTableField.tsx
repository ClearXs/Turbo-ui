import { IdEntity } from '@/api';
import { BaseTableField, TableRadioColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { Form } from '@douyinfe/semi-ui';

export class RadioTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableRadioColumnProps<T>
> {
  doWrap(column: TableRadioColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      return this.isEditing(column, record) ? (
        <Form.Radio
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
    return 'radio';
  }
}
