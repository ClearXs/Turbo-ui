import { IdEntity } from '@/api';
import ConstantTag from '@/components/tag/ConstantTag';
import { BaseTableField, TableSelectColumnProps } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { findConstant } from '@/constant/util';
import Relational from '../RelationField';
import { Form } from '@douyinfe/semi-ui';
import { Constant } from '@/constant';

export class SelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableSelectColumnProps<T>
> {
  doWrap(column: TableSelectColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const { field, remote, dictionary, optionList } = column;
      const decorator = this.decorator;
      const value = record[field];
      let recordConstant: Constant | undefined;
      let constantList: Constant[] = [];
      if (remote) {
        const formContext = decorator.getFormContext();
        constantList = formContext?.dataSet[field] || [];
        recordConstant = findConstant(value, constantList);
      } else if (dictionary) {
        const formContext = decorator.getFormContext();
        constantList = formContext?.dataSet[dictionary] || [];
        recordConstant = findConstant(value, constantList);
      } else {
        constantList = optionList;
        recordConstant = optionList?.filter((c) => c.value === value).pop();
      }

      const props = this.getGeneralProps(column, 'form');
      const Display = recordConstant ? (
        <Relational
          column={column}
          record={record}
          decorator={decorator}
          Display={<ConstantTag constant={recordConstant} />}
        />
      ) : (
        <ConstantTag constant={{ value, label: 'undefined', tag: 'red' }} />
      );

      return this.isEditing(column, record) ? (
        <Form.Select
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
          optionList={constantList}
        />
      ) : (
        Display
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'select';
  }
}
