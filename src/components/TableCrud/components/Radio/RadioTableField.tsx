import { IdEntity } from '@/api';
import { BaseTableField, TableRadioColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class RadioTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableRadioColumnProps<T>
> {
  doWrap(column: TableRadioColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'radio';
  }
}
