import { Button, SideSheet, Space, Spin } from '@douyinfe/semi-ui';
import { SiderProps } from './interface';

const Sider: React.FC<SiderProps> = ({
  title = '',
  visible = true,
  loading = false,
  children,
  onCancel,
  onConfirm,
}: SiderProps) => {
  return (
    <SideSheet
      title={title}
      visible={visible}
      closeOnEsc
      onCancel={() => onCancel?.()}
      zIndex={2000}
      footer={
        <>
          <Space>
            <Button type="tertiary" onClick={() => onCancel?.()}>
              取消
            </Button>
            <Button type="primary" onClick={() => onConfirm?.()}>
              确认
            </Button>
          </Space>
        </>
      }
    >
      <Spin spinning={loading}>{children}</Spin>
    </SideSheet>
  );
};

export default Sider;
