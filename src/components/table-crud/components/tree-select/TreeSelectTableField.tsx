import { Tree } from '@/api';
import { Form } from '@douyinfe/semi-ui';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { TableTreeSelectColumnProps } from '.';
import { BaseTableField } from '..';
import { ColumnProps, ColumnRender } from '@douyinfe/semi-ui/lib/es/table';
import { ColumnType } from '@/components/tform/interface';
import { ISchema } from '@formily/json-schema';

export class TreeSelectTableField<T extends Tree> extends BaseTableField<
  T,
  TableTreeSelectColumnProps<T>
> {
  doRender(
    column: TableTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode | undefined {
    const props = this.getGeneralProps(column, type);
    const data = this.getTreeData(column);
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
    const render: ColumnRender<T> = (text, record, index) => {
      const props = this.getGeneralProps(column, 'form');
      const data = this.getTreeData(column);
      return this.isEditing(column, record) ? (
        <Form.TreeSelect
          {...props}
          noLabel
          field={`data[${index}][${column.dataIndex}]`}
          pure
          treeData={data}
        />
      ) : (
        text
      );
    };
    return { ...column, render: this.withColumnRender(column, render) };
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

  getTreeData(column: TableTreeSelectColumnProps<T>): TreeNodeData[] {
    let data: TreeNodeData[];
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getTableContext());
    } else {
      data = column.treeData as TreeNodeData[];
    }
    return data;
  }
}
