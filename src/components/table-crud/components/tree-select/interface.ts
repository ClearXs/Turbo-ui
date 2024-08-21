import { IdEntity } from '@/api';
import { CardColumnProps, TableContext } from '../../interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { FormTreeSelectColumnProps } from '@/components/tform/components';
import { FormContext } from '@/components/tform/interface';

// TreeSelect 组件
export type TableTreeSelectColumnProps<T extends IdEntity> =
  CardColumnProps<T> &
    Omit<FormTreeSelectColumnProps<T>, 'treeData'> & {
      treeData:
        | TreeNodeData[]
        | ((
            tableContext?: TableContext<T>,
            formContext?: FormContext<T>,
          ) => TreeNodeData[]);
    };
