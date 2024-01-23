import { IdEntity } from '@/api/interface';
import { FormColumnProps, FormContext, RemoteProps } from '../../interface';
import { TreeSelectProps } from '@douyinfe/semi-ui/lib/es/treeSelect';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { TreeConstant } from '@/constant';

// TreeSelect 组件
export type FormTreeSelectColumnProps<T extends IdEntity> = FormColumnProps<T> &
  Omit<TreeSelectProps, 'treeData'> & {
    treeData:
      | TreeNodeData[]
      | ((formContext?: FormContext<T>) => TreeNodeData[]);
    // 选端搜索
    remote?: RemoteProps<TreeConstant>;
  };
