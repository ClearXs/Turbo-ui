import { IdEntity } from '@/api/interface';
import ConstantTag from '@/components/Tag/ConstantTag';
import { BaseTableField, TableSelectColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { findConstant } from '@/constant/util';
import { RelationComponent } from '../RelationField';

export class SelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSelectColumnProps<T>
> {
  doWrap(column: TableSelectColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const { field, remote, dictionary, optionList } = column;

      const decorator = this.decorator;
      const value = record[field];
      let constant;
      if (remote) {
        const formContext = decorator.getFormContext();
        const constants = formContext?.dataSet[field] || [];
        constant = findConstant(value, constants);
      } else if (dictionary) {
        const formContext = decorator.getFormContext();
        const constants = formContext?.dataSet[dictionary] || [];
        constant = findConstant(value, constants);
      } else {
        constant = optionList?.filter((c) => c.value === value).pop();
      }
      const Display = constant ? (
        <RelationComponent
          column={column}
          record={record}
          decorator={decorator}
          Display={<ConstantTag constant={constant} />}
        />
      ) : (
        <ConstantTag constant={{ value, label: 'undefined', tag: 'red' }} />
      );
      return Display;
    };
    return { ...column, render: column.render || render };
  }

  public getType(): ColumnType {
    return 'select';
  }
}
