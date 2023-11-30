import { Button, ButtonGroup, SideSheet, Space } from '@douyinfe/semi-ui';
import { SiderProps } from './interface';

const Sider: React.FC<SiderProps> = ({
  title = '',
  visible = true,
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
      {children}
    </SideSheet>
  );
};

export default Sider;
