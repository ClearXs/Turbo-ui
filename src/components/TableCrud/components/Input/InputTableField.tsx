import { IdEntity } from '@/api';
import { BaseTableField, TableInputColumnProps } from '..';
import { ColumnType } from '@/components/TForm/interface';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';

export class InputTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableInputColumnProps<T>
> {
  doWrap(column: TableInputColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'input';
  }
}
