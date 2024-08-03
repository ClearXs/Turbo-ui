import { TreeConstant } from '@/constant';
import { find } from '@/util/tree';

export default class Tree<T extends TreeConstant = TreeConstant> {
  private treeData: T[] = [];

  constructor(treeData: T[] = []) {
    this.treeData = treeData;
  }

  public setTreeData(treeData: T[]) {
    this.treeData = treeData;
  }

  public getTreeData(): T[] {
    return this.treeData;
  }

  public findTree(value: T['value']): T | undefined {
    return find<T>(this.treeData, 'value', value);
  }
}
