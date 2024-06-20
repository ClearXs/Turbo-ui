import { IdEntity } from '@/api';
import { TableCascadeColumnProps } from './interface';
import { BaseTableField } from '..';
import ConstantTag from '@/components/Tag/ConstantTag';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { findTreeConstant } from '@/constant/util';
import { ColumnType } from '@/components/TForm/interface';
import { Form } from '@douyinfe/semi-ui';

export class CascadeTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableCascadeColumnProps<T>
> {
  doWrap(column: TableCascadeColumnProps<T>): ColumnProps<T> {
    const render = (text: string, record: T, index: number) => {
      const props = this.getGeneralProps(column, 'form');
      const { optionTree } = column;

      const treeConstant =
        typeof optionTree === 'function'
          ? optionTree(this.decorator.getFormContext())
          : optionTree;
      const value = record[column.field];
      const dic = findTreeConstant(value, treeConstant);
      return this.isEditing(column, record) ? (
        <Form.Cascader
          {...props}
          treeData={dic}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
        ></Form.Cascader>
      ) : dic ? (
        <ConstantTag constant={dic} />
      ) : (
        value
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
  }

  public getType(): ColumnType {
    return 'cascade';
  }
}
