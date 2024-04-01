import { IdEntity } from '@/api';
import { Switch } from '@douyinfe/semi-ui';
import { BaseTableField, TableSwitchColumnProps } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class SwitchTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSwitchColumnProps<T>
> {
  protected doWrap(column: TableSwitchColumnProps<T>): ColumnProps<T> {
    const render: ColumnRender<T> = (text, record) => {
      const value = record[column.field];
      return <Switch disabled checked={value} size="small" />;
    };
    return { ...column, render: column.render || render };
  }
  public getType(): ColumnType {
    return 'switch';
  }
}
