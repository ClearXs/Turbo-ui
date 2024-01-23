import { IdEntity } from '@/api/interface';
import ConstantTag from '@/components/Tag/ConstantTag';
import { BaseTableField, TableSelectColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { findConstant } from '@/constant/util';

export class SelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSelectColumnProps<T>
> {
  doWrap(column: TableSelectColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const value = record[column.field];
      let constant;
      if (column.remote) {
        const formContext = this.decorator.getFormContext();
        const constants = formContext?.dataSet[column.field] || [];
        constant = findConstant(value, constants);
      } else if (column.dictionary) {
        const formContext = this.decorator.getFormContext();
        const constants = formContext?.dataSet[column.dictionary] || [];
        constant = findConstant(value, constants);
      } else {
        constant = column.optionList?.filter((c) => c.value === value).pop();
      }
      return constant ? <ConstantTag constant={constant} /> : value;
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'select';
  }
}
