import { Entity } from '@/api';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/uni-form/interface';
import { TableSlotColumnProps } from './interface';
import {
  JsonValueHandler,
  ValueHandler,
} from '@/components/uni-form/components';

export class SlotTableField<T extends Entity> extends BaseTableField<
  T,
  TableSlotColumnProps<T>
> {
  doWrap(column: TableSlotColumnProps<T>): ColumnProps<T> {
    return { ...column, render: this.withColumnRender(column, undefined) };
  }

  public getType(): ColumnType {
    return 'slot';
  }

  public getValueHandler(): ValueHandler {
    return new JsonValueHandler();
  }
}
