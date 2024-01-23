import { IdEntity } from '@/api/interface';
import { BaseTableField, TableRateColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class RateTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableRateColumnProps<T>
> {
  doWrap(column: TableRateColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'rate';
  }
}
