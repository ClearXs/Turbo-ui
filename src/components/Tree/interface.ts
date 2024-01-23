import { Tree, TreeGeneralApi } from '@/api/interface';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { FormColumnProps, FormContext } from '../TForm/interface';

export type TreePanelProps<T extends Tree> = {
  columns: FormColumnProps<T>[];
  // 用于初始化查询参数，如果存在的话
  params?: Partial<T>;
  // 用于在添加时的默认值
  addDefaultValue?: Partial<T>;
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean;
    // 是否显示全选按钮，当属性multiple = true时生效
    showSelectAll?: boolean;
    // 是否显示取消全选按钮，当属性multiple = true时生效
    showUnSelectAll?: boolean;
    // 自定义追加
    append?: Toolbar<T>[];
  };
  operateBar?: {
    // 是否显示怎增加操作
    showAdd?: boolean | ((record: T) => boolean);
    // 是否显示编辑操作
    showEdit?: boolean | ((record: T) => boolean);
    // 是否显示删除操作
    showDelete?: boolean | ((record: T) => boolean);
    // 是否显示怎详情操作
    showDetails?: boolean | ((record: T) => boolean);
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
  root?: Tree['name'];
  // api
  useApi: () => TreeGeneralApi<T>;
  // 当选中结点时回调
  onSelectChange?: (value?: string) => void;
  // 渲染每个结点label的样式
  label?: (tree: T) => any;
  getTreePanelApi?: (treePanelApi: TreePanelApi<T>) => void;
};

export interface TreePanelApi<T extends Tree> {
  tree: (formContext: FormContext<T> | undefined) => void;
  details: (formContext: FormContext<T>, record: T) => void;
  edit: (formContext: FormContext<T>, record: T) => void;
  remove: (formContext: FormContext<T>, ids: string[]) => void;
  // 单选情况下获取选中的key
  getSelectKey: () => string;
  // 多选情况下获取选中的所有值
  getSelectKeys: () => string[];
  // 多选情况下，全选
  selectAll: () => void;
  // 多选情况下，取消全选
  unSelectAll: () => void;
}

export type RenderOperatorBarType<T extends Tree> = (
  record: T,
  operateBar: TreePanelProps<T>['operateBar'],
  treeApi: TreePanelApi<T>,
) => OperateToolbar<T>[];
