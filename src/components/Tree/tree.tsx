import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { directGetIcon } from '../Icon/shared';
import { treeMap } from '@/util/tree';
import { Tree } from '@/api';

// 基于semi ui tree做的二次封装
export const loadTreeData = <T extends Tree>(
  tree: T[],
  labelRender?: (tree: T) => React.ReactNode,
  depth?: number,
): TreeNodeData[] => {
  return treeMap(
    tree,
    (treeNode) => {
      return {
        ...tree,
        key: treeNode.id,
        value: treeNode.id,
        label: labelRender?.(treeNode) || treeNode.name,
        icon: directGetIcon(treeNode.icon),
      } as TreeNodeData;
    },
    depth,
  );
};
