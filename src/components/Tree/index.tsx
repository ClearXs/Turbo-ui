import { Tree } from '@/api/api';
import { treeMap } from '@/util/tree';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { directGetIcon } from '../Icon';

// 基于semi ui tree做的二次封装
export const loadTreeData = <T extends Tree>(
  tree: T[],
  labelRender?: (tree: T) => React.ReactNode,
): TreeNodeData[] => {
  return treeMap(tree, (treeNode) => {
    return {
      key: treeNode.code,
      value: treeNode.id,
      label: labelRender?.(treeNode) || treeNode.name,
      icon: directGetIcon(treeNode.icon),
    } as TreeNodeData;
  });
};
