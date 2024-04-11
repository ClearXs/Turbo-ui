import { IdEntity } from '@/api';
import ConstantTag from '@/components/Tag/ConstantTag';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { findConstant } from '@/constant/util';
import { RelationComponent } from '../RelationField';
import { TableOrgColumnProps } from '.';

export class OrgTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableOrgColumnProps<T>
> {
  doWrap(column: TableOrgColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const { field } = column;
      const decorator = this.decorator;
      const value = record[field];
      const formContext = decorator.getFormContext();
      const constants = formContext?.dataSet['org'] || [];
      const constant = findConstant(value, constants);
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
    return 'org';
  }
}
