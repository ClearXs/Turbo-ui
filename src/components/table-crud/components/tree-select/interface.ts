import { Tree } from '@/api';
import { CardColumnProps, TableContext } from '../../interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { FormTreeSelectColumnProps } from '@/components/uni-form/components';
import { FormContext } from '@/components/uni-form/interface';

// TreeSelect 组件
export type TableTreeSelectColumnProps<T extends Tree> = CardColumnProps<T> &
  Omit<FormTreeSelectColumnProps<T>, 'treeData'> & {
    treeData:
      | TreeNodeData[]
      | ((
          tableContext?: TableContext<T>,
          formContext?: FormContext<T>,
        ) => TreeNodeData[]);
  };
