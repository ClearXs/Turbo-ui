import { Entity } from '@/api';
import { BaseTableField } from '..';
import { TableSelectGroupColumnProps } from '.';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import ConstantTag from '@/components/tag/ConstantTag';
import { ColumnType } from '@/components/uni-form/interface';

export class SelectGroupTableField<T extends Entity> extends BaseTableField<
  T,
  TableSelectGroupColumnProps<T>
> {
  doWrap(column: TableSelectGroupColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const value = record[column.field];
      let dic = column.optionList?.filter((c) => c.value === value).pop();
      return dic ? <ConstantTag constant={dic} /> : value;
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'selectGroup';
  }
}
