export interface SiderProps {
  // 标题
  title?: string;
  // 是否可见
  visible?: boolean;
  // 是否加载
  loading?: boolean;
  children: React.ReactNode;
  // 确认回调
  onConfirm?: () => void;
  // 取消回调
  onCancel?: () => void;
}
