import { IdEntity } from '@/api/interface';
import { FormCascadeColumnProps } from './interface';
import { Form } from '@douyinfe/semi-ui';
import { ColumnType, FormColumnProps } from '../../interface';
import { BaseFormField } from '..';
import { TreeConstant } from '@/constant';
import { CascaderData } from '@douyinfe/semi-ui/lib/es/cascader';
import ConstantTag from '@/components/Tag/ConstantTag';

export class CascadeFormField<T extends IdEntity> extends BaseFormField<
  T,
  FormCascadeColumnProps<T>
> {
  renderCascadeTree(tree: TreeConstant[]): CascaderData[] {
    if (_.isEmpty(tree)) {
      return [];
    }
    return tree.map((option) => {
      return {
        value: option.value,
        label: <ConstantTag constant={option} />,
        children: this.renderCascadeTree(option.children || []),
      } as CascaderData;
    });
  }

  doRender(
    column: FormCascadeColumnProps<T>,
    type: 'search' | 'form',
  ): React.ReactNode {
    const props = this.getGeneralProps(column, type);
    const { optionTree } = column;

    return (
      <Form.Cascader {...props} treeData={this.renderCascadeTree(optionTree)} />
    );
  }

  public getType(): ColumnType {
    return 'cascade';
  }

  public getDefaultSpan(): FormColumnProps<T>['span'] {
    return 6;
  }
}
