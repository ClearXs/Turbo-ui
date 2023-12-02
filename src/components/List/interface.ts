import { GeneralApi, IdEntity } from '@/api/interface';
import { FormColumnProps, FormContext } from '../TForm/interface';
import { OperateToolbar, Toolbar } from '../TableCrud/interface';
import { TreeNodeData } from '@douyinfe/semi-ui/lib/es/tree';

export interface ListPanelProps<T extends IdEntity> {
  columns: FormColumnProps<T>[];
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
  list: (formContext: FormContext<T> | undefined) => void;
  details: (formContext: FormContext<T> | undefined, record: T) => void;
  edit: (formContext: FormContext<T> | undefined, record: T) => void;
  remove: (formContext: FormContext<T> | undefined, ids: string[]) => void;
  // 全选
  selectAll: () => void;
  // 取消全选
  unSelectAll: () => void;
  // 单选情况下获取选中的实体
  getSelectKey: () => string;
  // 多选情况下获取选中的实体id列表
  getSelectKeys: () => string[];
}
