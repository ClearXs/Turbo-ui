import { IdEntity } from '@/api/interface';
import { BaseTableField, TableCheckboxColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class CheckboxTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCheckboxColumnProps<T>
> {
  protected doWrap(column: TableCheckboxColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }
  public getType(): ColumnType {
    return 'checkbox';
  }
}
