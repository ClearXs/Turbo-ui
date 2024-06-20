import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { TableSlotColumnProps } from './interface';

export class SlotTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSlotColumnProps<T>
> {
  doWrap(column: TableSlotColumnProps<T>): ColumnProps<T> {
    return { ...column, render: this.withColumnRender(column, undefined) };
  }

  public getType(): ColumnType {
    return 'slot';
  }
}
