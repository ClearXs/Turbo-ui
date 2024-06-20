import { IdEntity } from '@/api';
import { BaseTableField, TableSliderColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class SliderTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSliderColumnProps<T>
> {
  doWrap(column: TableSliderColumnProps<T>): ColumnProps<T> {
    return { ...column, render: this.withColumnRender(column, undefined) };
  }

  public getType(): ColumnType {
    return 'slider';
  }
}
