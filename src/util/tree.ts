import { Expand, Tree } from '@/api/api';
import _ from 'lodash';

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
    if (!_.isEmpty(node.children)) {
      const children = treeMap(node.children as T[], map);
      other.children = children;
    }
    return other;
  });
};

/**
 * 按照某个属性把树进行展开
 * @param tree 树
 * @param property 树结点的某个属性
 * @returns 展开后的数组
 */
export const expand = <T extends Tree, K extends keyof Expand>(
  tree: T[] = [],
  property: K,
): Expand[K][] => {
  return innerExpand(tree, property, []);
};

const innerExpand = <T extends Tree, K extends keyof Expand>(
  tree: T[],
  property: K,
  expand: Expand[K][],
): Expand[K][] => {
  tree.map((node) => {
    if (!_.isEmpty(node.children)) {
      innerExpand(node.children, property, expand);
    }
    expand.push(node[property]);
  });
  return expand;
};
