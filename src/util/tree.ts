import { Tree } from '@/api/api';

/**
 * 给定一颗原有的树转换为另外一颗树
 * @param tree 树结构
 * @param map 转换函数
 * @returns 转换后的树结构
 */
export const treeMap = <T extends Tree, K extends { children?: K[] }>(
  tree: T[] = [],
  map: (node: T) => K,
): K[] => {
  return tree.map((node) => {
    const other = map(node);
    if (node.children) {
      const children = treeMap(node.children as T[], map);
      other.children = children;
    }
    return other;
  });
};
