import { Tree, TreeGeneralApi } from '@/api/interface';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { FormColumnProps, FormContext } from '../TForm/interface';

export type TreePanelProps<T extends Tree> = {
  columns: FormColumnProps<T>[];
  toolbar?: {
    // 是否显示增加按钮
    showAdd?: boolean;
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
  // 是否展开所有项
  expandAll?: boolean;
  // 需求树结点深度，如果不传默认所有
  depth?: number;
  // 是否选中第一个
  first?: boolean;
  // 初始化值
  initValue?: T;
  // api
  useApi: () => TreeGeneralApi<T>;
  // 当选中结点时回调
  onChange?: (value?: string) => void;
  // 渲染每个结点label的样式
  label?: (tree: T) => any;
  getTreePanelApi?: (treePanelApi: TreePanelApi<T>) => void;
};

export interface TreePanelApi<T extends Tree> {
  tree: (formContext: FormContext<T> | undefined) => void;
  details: (formContext: FormContext<T> | undefined, record: T) => void;
  edit: (formContext: FormContext<T> | undefined, record: T) => void;
  remove: (formContext: FormContext<T> | undefined, ids: string[]) => void;

  // 获取选中的key
  getSelectKey: () => string;
}
