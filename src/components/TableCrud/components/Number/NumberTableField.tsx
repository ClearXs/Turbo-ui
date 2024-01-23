import { IdEntity } from '@/api/interface';
import { BaseTableField, TableNumberColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class NumberTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableNumberColumnProps<T>
> {
  doWrap(column: TableNumberColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'number';
  }
}
