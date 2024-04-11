import { Button, ButtonGroup, Modal } from '@douyinfe/semi-ui';
import { ModularButton, ModularProps } from './interface';
import { tryGetIcon } from '../Icon';
import { createRoot } from 'react-dom/client';
import { Suspense } from 'react';
import cls from 'classnames';

const TypeIcons: Record<string, React.ReactNode> = {};
TypeIcons['info'] = tryGetIcon('IconInfoCircle', {
  size: 'large',
  className: 'semi-modal-info-icon',
});
TypeIcons['warning'] = tryGetIcon('IconIssueStroked', {
  size: 'large',
  className: 'semi-modal-warning-icon',
});
TypeIcons['error'] = tryGetIcon('IconClose', {
  size: 'large',
  className: 'semi-modal-error-icon',
});
TypeIcons['success'] = tryGetIcon('IconCheckCircleStroked', {
  size: 'large',
  className: 'semi-modal-success-icon',
});

// 封装Modal组件
const Modular = (props: ModularProps) => {
  const {
    type,
    icon,
    title,
    content,
    closeOnEsc = true,
    visible = true,
    children,
    scrollX = true,
    scrollY = true,
    closable = true,
    size = 'medium',
    fullScreen,
    beforeConfirm,
    onConfirm,
    beforeCancel,
    onCancel,
    showConfirm = true,
    showCancel = true,
    append = [],
    afterClose,
  } = props;

  const powerfulConfirm = () => {
    try {
      if (beforeConfirm) {
        beforeConfirm(onConfirm);
      } else {
        onConfirm?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const powerfulCancel = () => {
    try {
      if (beforeCancel) {
        beforeCancel(onCancel);
      } else {
        onCancel?.();
      }
    } catch (err) {
      console.error(err);
    }
  };

  const modularButtons: ModularButton[] = [];
  if (showCancel) {
    modularButtons.push({
      code: 'cancel',
      name: '取消',
      type: 'tertiary',
      size: 'default',
      icon: tryGetIcon('IconCrossCircleStroked'),
      onClick() {
        powerfulCancel();
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
      icon: tryGetIcon('IconCheckCircleStroked'),
      onClick() {
        powerfulConfirm();
      },
    });
  }
  append.forEach((button) => modularButtons.push(button));

  const IconComponent = (type && TypeIcons[type]) || icon;

  const bodyClassName = cls(`${scrollY && 'max-h-[60vh] overflow-y-auto'}`);

  return (
    <Modal
      icon={IconComponent}
      closeOnEsc={closeOnEsc}
      title={title}
      visible={visible}
      size={size}
      fullScreen={fullScreen}
      onCancel={powerfulCancel}
      closable={closable}
      afterClose={afterClose}
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
      <div className={bodyClassName}>{content ?? children}</div>
    </Modal>
  );
};

export type StaticModularProps = Omit<ModularProps, 'type' | 'afterClose'>;

const confirm = (props: ModularProps) => {
  const div = document.createElement('div');
  const container = createRoot(div);
  document.body.appendChild(div);

  function open(props: StaticModularProps) {
    const newProps: ModularProps = { ...props, visible: true };
    render(newProps);
  }

  const destroy = () => {
    container.unmount();
  };

  function close() {
    const newProps: ModularProps = { ...props, visible: false };
    render(newProps);
  }

  function render(props: ModularProps) {
    const { onCancel, onConfirm } = props;

    container.render(
      <Suspense>
        <Modular
          {...props}
          onConfirm={() => {
            const res = onConfirm?.();
            if (res && res.then) {
              res.then(
                (...args) => {
                  destroy();
                },
                (err) => {
                  destroy();
                },
              );
            } else {
              destroy();
            }
          }}
          onCancel={() => {
            const res = onCancel?.();
            if (res && res.then) {
              res.then(
                (...args) => {
                  destroy();
                },
                (err) => {
                  destroy();
                },
              );
            } else {
              destroy();
            }
          }}
          afterClose={() => destroy()}
        />
      </Suspense>,
    );
  }
  render(props);
  return { open, destroy, close };
};

Modular.success = (props: StaticModularProps) => {
  return confirm({ ...props, type: 'success' });
};

Modular.info = (props: StaticModularProps) => {
  return confirm({ ...props, type: 'info' });
};

Modular.warning = (props: StaticModularProps) => {
  return confirm({ ...props, type: 'warning' });
};

Modular.error = (props: StaticModularProps) => {
  return confirm({ ...props, type: 'error' });
};

export default Modular;
