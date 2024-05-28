import { GeneralApi, IdEntity } from '@/api';
import {
  TableColumnProps,
  TableCrudProps,
} from '@/components/TableCrud/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

// 页面帮助接口，构建通用化功能。如，table、list-panel、tree-panel...
export type Helper<T extends IdEntity, Api extends GeneralApi<T>> = {
  // 获取table column
  getColumns: () => TableColumnProps<T>[];
  // 获取api
  getApi: () => Api;
  // 转换为tree
  wrap?: (entity: T) => TreeNodeData;
  // get form reaction scope
  getScope?: () => TableCrudProps<T>['scope'];
};
