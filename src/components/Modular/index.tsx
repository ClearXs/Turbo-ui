import { Button, ButtonGroup, Modal } from '@douyinfe/semi-ui';
import { ModularButton, ModularProps } from './interface';
import { directGetIcon } from '../Icon';

// 封装Modal组件
const Modular = (props: ModularProps) => {
  const {
    title,
    visible = true,
    children,
    size = 'medium',
    fullScreen,
    onConfirm,
    onCancel,
    showConfirm = true,
    showCancel = true,
    append = [],
  } = props;

  const modularButtons: ModularButton[] = [];
  if (showCancel) {
    modularButtons.push({
      code: 'cancel',
      name: '取消',
      type: 'tertiary',
      size: 'default',
      icon: directGetIcon('IconCrossCircleStroked'),
      onClick() {
        onCancel?.();
      },
    });
  }
  if (showConfirm) {
    modularButtons.push({
      code: 'confirm',
      name: '确定',
      type: 'primary',
      loading: true,
      size: 'default',
      icon: directGetIcon('IconCheckCircleStroked'),
      onClick() {
        onConfirm?.();
      },
    });
  }
  append.forEach((button) => modularButtons.push(button));

  return (
    <Modal
      title={title}
      visible={visible}
      size={size}
      fullScreen={fullScreen}
      onCancel={onCancel}
      closable={false}
      footer={
        <ButtonGroup className="float-right">
          {modularButtons.map((button) => {
            const {
              code,
              icon,
              type,
              size,
              loading = false,
              onClick,
              name,
            } = button;
            return (
              <Button
                key={code}
                icon={icon}
                type={type}
                size={size}
                loading={loading && props.loading}
                onClick={() => onClick?.()}
              >
                {name}
              </Button>
            );
          })}
        </ButtonGroup>
      }
    >
      <div className="max-h-[60vh] overflow-y-auto">{children}</div>
    </Modal>
  );
};

export default Modular;
