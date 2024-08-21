import { GeneralApi, IdEntity } from '@/api';
import { FormColumnProps, FormContext } from '../tform/interface';
import { OperateToolbar, Toolbar } from '../table-crud/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';
import { ListProps } from '@douyinfe/semi-ui/lib/es/list';

export interface ListPanelProps<T extends IdEntity> {
  columns: FormColumnProps<T>[];
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean;
    // 是否显示全选按钮，当属性multiple = true时生效
    showSelectAll?: boolean;
    // 是否显示取消全选按钮，当属性multiple = true时生效
    showDeselectAll?: boolean;
    // 自定义追加
    append?: Toolbar<T>[];
  };
  operateBar?: {
    // 是否显示编辑操作
    showEdit?: boolean | ((record: T) => boolean);
    // 是否显示删除操作
    showDelete?: boolean | ((record: T) => boolean);
    // 自定义追加
    append?: (OperateToolbar<T> | ((record: T) => OperateToolbar<T>))[];
  };
  // 是否多选
  multiple?: boolean;
  // 初始值（list key值），开启multiple时生效
  initValues?: string[];
  // 是否自动选取接口第一条数据
  first?: boolean;
  // 当multiple = false时启用，如果该值为null，则取接口第一条数据 @see first
  initValue?: string;
  // api
  useApi: () => GeneralApi<T>;
  // 当选中结点时回调
  onChange?: (value?: string) => void;
  // 每个实体转换为TreeNodeData
  wrap?: (entity: T) => TreeNodeData;
  getListPanelApi?: (api: ListPanelApi<T>) => void;
}

export interface ListPanelApi<T extends IdEntity> {
  list: () => void;
  details: (record: T) => void;
  edit: (record: T) => void;
  remove: (ids: string[]) => void;
  // 全选
  selectAll: () => void;
  // 取消全选
  unSelectAll: () => void;
  // 单选情况下获取选中的实体
  getSelectKey: () => string;
  // 多选情况下获取选中的实体id列表
  getSelectKeys: () => string[];
}

export interface ListPanelContext<T extends IdEntity> {
  props: ListPanelProps<T>;
  loading: boolean;
  // the wrap original data source to list
  list: TreeNodeData[];
  // the original list panel data source
  dataSource: T[];
  // the list select key
  selectKey: string;
  // the list select keys
  selectKeys: string[];
  // the table form context
  formContext?: FormContext<T>;
  /**
   * set form context
   *
   * @param formContext the form context instance
   */
  setFormContext(formContext: FormContext<T>): void;
}

// drag
export type DraggableListProps<T extends DraggableItemProps> =
  ListProps<T> & {};

export type DraggableItemProps = IdEntity & {
  index?: number;
  children: React.ReactNode;
  onHover: (
    dragItem: DraggableItemProps,
    hoverItem: DraggableItemProps,
  ) => void;
  onDrop: (item: DraggableItemProps) => void;
};

// bordered list
export type BorderedListProps<T> = {
  dataSource: T[];
  label: (data: T) => string | React.ReactNode;
  footer: (data: T) => React.ReactNode;
};
