import { IdEntity } from '@/api/interface';
import { TableColumnProps } from '@/components/TableCrud/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

// 页面帮助接口，构建通用化功能。如，table、list-panel、tree-panel...
export type Helper<T extends IdEntity> = {
  // 获取table column
  getColumns: () => TableColumnProps<T>[];

  // 转换为tree
  wrap?: (entity: T) => TreeNodeData;
};
