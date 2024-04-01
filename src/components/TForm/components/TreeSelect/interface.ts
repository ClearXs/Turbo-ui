import { IdEntity, Tree } from '@/api';
import { FormColumnProps, FormContext, RemoteProps } from '../../interface';
import { TreeSelectProps } from '@douyinfe/semi-ui/lib/es/treeSelect';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { TreeConstant } from '@/constant';

// TreeSelect 组件
export type FormTreeSelectColumnProps<T extends Tree> = FormColumnProps<T> &
  Omit<TreeSelectProps, 'treeData'> & {
    // 如果数据视图是tree panel，则该参数意义则是把当前树型视图的数据放入到treeData上
    self?: boolean;
    // tree转换
    treeTransform?: (
      tree: T[],
      labelRender?: (tree: T) => React.ReactNode,
    ) => TreeNodeData[];
    treeData:
      | TreeNodeData[]
      | ((formContext?: FormContext<T>) => TreeNodeData[]);
    // 选端搜索
    remote?: RemoteProps<TreeConstant>;
  };
