import { Entity } from '@/api';
import ConstantTag from '@/components/tag/ConstantTag';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/uni-form/interface';
import { findConstant } from '@/constant/util';
import Relational from '../RelationField';
import { TableUserColumnProps } from '.';

export class UserTableField<T extends Entity> extends BaseTableField<
  T,
  TableUserColumnProps<T>
> {
  doWrap(column: TableUserColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const { field } = column;
      const decorator = this.decorator;
      const value = record[field];
      const formContext = decorator.getFormContext();
      const constants = formContext?.dataSet['user'] || [];
      const constant = findConstant(value, constants);
      const Display = constant ? (
        <Relational
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
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'user';
  }
}
