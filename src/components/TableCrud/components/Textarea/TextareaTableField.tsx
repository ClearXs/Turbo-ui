import { IdEntity } from '@/api/interface';
import { BaseTableField } from '..';
import { TableTextareaColumnProps } from '.';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';

export class TextareaTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTextareaColumnProps<T>
> {
  doWrap(column: TableTextareaColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public getType(): ColumnType {
    return 'textarea';
  }
}
