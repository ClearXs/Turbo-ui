import { IdEntity } from '@/api/interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { FormTreeSelectColumnProps } from '.';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { ISchema } from '@formily/json-schema';
import _ from 'lodash';

export class TreeSelectFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormTreeSelectColumnProps<T>
> {
  doRender(
    column: FormTreeSelectColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    let data = column.treeData;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getFormContext());
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
      />
    );
  }

  public schema(column: FormTreeSelectColumnProps<T>, index: number): ISchema {
    const schema = super.schema(column, index);
    let data;
    if (typeof column.treeData === 'function') {
      data = column.treeData(this.decorator.getFormContext());
    }
    if (_.isEmpty(data)) {
      data = column.treeData;
    }
    schema['x-component-props']['treeData'] = data;
    return schema;
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }

  public getType(): ColumnType {
    return 'treeSelect';
  }
}
