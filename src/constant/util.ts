import _ from 'lodash';
import { Constant, TreeConstant } from '.';

/**
 * find constant by value
 * @param value value
 * @param constants constants
 * @returns Constant or undefined
 */
export const findConstant = <Value = any>(
  value: Value,
  constants: Constant<Value>[],
) => {
  return constants.find((c) => c.value === value);
};

/**
 * find tree constant by value
 * @param value value
 * @param treeConstant tree
 * @returns tree or undefined
 */
export const findTreeConstant = <Value = any>(
  value: Value,
  treeConstant?: TreeConstant<Value>[],
): TreeConstant<Value> | undefined => {
  if (_.isEmpty(treeConstant)) {
    return undefined;
  }
  return (treeConstant as TreeConstant<Value>[]).find((tree) => {
    if (tree.value === value) {
      return tree;
    }
    return findTreeConstant(value, tree.children);
  });
};
