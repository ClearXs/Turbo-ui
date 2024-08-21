import { Tree, TreeGeneralApi } from '@/api';
import { OperateToolbar, Toolbar } from '../table-crud/interface';
import { FormColumnProps, FormContext } from '../tform/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

export type TreePanelRoot<T extends Tree> = {
  name: Tree['name'];
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean | ((treePanelContext: TreePanelContext<T>) => boolean);
  };
};

export type TreePanelProps<T extends Tree> = {
  columns: FormColumnProps<T>[];
  // 用于初始化查询参数，如果存在的话
  params?: Partial<T>;
  // 用于在添加时的默认值
  addDefaultValue?: Partial<T>;
  // 工具栏
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean;
    // 是否显示全选按钮，当属性multiple = true时生效
    showSelectAll?: boolean;
    // 是否显示取消全选按钮，当属性multiple = true时生效
    showDeSelectAll?: boolean;
    // 自定义追加
    append?: Toolbar<T>[];
  };
  // 操作栏
  operateBar?: {
    // 是否显示怎增加操作，默认true
    showAdd?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 是否显示编辑操作，默认true
    showEdit?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 是否显示删除操作，默认true
    showDelete?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 是否显示怎详情操作, 默认true
    showDetails?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 是否显示添加下级，默认false
    showSubordinate?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 是否显示添加同级，默认false
    showPeer?:
      | boolean
      | ((record: T, treePanelContext: TreePanelContext<T>) => boolean);
    // 自定义追加
    append?: (OperateToolbar<T> | ((record: T) => OperateToolbar<T>))[];
  };
  // 是否展开所有项
  expandAll?: boolean;
  // 需求树结点深度，如果不传默认所有
  depth?: number;
  // 是否多选
  multiple?: boolean;
  // 初始值（list key值），开启multiple时生效
  initValues?: string[];
  // 是否选中第一个
  first?: boolean;
  // 初始化值
  initValue?: Tree['id'];
  // 根结点名称，如果赋值将会创建一个ROOT的虚拟结点
  root?: Tree['name'] | TreePanelRoot<T>;
  // api
  useApi: () => TreeGeneralApi<T>;
  // 当选中结点时回调
  onSelectChange?: (value?: string) => void;
  // 选中时回调
  onChange?: (value: T | undefined) => void;
  // 渲染每个结点label的样式
  label?: (tree: T) => any;
  getTreePanelApi?: (treePanelApi: TreePanelApi<T>) => void;
};

export interface TreePanelApi<T extends Tree> {
  tree: () => void;
  details: (record: T) => void;
  edit: (record: T) => void;
  remove: (ids: string[]) => void;
  // 单选情况下获取选中的key
  getSelectKey: () => string;
  // 多选情况下获取选中的所有值
  getSelectKeys: () => string[];
  // 多选情况下，全选
  selectAll: () => void;
  // 多选情况下，取消全选
  unSelectAll: () => void;
}

export interface TreePanelContext<T extends Tree> {
  // tree panel props
  props: TreePanelProps<T>;
  // tree panel loading
  loading: boolean;
  // tree data source
  tree: TreeNodeData[];
  dataSource: T[];
  // select key
  selectKey: string;
  // select multi keys
  selectKeys: string[];
  // tree element all keys
  allKeys: string[];
  // the table form context
  formContext?: FormContext<T>;
  /**
   * set form context
   *
   * @param formContext the form context instance
   */
  setFormContext(formContext: FormContext<T>): void;
}

export type RenderOperatorBarType<T extends Tree> = (
  record: T,
  operateBar: TreePanelProps<T>['operateBar'],
  treeApi: TreePanelApi<T>,
) => OperateToolbar<T>[];
