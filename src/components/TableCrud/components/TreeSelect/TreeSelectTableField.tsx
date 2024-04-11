import { IdEntity } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { TableTreeSelectColumnProps } from '.';
import { BaseTableField } from '..';
import { ColumnProps } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/TForm/interface';
import { ISchema } from '@formily/json-schema';

export class TreeSelectTableField<T extends IdEntity> extends BaseTableField<
  T,
  TableTreeSelectColumnProps<T>
> {
  doRender(
    column: TableTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    let data = column.treeData;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getTableContext());
    } else {
      data = column.treeData as TreeNodeData[];
    }
    return (
      <Form.TreeSelect
        {...props}
        treeData={data}
        filterTreeNode={column.filterTreeNode}
        multiple={column.multiple}
        showClear={column.showClear || true}
        showSearchClear={column.showSearchClear || true}
        expandAll={column.expandAll}
        onClear={(e) => {
          debugger;
        }}
      />
    );
  }

  doWrap(column: TableTreeSelectColumnProps<T>): ColumnProps<T> {
    return { ...column };
  }

  public schema(column: TableTreeSelectColumnProps<T>, index: number): ISchema {
    const schema = super.schema(column, index);
    let data = column.treeData;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getTableContext());
    } else {
      data = column.treeData as TreeNodeData[];
    }
    schema['x-component-props']['treeData'] = data;
    return schema;
  }

  public getType(): ColumnType {
    return 'treeSelect';
  }
}
