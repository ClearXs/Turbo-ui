import { ModalReactProps } from '@douyinfe/semi-ui/lib/es/modal';

export interface ModularProps {
  // 标题
  title?: React.ReactNode;
  // 是否可见
  visible?: boolean;
  // 是否加载
  loading?: boolean;
  // 内置元素
  children: React.ReactNode;
  // 大小
  size?: ModalReactProps['size'];
  // 是否全屏
  fullScreen?: boolean;
  // 确认回调
  onConfirm?: () => void;
  // 取消回调
  onCancel?: () => void;
  // 是否显示确认操作
  showConfirm?: boolean;
  // 是否显示取消操作
  showCancel?: boolean;
  // 自定义追加，当是函数渲染时，返回值如果是undefined 该追加操作则不进行添加
  append?: ModularButton[];
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
