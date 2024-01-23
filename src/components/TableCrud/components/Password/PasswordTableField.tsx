import { IdEntity } from '@/api/interface';
import { BaseTableField } from '..';
import { TablePasswordColumnProps } from '.';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class PasswordTableField<T extends IdEntity> extends BaseTableField<
  T,
  TablePasswordColumnProps<T>
> {
  doWrap(column: TablePasswordColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'password';
  }
}
