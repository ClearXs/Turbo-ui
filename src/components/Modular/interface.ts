import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';

export interface ModularProps {
  type?: 'success' | 'info' | 'error' | 'warning';
  // 标题
  title?: React.ReactNode;
  // 优先取content
  content?: string | React.ReactNode;
  // 是否可见
  visible?: boolean;
  // 是否加载
  loading?: boolean;
  // icon
  icon?: React.ReactNode;
  // 内置元素
  children?: React.ReactNode;
  // 是否显示关闭按钮
  closable?: boolean;
  // 大小
  size?: ModalReactProps['size'];
  // 是否全屏
  fullScreen?: boolean;
  // 是否显示确认操作
  showConfirm?: boolean;
  // 是否显示取消操作
  showCancel?: boolean;
  // 自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加
  append?: ModularButton[];
  // 是否显示Y轴滑动轮
  scrollY?: boolean;
  // 是否显示X轴滑动轮
  scrollX?: boolean;
  // closeOnEsc
  closeOnEsc?: boolean;
  // confirm before，当存在返回值时不会立即调用onConfirm，由使用方确定是否使用
  beforeConfirm?: (thenConfirm?: ModularProps['onConfirm']) => void;
  // 确认回调
  onConfirm?: () => void | Promise<any>;
  // cancel before，当存在返回值时不会立即调用onCancel，由使用方确定是否使用
  beforeCancel?: (thenCancel?: ModularProps['onCancel']) => void;
  // 取消回调
  onCancel?: () => void | Promise<any>;
  // 关闭后执行
  afterClose?: () => void;
}

export type ModularButton = {
  code: string;
  name: string;
  type: 'warning' | 'primary' | 'tertiary' | 'secondary' | 'danger';
  size?: 'default' | 'small' | 'large';
  icon?: React.ReactNode;
  // 按钮loading状态，如果不赋值默认为false
  loading?: boolean;
  onClick?: () => void;
};
