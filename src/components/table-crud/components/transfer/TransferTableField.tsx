import { IdEntity } from '@/api';
import { BaseTableField } from '..';
import { TableTransferColumnProps } from '.';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';

export class TransferTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTransferColumnProps<T>
> {
  doWrap(column: TableTransferColumnProps<T>): ColumnProps<T> {
    return { ...column, render: this.withColumnRender(column, undefined) };
  }

  public getType(): ColumnType {
    return 'transfer';
  }
}
