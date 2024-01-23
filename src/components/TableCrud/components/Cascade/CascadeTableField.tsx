import { IdEntity } from '@/api/interface';
import { TableCascadeColumnProps } from './interface';
import { BaseTableField } from '..';
import ConstantTag from '@/components/Tag/ConstantTag';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { findTreeConstant } from '@/constant/util';
import { ColumnType } from '@/components/TForm/interface';

export class CascadeTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCascadeColumnProps<T>
> {
  doWrap(column: TableCascadeColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const value = record[column.field];
      let dic = findTreeConstant(value, column.optionTree);
      return dic ? <ConstantTag constant={dic} /> : value;
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'cascade';
  }
}
