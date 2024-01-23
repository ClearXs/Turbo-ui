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
}
