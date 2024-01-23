import { Button, ButtonGroup, Modal, Spin } from '@douyinfe/semi-ui';
import { ModularProps } from './interface';

// 封装Modal组件
const Modular = (props: ModularProps) => {
  const {
    title,
    visible = true,
    loading = false,
    children,
    size = 'medium',
    fullScreen,
    onConfirm,
    onCancel,
  } = props;

  return (
    <Modal
      title={title}
      visible={visible}
      size={size}
      fullScreen={fullScreen}
      onCancel={onCancel}
      closable={false}
      footer={
        <ButtonGroup className="relative left-0">
          <Button loading={loading} onClick={onConfirm}>
            确认
          </Button>
          <Button loading={loading} onClick={onCancel} type="tertiary">
            取消
          </Button>
        </ButtonGroup>
      }
    >
      <Spin spinning={loading}>{children}</Spin>
    </Modal>
  );
};

export default Modular;
