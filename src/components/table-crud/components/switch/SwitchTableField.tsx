import { Entity } from '@/api';
import { Form, Switch } from '@douyinfe/semi-ui';
import { BaseTableField, TableSwitchColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/uni-form/interface';

export class SwitchTableField<T extends Entity> extends BaseTableField<
  T,
  TableSwitchColumnProps<T>
> {
  protected doWrap(column: TableSwitchColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      const value = record[column.field];
      return this.isEditing(column, record) ? (
        <Form.Switch
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        />
      ) : (
        <Switch disabled checked={value} size="small" />
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }
  public getType(): ColumnType {
    return 'switch';
  }
}
